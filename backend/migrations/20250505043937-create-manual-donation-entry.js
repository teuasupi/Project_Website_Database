'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ManualDonationEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      donorName: {
        type: Sequelize.STRING
      },
      donationDate: {
        type: Sequelize.DATE
      },
      transactionReference: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      programId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'DonationPrograms',
          key : 'id'
        }
      },
      qrisAccountId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'QRISAccounts',
          key : 'id'
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      verifiedBy: {
        type: Sequelize.INTEGER
      },
      verification_Date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ManualDonationEntries');
  }
};