'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      nim: {
        type: Sequelize.STRING
      },
      entryYear: {
        type: Sequelize.INTEGER
      },
      graduationYear: {
        type: Sequelize.INTEGER
      },
      currentSemester: {
        type: Sequelize.INTEGER
      },
      specialization: {
        type: Sequelize.STRING
      },
      gpa: {
        type: Sequelize.DECIMAL
      },
      degree: {
        type: Sequelize.STRING
      },
      thesisTitle: {
        type: Sequelize.TEXT
      },
      currentCompany: {
        type: Sequelize.STRING
      },
      currentPosition: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      linkedinUrl: {
        type: Sequelize.STRING
      },
      yearsOfExperience: {
        type: Sequelize.INTEGER
      },
      profileType: {
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
    await queryInterface.dropTable('Profiles');
  }
};