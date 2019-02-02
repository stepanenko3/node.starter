module.exports = (sequelize, DataTypes) => {
    const Config = sequelize.define('configuration', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        key: {
            type: DataTypes.STRING(255)
        },
        value: {
            type: DataTypes.TEXT
        },
    }, {
        timestamps: false
    });

    return Config;
}