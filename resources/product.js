const description = require('./product_description');
const category = require('./product_category');

module.exports = (item) => {
    const columns = ['id', 'code', 'created_at'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    if('product_descriptions' in item) {
        const descriptions = {};
        item.product_descriptions.map(value => {
            descriptions[value.lang] = description(value);
        });
        
        resource.descriptions = descriptions;
    }


    if('product_categories' in item) {
        const categories = [];
        item.product_categories.map(value => {
            categories.push(category(value));
        })

        resource.categories = categories;
    }

    return resource;
}