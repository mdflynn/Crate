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
        name: 'User 1',
        email: 'user_1@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        streetAddress: "126 Just another street address st",
        city: "Billings",
        state: "Montana",
        zip: "80789",
        country: "USA",
        image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/CFE3/production/_108391235_nessie.jpg",
        description: "Nessie"
      },
      {
        name: 'User 2',
        email: 'user_2@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        streetAddress: "987 User St",
        city: "Portland",
        state: "Oregon",
        zip: "90123",
        country: "USA",
        image: "https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg",
        description: "Bob Ross"
      },
      {
        name: 'User 3',
        email: 'user_3@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        streetAddress: "987 User St",
        city: "Denver",
        state: "Colorado",
        zip: "80123",
        country: "USA",
        image: "https://netdna.coolthings.com/wp-content/uploads/2019/04/jurassic-world-fallen-kingdom-trex-pool-float-1.jpg",
        description: "Trex Floaty"
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
