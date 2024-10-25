

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product" , {
        id: {
            type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        } ,
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT,
            unique: true,
        },
        category: {
            type : DataTypes.STRING
        },
        inStock: {
            type : DataTypes.BOOLEAN,
            defaultValue:true
        }
       
    })
    return Product
    }