module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define('currency', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        },
        symbol: {
            type: DataTypes.STRING
        },
        rate: {
            type: DataTypes.STRING
        },
        locale: {
            type: DataTypes.STRING
        },
        default: {
            type: DataTypes.INTEGER
        },
        sort_order: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false
    });

    return Currency;
}