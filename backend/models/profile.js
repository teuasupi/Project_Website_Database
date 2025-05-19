"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      bio: DataTypes.TEXT,
      nim: DataTypes.STRING,
      entryYear: DataTypes.INTEGER,
      graduationYear: DataTypes.INTEGER,
      currentSemester: DataTypes.INTEGER,
      specialization: DataTypes.STRING,
      gpa: DataTypes.DECIMAL,
      degree: DataTypes.STRING,
      thesisTitle: DataTypes.TEXT,
      currentCompany: DataTypes.STRING,
      currentPosition: DataTypes.STRING,
      industry: DataTypes.STRING,
      linkedinUrl: DataTypes.STRING,
      yearsOfExperience: DataTypes.INTEGER,
      profileType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
