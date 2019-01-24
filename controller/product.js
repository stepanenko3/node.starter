const model = require('../models');
const resource = require('../resources/product')

exports.getAll = function (req, res) {
    model.product.findAll({
        limit: 10,
        include: [{
            model: model.product_description,
            attributes: ['id', 'product_id', 'lang', 'name', 'short_description'],
        }, {
            model: model.product_category,
            include: [{
                model: model.product_category_description,
                attributes: ['id', 'product_category_id', 'lang', 'name']
            }]
        }]
    }).then(data => {
        res.json(data.map(resource));
    });
};