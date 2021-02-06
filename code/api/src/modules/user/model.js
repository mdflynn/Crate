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
    // add image, personal description, shipping address attributes
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
    // add order hasMany association
  }

  return User
}