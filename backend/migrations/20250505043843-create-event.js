'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      eventDate: {
        type: Sequelize.DATE
      },
      eventTime: {
        type: Sequelize.TIME
      },
      endDate: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.TIME
      },
      eventLocation: {
        type: Sequelize.STRING
      },
      eventType: {
        type: Sequelize.STRING
      },
      maxParticipants: {
        type: Sequelize.INTEGER
      },
      registrationDeadline: {
        type: Sequelize.DATE
      },
      featuredImage: {
        type: Sequelize.STRING
      },
      organizerId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      isPublished: {
        type: Sequelize.BOOLEAN
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Events');
  }
};