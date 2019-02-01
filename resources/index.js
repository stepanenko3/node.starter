const config = require('../config')

module.exports = require('./v' + config.get('api.version'))