"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scholarship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Scholarship.hasMany(models.ScholarshipRecipient, {
        foreignKey: "scholarshipId",
        as: "recipients",
      });
      Scholarship.hasMany(models.ScholarshipApplication, {
        foreignKey: "scholarshipId",
        as: "applications",
      });
    }
  }
  Scholarship.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      amount: DataTypes.DECIMAL,
      applicationdeadline: DataTypes.DATE,
      selectionDate: DataTypes.DATE,
      announcementDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      applicationFormUrl: DataTypes.STRING,
      provider: DataTypes.STRING,
      contactPerson: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      status: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
      featuredImage: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Scholarship",
    }
  );
  return Scholarship;
};
