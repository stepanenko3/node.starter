module.exports = (sequelize, DataTypes) => {
    const ProductDescription = sequelize.define('product_description', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        lang: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        meta_title: {
            type: DataTypes.STRING
        },
        meta_key: {
            type: DataTypes.STRING
        },
        meta_desc: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        short_description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });


    return ProductDescription;
}