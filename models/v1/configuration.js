module.exports = (sequelize, DataTypes) => {
    const Config = sequelize.define('configuration', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false
    });

    return Config;
}