const productDescriptionResource = require('./product_description');

module.exports = (product) => {
    const columns = ['id', 'code', 'created_at'];
    const newProduct = {};

    columns.map((column) => {
        if(column in product) {
            newProduct[column] = product[column];
        }
    });

    if('product_descriptions' in product) {
        const descriptions = {};
        product.product_descriptions.map(value => {
            descriptions[value.lang] = productDescriptionResource(value);
        });
        
        newProduct.descriptions = descriptions;
    }

    return newProduct;
}