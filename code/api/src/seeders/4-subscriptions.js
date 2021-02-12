'use strict';
const params = require('../config/params');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subscriptions', [
      {
        userId: 2,
        crateId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        crateId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        crateId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        crateId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        crateId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        crateId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions', null, {});
  }
}
