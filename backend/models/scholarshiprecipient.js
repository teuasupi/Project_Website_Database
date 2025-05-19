"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScholarshipRecipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ScholarshipRecipient.belongsTo(models.Scholarship, {
        foreignKey: "scholarshipId",
        as: "scholarship",
      });
      ScholarshipRecipient.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  ScholarshipRecipient.init(
    {
      scholarshipId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      batch: DataTypes.STRING,
      major: DataTypes.STRING,
      successStory: DataTypes.TEXT,
      testimonial: DataTypes.TEXT,
      featuredImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ScholarshipRecipient",
    }
  );
  return ScholarshipRecipient;
};
