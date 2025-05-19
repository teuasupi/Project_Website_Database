"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId", as: "profile" });
      User.hasMany(models.ForumTopic, {
        foreignKey: "authorId",
        as: "forumTopics",
      });
      User.hasMany(models.ForumPost, {
        foreignKey: "authorId",
        as: "forumPosts",
      });
      User.hasMany(models.News, { foreignKey: "authorId", as: "news" });
      User.hasMany(models.Article, { foreignKey: "authorId", as: "articles" });
      User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
      User.hasMany(models.Event, {
        foreignKey: "organizerId",
        as: "organizedEvents",
      });
      User.hasMany(models.EventRegistration, {
        foreignKey: "userId",
        as: "eventRegistrations",
      });
      User.hasMany(models.Gallery, { foreignKey: "uploaderId", as: "uploads" });
      User.hasMany(models.ScholarshipRecipient, {
        foreignKey: "userId",
        as: "scholarships",
      });
      User.hasMany(models.ScholarshipApplication, {
        foreignKey: "userId",
        as: "scholarshipApplications",
      });
      User.hasMany(models.ManualDonationEntry, {
        foreignKey: "verifiedBy",
        as: "verifiedDonations",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      verificationStatus: DataTypes.BOOLEAN,
      resetToken: DataTypes.STRING,
      resetTokenExpires: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
      lastLogin: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
