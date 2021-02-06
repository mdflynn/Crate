'use strict'

// User
module.exports = function(sequelize, DataTypes) {


  // 🌟 Add shipping address, image, and description attributes here


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

  User.associate = function(models) {
    User.hasMany(models.Subscription)


    // 🌟 Add associations here


  }

  return User
}
