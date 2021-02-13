'use strict';
const params = require('../config/params');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        subscriptionId: 1,
        status: "delivered",
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 1,
        status: "pending shipment",
        deliveryDate: new Date('March 17, 2021 03:24:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 1,
        status: "cancelled",
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 2,
        status: "pending shipment",
        deliveryDate: 'March 17, 2021 03:24:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 2,
        status: "delivered",
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subscriptionId: 3,
        status: "delivered",
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {});
  }
}
