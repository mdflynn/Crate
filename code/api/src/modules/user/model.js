'use strict'

// Add shipping address, image, and description attributes here

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
  })
// Add associations
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
