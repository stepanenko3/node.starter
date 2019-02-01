const productDescription = require('./product_description');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING
        },

        // Timestamps
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Product.associate = function(models) {
        models.product.hasMany(models.product_description, {
            foreignKey: 'product_id',
        });

        models.product.belongsToMany(models.product_category, {
            through: 'product_product_category',
            foreignKey: 'product_id',
            otherKey: 'product_category_id',
            timestamps: false
        });
    };

    return Product;
}