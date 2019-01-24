const descriptionResource = require('./product_description');

module.exports = (item) => {
    const columns = ['id', 'parent_id', 'sort_order', 'image_id', 'top', 'alt', 'status'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    if('product_category_descriptions' in item) {
        const descriptions = {};
        item.product_category_descriptions.map(value => {
            descriptions[value.lang] = descriptionResource(value);
        });
        
        resource.descriptions = descriptions;
    }

    return resource;
}