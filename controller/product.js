const model = require('../models');
const resource = require('../resources/product')

exports.getAll = function (req, res) {
    model.product.findAll({
        limit: 1000,
        include: [{
            model: model.product_description,
            attributes: ['id', 'product_id', 'lang', 'name', 'short_description'],
        }]
    }).then(data => {
        res.json(data.map(resource));
    });
};