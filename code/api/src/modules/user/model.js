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
    },
    image: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.STRING
    },
    streetAddress: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
    User.hasMany(models.Order, {through: models.Subscription})
  }
  return User
}
