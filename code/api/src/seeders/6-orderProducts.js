'use strict';
const params = require('../config/params');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderProducts', [
      {
        orderId: 1,
        productId: 7,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        productId: 8,
        returned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 7,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 2,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 3,
        productId: 8,
        returned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 3,
        productId: 4,
        returned: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orderProducts', null, {});
  }
}
