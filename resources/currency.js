module.exports = (item) => {
    const columns = ['id', 'name', 'code', 'symbol', 'rate', 'locale', 'default'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    return resource;
}