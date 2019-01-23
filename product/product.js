const model = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },

    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});