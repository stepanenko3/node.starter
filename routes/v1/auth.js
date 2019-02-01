const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const passport = require('passport')

const controller = require('../../controller/v1/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);

router.get('/:provider', controller.provider);
router.get('/:provider/callback', (req, res, next) => next(!req.query.code ? 'route' : null), controller.providerCallback)

router.post('/:provider',
    (req, res, next) => next(!req.query.code || !req.params.provider ? 'route' : null),
    (req, res, next) => passport.authenticate(req.params.provider, { session: false })(req, res, next),
    controller.providerProcess);

module.exports = router;