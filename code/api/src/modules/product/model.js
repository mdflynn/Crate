'use strict'

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

// 📝 A product currently has no associations. But a product will eventually need to be tied to an order. Products and Orders are a many to many relationship, so a join table order_products will be needed.
// 📝 Product has many order_products
// 📝 Product has many orders through order products
