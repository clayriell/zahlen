"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      customer: {
        type: Sequelize.STRING,
      },
      ref: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      note: {
        type: Sequelize.STRING,
      },
      user: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
      },
      maturity_date: {
        type: Sequelize.DATEONLY,
      },
      paid_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invoices");
  },
};
