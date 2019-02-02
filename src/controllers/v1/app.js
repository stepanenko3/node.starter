const config = require('../../config');
const model = require('../../models');
const resource = require('../../resources');

exports.getConfig = (req, res) => {
    res.json({
        'home.filters': config.getDefault('home.filters', 0),
        'product.showSharedCount': config.getDefault('product.showSharedCount', 0),
        'product.allowQRCode': config.getDefault('product.allowQRCode', 1),
        'product.allowShared': config.getDefault('product.allowShared', 1),
        'product.allowSku': config.getDefault('product.allowSku', 1),
        'product.maxInCompare': config.getDefault('product.maxInCompare', 20),
        'product.maxInFavorite': config.getDefault('product.maxInFavorite', 50),
    });
};

exports.getCurrencies = (req, res) => {
    model.currency.findAll()
        .then(data => {
            res.json(data.map(resource.currency));
        })
}

exports.getLanguages = (req, res) => {
    model.language.findAll()
        .then(data => {
            res.json(data.map(resource.language));
        })
}

exports.getCountries = (req, res) => {
    model.country.findAll({
        order: [['title', 'ASC']]
    }).then(data => res.json(data.map(resource.country)))
}