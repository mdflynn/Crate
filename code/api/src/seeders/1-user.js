'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
        streetAddress: "123 Admin St",
        city: "Denver",
        state: "Colorado",
        zip: "80123",
        country: "USA",
        image: "https://www.chicagotribune.com/resizer/NUc4EPJ-swl5GzWbfbKR8vH0pd0=/800x440/top/www.trbimg.com/img-546459ac/turbine/redeye-jake-from-state-farm-commercial-20141112",
        description: "Jake from State Farm"
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        streetAddress: "987 User St",
        city: "Denver",
        state: "Colorado",
        zip: "80123",
        country: "USA",
        image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/CFE3/production/_108391235_nessie.jpg",
        description: "Nessie"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
