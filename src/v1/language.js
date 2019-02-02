module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(250)
        },
        sort_order: {
            type: DataTypes.INTEGER(1)
        },
        status: {
            type: DataTypes.INTEGER(11)
        },
        
        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Language;
}