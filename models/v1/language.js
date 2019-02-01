module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING
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

    return Language;
}