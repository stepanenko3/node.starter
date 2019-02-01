const currency = require('./currency')
const language = require('./language')
const product = require('./product')
const product_descriptions = require('./product_description')
const product_category = require('./product_category')
const product_category_descriptions = require('./product_category_description')

module.exports = {
    currency: currency,
    language: language,
    product: product,
    product_descriptions: product_descriptions,
    product_category: product_category,
    product_category_descriptions: product_category_descriptions,
};