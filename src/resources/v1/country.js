module.exports = (item) => {
    const columns = ['id', 'priority', 'iso', 'iso3'];
    const resource = {};

    columns.map((column) => {
        if(column in item) {
            resource[column] = item[column];
        }
    });

    if (item.name) resource.title = item.name;
    if (item.phone) resource.dialCode = item.phone;
    if (item.areaCodes) resource.areaCodes = item.areaCodes.split('|');

    return resource;
}