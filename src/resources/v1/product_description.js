module.exports = (item) => {
    const columns = ['name', 'meta_title', 'meta_key', 'meta_desc', 'description', 'short_description'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    return resource;
}