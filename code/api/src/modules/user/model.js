'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
    // 📝 Will need to add our image, description, email, and address definitions here
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
    // 📝 Will need to add other associations here.
    // 📝 User has many orders/deliveries through subscriptions
    // 📝 User may also have many order_products, the joins table for tying products to deliveries/orders, through orders.
  }

  return User
}
