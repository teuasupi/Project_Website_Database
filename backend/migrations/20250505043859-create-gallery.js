'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Galleries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      filePath: {
        type: Sequelize.STRING
      },
      thumbnailPath: {
        type: Sequelize.STRING
      },
      uploaderId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      eventId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Events',
          key : 'id'
        }
      },
      newsId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'News',
          key : 'id'
        }
      },
      articleId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Articles',
          key : 'id'
        }
      },
      isPublished: {
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
    await queryInterface.dropTable('Galleries');
  }
};