module.exports = (item) => {
    const columns = ['id', 'name', 'description'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });
    
    return resource;
}