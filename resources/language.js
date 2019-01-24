module.exports = (item) => {
    const columns = ['id', 'code'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    return resource;
}