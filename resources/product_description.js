module.exports = (product) => {
    const columns = ['name', 'meta_title', 'meta_key', 'meta_desc', 'description', 'short_description'];
    const newProduct = {};

    columns.map((column) => {
        if(column in product) {
            newProduct[column] = product[column];
        }
    });

    return newProduct;
}