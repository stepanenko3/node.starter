module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('city', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        country_id: {
            type: DataTypes.INTEGER(11)
        },
        important: {
            type: DataTypes.INTEGER(1)
        },
        region_id: {
            type: DataTypes.INTEGER(11)
        },
        title: {
            type: DataTypes.STRING(255)
        },
        region: {
            type: DataTypes.STRING(255)
        },
        area: {
            type: DataTypes.STRING(255)
        },
    }, {
        timestamps: false
    });

    return City;
}