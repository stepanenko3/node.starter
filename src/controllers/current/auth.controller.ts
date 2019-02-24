import { Controller, Get, Post, Req, Res, Next, Use } from '@tsed/common';
import * as bCrypt from 'bcrypt-nodejs';
import * as Express from 'express';
import * as jwt from 'jwt-simple';
import * as Passport from 'passport';
import * as Sequelize from 'sequelize';
import * as _ from 'underscore';
import { User } from '../../models/user.model';
import { ConfigService } from '../../services/config.service';
const Op = Sequelize.Op;

@Controller('/auth')
export class AuthController {
    constructor(private configService: ConfigService) {}

    @Post('/login')
    public async login(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
    ) {
        if (req.body.email && req.body.password) {
            User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: req.body.email,
                        },
                        {
                            username: req.body.email,
                        },
                        {
                            phone: req.body.email,
                        },
                    ],
                },
            }).then((user) => {
                if (!user) {
                    return res.json({
                        message: 'Email does not exist',
                    });
                }

                if (!bCrypt.compareSync(this.configService.get('appSecret') + req.body, user.password)) {
                    return res.json({
                        message: 'Incorrect password.',
                    });
                }

                const userinfo = user.get();
                const token = jwt.encode({
                    id: userinfo.id,
                    email: userinfo.email,
                }, this.configService.get('appSecret'));

                res.json({ token });
            }).catch((err) => {
                console.log('Error:', err);

                res.json({
                    message: 'Something went wrong with your Signin',
                });
            });
        } else {
            res.sendStatus(401);
        }
    }

    @Get('/:provider')
    public async provider(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction,
    ) {
        return Passport.authenticate(req.params.provider)(req, res, next);
    }

    @Post('/:provider/callback')
    @Use((next) => {

    })
    public async providerCallback(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction,
    ) {
        return Passport.authenticate(req.params.provider)(req, res, next);
    }

    @Post('/:provider')
    public async providerPost(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction,
    ) {
        return Passport.authenticate(req.params.provider)(req, res, next);
    }
}
