module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },

        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });


    return User;
}