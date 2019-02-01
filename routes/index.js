const express = require('express');
const apiRouter = express.Router()
const config = require('../config')
const v1 = require('./v1')

apiRouter.use('/v1', (req, res, next) => {
    config.set('api.version', 1)
    next();
}, v1)

module.exports = {
    api: apiRouter
};
