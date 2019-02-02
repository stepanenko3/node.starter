module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define('currency', {
        id: {
            type: DataTypes.INTEGER(10  ),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50)
        },
        code: {
            type: DataTypes.STRING(10)
        },
        symbol: {
            type: DataTypes.STRING(10)
        },
        rate: {
            type: DataTypes.DOUBLE(10, 4)
        },
        locale: {
            type: DataTypes.STRING(10)
        },
        default: {
            type: DataTypes.INTEGER(1)
        },
        sort_order: {
            type: DataTypes.INTEGER(11)
        },
        status: {
            type: DataTypes.INTEGER(1)
        },
    }, {
        timestamps: false
    });

    return Currency;
}