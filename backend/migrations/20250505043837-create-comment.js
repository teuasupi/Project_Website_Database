'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
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
      forumId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'forumTopics',
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
      parentId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Comments',
          key : 'id'
        }
      },
      isApproved: {
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
    await queryInterface.dropTable('Comments');
  }
};