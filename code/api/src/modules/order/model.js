'use strict'

// Order
module.exports = function(sequelize, DataTypes) {
  let Order = sequelize.define('orders', {
    subscriptionId: {
      type: DataTypes.INTEGER
    },
    deliveryDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING
    }
  })

  Order.associate = function(models) {
    Order.belongsTo(models.Subscription)
    Order.hasMany(models.OrderProduct)
  }

  return Order
}
