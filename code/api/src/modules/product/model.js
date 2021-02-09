'use strict'


// 🌟 Add associations. Add joins table for order_products? (order and products are many to many relationship)


// Product
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}
