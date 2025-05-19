"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ManualDonationEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ManualDonationEntry.belongsTo(models.DonationProgram, {
        foreignKey: "programId",
        as: "program",
      });
      ManualDonationEntry.belongsTo(models.QrisAccount, {
        foreignKey: "qrisAccountId",
        as: "qrisAccount",
      });
      ManualDonationEntry.belongsTo(models.User, {
        foreignKey: "verifiedBy",
        as: "verifier",
      });
    }
  }
  ManualDonationEntry.init(
    {
      amount: DataTypes.DECIMAL,
      donorName: DataTypes.STRING,
      donationDate: DataTypes.DATE,
      transactionReference: DataTypes.STRING,
      notes: DataTypes.TEXT,
      programId: DataTypes.INTEGER,
      qrisAccountId: DataTypes.INTEGER,
      isVerified: DataTypes.BOOLEAN,
      verifiedBy: DataTypes.INTEGER,
      verification_Date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ManualDonationEntry",
    }
  );
  return ManualDonationEntry;
};
