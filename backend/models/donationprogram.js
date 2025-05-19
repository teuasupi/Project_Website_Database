"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DonationProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DonationProgram.belongsTo(models.QrisAccount, {
        foreignKey: "qrisAccountId",
        as: "qrisAccount",
      });
      DonationProgram.hasMany(models.ManualDonationEntry, {
        foreignKey: "programId",
        as: "donations",
      });
      DonationProgram.hasMany(models.DonorRegistration, {
        foreignKey: "programId",
        as: "donors",
      });
      DonationProgram.hasMany(models.DonationReport, {
        foreignKey: "programId",
        as: "reports",
      });
    }
  }
  DonationProgram.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      targetAmount: DataTypes.DECIMAL,
      currentAmount: DataTypes.DECIMAL,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
      featuredImage: DataTypes.STRING,
      qrisAccountId: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DonationProgram",
    }
  );
  return DonationProgram;
};
