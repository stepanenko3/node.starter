module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(250)
        },
        priority: {
            type: DataTypes.INTEGER(11)
        },
        areaCodes: {
            type: DataTypes.STRING(255)
        },
        iso: {
            type: DataTypes.STRING(2)
        },
        iso3: {
            type: DataTypes.STRING(3)
        },
        phone: {
            type: DataTypes.INTEGER(10)
        },
    }, {
        timestamps: false
    });

    return Country;
}