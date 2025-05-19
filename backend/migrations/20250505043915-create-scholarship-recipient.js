'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScholarshipRecipients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scholarshipId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Scholarships',
          key : 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      year: {
        type: Sequelize.INTEGER
      },
      batch: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      successStory: {
        type: Sequelize.TEXT
      },
      testimonial: {
        type: Sequelize.TEXT
      },
      featuredImage: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ScholarshipRecipients');
  }
};