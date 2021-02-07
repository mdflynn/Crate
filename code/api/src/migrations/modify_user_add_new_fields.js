'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'image',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'users',
        'description',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'users',
        'streetAddress',
         Sequelize.STRING
       ),
      queryInterface.addColumn(
        'users',
        'city',
         Sequelize.STRING
       ),
      queryInterface.addColumn(
        'users',
        'state',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'users',
        'zip',
         Sequelize.STRING
       ),
       queryInterface.addColumn(
         'users',
         'country',
          Sequelize.STRING
        )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'image'
    );

    return queryInterface.removeColumn(
      'users',
      'description'
    );
    return queryInterface.removeColumn(
      'users',
      'streetAddress'
    );
    return queryInterface.removeColumn(
      'users',
      'city'
    );
    return queryInterface.removeColumn(
      'users',
      'state'
    );
    return queryInterface.removeColumn(
      'users',
      'zip'
    );
    return queryInterface.removeColumn(
      'users',
      'country'
    );
  }
};
