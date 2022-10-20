'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carlist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      hargasewa: {
        type: Sequelize.INTEGER
      },
      ukuran: {
        type: Sequelize.STRING
      },
      urlfoto: {
        type: Sequelize.STRING
      },
      createdate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carlist');
  }
};