module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define('product_category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        parent_id: {
            type: DataTypes.INTEGER,
        },
        sort_order: {
            type: DataTypes.INTEGER,
        },
        image_id: {
            type: DataTypes.INTEGER,
        },
        top: {
            type: DataTypes.INTEGER,
        },
        alt: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false
    });

    ProductCategory.associate = function(models) {
        models.product_category.hasMany(models.product_category_description, {
            foreignKey: 'product_category_id',
        });

        models.product_category.belongsToMany(models.product, {
            through: 'product_product_category',
            foreignKey: 'product_category_id',
            otherKey: 'product_id',
            timestamps: false
        });
    };

    return ProductCategory;
}