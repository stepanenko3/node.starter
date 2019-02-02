const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require("jwt-simple")
const passport = require('passport')
const models = require('../../models')
const config = require('../../config')
const bCrypt = require('bcrypt-nodejs')
const slugify = require('slugify')
// const userResource = require('../resources/user');
const Ajv = require('ajv');
const ajv = new Ajv();

exports.login = (req, res) => {
    const valid = ajv.validate({
        properties: {
            email: {
                format: "email",
                required: true,
                minLength: 2
            },
            password: {
                type: "string",
                required: true,
                minLength: 8
            }
        }
    }, req.body);


    if (!valid) {
        console.log(ajv.errors);
    }

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
}

exports.register = (req, res) => {

}

exports.provider = (req, res, next) => passport.authenticate(req.params.provider)(req, res, next)
exports.providerCallback = (req, res) => {
    res.render('provider', {
        code: req.query.code,
        provider: req.params.provider
    })
}

exports.providerProcess = (req, res) => {
    res.json(req.user);
    
}