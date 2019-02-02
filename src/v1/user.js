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
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: '',
            // validate: {
            //     isEmail: true
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    User.associate = function (models) {
        models.user.hasMany(models.user_provider, {
            foreignKey: 'user_id'
        });
    };

    return User;
}