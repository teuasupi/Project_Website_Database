"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DonationReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DonationReport.belongsTo(models.DonationProgram, {
        foreignKey: "programId",
        as: "program",
      });
    }
  }
  DonationReport.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      periodStart: DataTypes.DATE,
      periodEnd: DataTypes.DATE,
      totalReceived: DataTypes.DECIMAL,
      totalUsed: DataTypes.DECIMAL,
      reportFile: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
      programId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DonationReport",
    }
  );
  return DonationReport;
};
