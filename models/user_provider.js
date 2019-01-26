module.exports = (sequelize, DataTypes) => {
    const UserProvider = sequelize.define('user_provider', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        provider: {
            type: DataTypes.STRING
        },
        provider_user_id: {
            type: DataTypes.STRING,
        },
        access_token: {
            type: DataTypes.STRING,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },

        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    UserProvider.associate = function(models) {
        models.user_provider.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    
    return UserProvider;
}