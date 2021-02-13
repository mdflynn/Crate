'use strict'

// OrderProduct
module.exports = function(sequelize, DataTypes) {
  let OrderProduct = sequelize.define('orderProducts', {
    productId: {
      type: DataTypes.INTEGER
    },
    orderId: {
      type: DataTypes.INTEGER
    },
    returned: {
      type: DataTypes.BOOLEAN
    }
  })

  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order)
    OrderProduct.belongsTo(models.Product)
  }

  return OrderProduct
}
