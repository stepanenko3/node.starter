module.exports = (sequelize, DataTypes) => {
    const ProductCategoryDescription = sequelize.define('product_category_description', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_category_id: {
            type: DataTypes.INTEGER,
        },
        lang: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false
    });

    ProductCategoryDescription.associate = function(models) {
        models.product_category_description.belongsTo(models.product_category, {
            foreignKey: 'product_category_id'
        });
    };

    return ProductCategoryDescription;
}