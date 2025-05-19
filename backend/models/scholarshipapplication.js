"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScholarshipApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ScholarshipApplication.belongsTo(models.Scholarship, {
        foreignKey: "scholarshipId",
        as: "scholarship",
      });
      ScholarshipApplication.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  ScholarshipApplication.init(
    {
      scholarshipId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      applicationDate: DataTypes.DATE,
      status: DataTypes.STRING,
      review_notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ScholarshipApplication",
    }
  );
  return ScholarshipApplication;
};
