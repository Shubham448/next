'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_trainers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          IsEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.INTEGER,
      },
      playersTrained: {
        type: Sequelize.INTEGER,
      },
      medals: {
        type: Sequelize.INTEGER,
      },
      picture_url: {
        type: Sequelize.STRING,
      },
      contact_number: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.ENUM,
        values: [
          'BASIC',
          'INTERMEDIATE',
          'ADVANCE',
          'PREMIUM'
        ],
        defaultValue: 'BASIC',
      },
      certificates: {
        type: Sequelize.INTEGER,
      },
      login_type: {
        type: Sequelize.ENUM,
        values: [
          'EMAIL',
          "GOOGLE"
        ], 
        defaultValue: 'EMAIL'
      },
      social_id: {
        type: Sequelize.STRING,
      },
      access_token: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbl_trainers');
  }
};
