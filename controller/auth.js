const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require("jwt-simple")
const passport = require('passport')
const models = require('../models')
const config = require('../config')
const bCrypt = require('bcrypt-nodejs')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const FacebookStrategy = require('passport-facebook').Strategy
const slugify = require('slugify')
// const userResource = require('../resources/user');

JwtStrategy.prototype.authenticate = function (req, options) {
    var self = this;

    var token = self._jwtFromRequest(req);

    if (!token && !options.optional) {
        return self.fail(new Error("No auth token"));
    }

    this._secretOrKeyProvider(req, token, function (secretOrKeyError, secretOrKey) {
        if (secretOrKeyError) {
            self.fail(secretOrKeyError)
        } else {
            // Verify the JWT
            JwtStrategy.JwtVerifier(token, secretOrKey, self._verifOpts, function (jwt_err, payload) {
                if (jwt_err) {
                    if (options.optional) return self.success(null, null);
                    else return self.fail(jwt_err);
                } else {
                    // Pass the parsed token to the user
                    var verified = function (err, user, info) {
                        if (err) {
                            if (options.optional) return self.success(null, null);
                            else return self.error(err);
                        } else if (!user) {
                            if (options.optional) return self.success(null, null);
                            else return self.fail(info);
                        } else {
                            return self.success(user, info);
                        }
                    };

                    try {
                        if (self._passReqToCallback) {
                            self._verify(req, payload, verified);
                        } else {
                            self._verify(payload, verified);
                        }
                    } catch (ex) {
                        self.error(ex);
                    }
                }
            });
        }
    });
}

const opts = {
    secretOrKey: config.get('appSecret'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

router.post('/token', function (req, res) {
    if (req.body.email && req.body.password) {
        models.user.findOne({
            where: {
                [Op.or]: [{
                    email: email
                }, {
                    username: email
                }, {
                    phone: email
                }]
            }
        }).then(function (user) {
            if (!user) {
                return res.json({
                    message: 'Email does not exist'
                });
            }

            if (!bCrypt.compareSync(config.get('appSecret') + password, user.password)) {
                return res.json({
                    message: 'Incorrect password.'
                });
            }

            const userinfo = user.get();

            const token = jwt.encode({
                id: userinfo.id,
                email: userinfo.email
            }, config.get('appSecret'));

            res.json({
                token: token
            });

        }).catch(function (err) {

            console.log("Error:", err);

            res.json({
                message: 'Something went wrong with your Signin'
            });

        });
    } else {
        res.sendStatus(401);
    }
});

router.get('/:provider', (req, res, next) => passport.authenticate(req.params.provider)(req, res, next));
router.get('/:provider/callback', (req, res, next) => {
    if (!req.query.code) next('route')
    else next()
}, (req, res) => {
    res.render('provider', {
        code: req.query.code,
        provider: req.params.provider
    })
});

router.post('/:provider', (req, res, next) => {
    if (!req.query.code || !req.params.provider) next('route')
    else next()
}, (req, res, next) => passport.authenticate(req.params.provider, {
    session: false
})(req, res, next), (req, res) => {
    res.json(req.user);
});


const findOrCreateUser = (payload, user, done) => {
    models.user_provider.findOne({
        where: {
            provider: payload.provider,
            provider_user_id: payload.profile.id
        },
        include: models.user
    }).then(user_provider => {
        if (user_provider) {
            user_provider.update({
                access_token: payload.access_token,
                refresh_token: payload.refresh_token
            });

            return done(null, user_provider.user);
        } else {
            if (user) {
                models.user_provider.create({
                    user_id: user.id,
                    provider: payload.provider,
                    provider_user_id: payload.profile.id,
                    access_token: payload.access_token,
                    refresh_token: payload.refresh_token
                });

                return done(null, user);
            } else {
                models.user.count({
                        where: {
                            email: payload.profile.email
                        }
                    })
                    .then(countEmails => {
                        if (countEmails != 0) {
                            return done(new Error('Email already been taked'))
                        } else {
                            const newUser = {};
                            const profile = payload.profile;
                            const names = payload.profile.displayName.split(' ');

                            newUser.email = profile.email ? profile.email : '';
                            newUser.password = '';

                            if (names.lenght === 3) {
                                newUser.first_name = profile.name.givenName ? profile.name.givenName : names[0];
                                newUser.middle_name = profile.name.middleName ? profile.name.middleName : names[1];
                                newUser.last_name = profile.name.familyName ? profile.name.familyName : names[2];
                            } else {
                                newUser.middle_name = '';
                                newUser.first_name = profile.name.givenName ? profile.name.givenName : names[0];
                                newUser.last_name = profile.name.familyName ? profile.name.familyName : names[1];
                            }

                            let username = '';
                            if (profile.username) {
                                username = profile.username;
                            } else {
                                username = slugify(newUser.last_name, {
                                    replacement: '.',
                                    lower: true
                                }).substring(0, 10);
                            }

                            models.user.findAll({
                                    where: {
                                        username: {
                                            [Op.regexp]: '^' + username + '[0-9]*)?$'
                                        }
                                    },
                                    attributes: ['username'],
                                    raw: true
                                })
                                .then(usernames => {
                                    let max = 0;
                                    usernames.map(value => {
                                        let number = +value.username.replace(username, '');
                                        if (number > max) max = number;
                                    })

                                    max++;
                                    newUser.username = max > 1 ? username + max : username;

                                    newUser.user_providers = [{
                                        provider: payload.provider,
                                        provider_user_id: payload.profile.id,
                                        access_token: payload.access_token,
                                        refresh_token: payload.refresh_token
                                    }];

                                    models.user.create(newUser, {
                                        include: [models.user_provider]
                                    }).then(res => {
                                        return done(null, res);
                                    });
                                });
                        }
                    });
            }
        }
    });
}

module.exports = function () {
    passport.use(new JwtStrategy(opts, function (payload, done) {
        models.user.findOne({
                id: payload.id,
                email: payload.email
            })
            .then(function (user) {
                if (!user) {
                    return done(new Error("User not found"));
                }

                return done(null, {
                    id: user.id
                });
            }).catch(function (err) {
                return done(new Error("User not found"));
            });
    }));

    passport.use(new FacebookStrategy({
        clientID: config.get('passport.facebook.id'),
        clientSecret: config.get('passport.facebook.secret'),
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = findOrCreateUser({
            provider: 'facebook',
            access_token: accessToken,
            refresh_token: refreshToken,
            profile: profile
        }, req.user, done);
    }));

    return {
        initialize: () => passport.initialize(),
        required: () => passport.authenticate('jwt', config.get('passport.jwt')),
        optional: () => passport.authenticate('jwt', {
            session: config.get('passport.jwt.session'),
            optional: true
        }),
        router: router
    };
};