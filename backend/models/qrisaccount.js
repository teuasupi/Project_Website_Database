"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QrisAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QrisAccount.hasMany(models.DonationProgram, {
        foreignKey: "qrisAccountId",
        as: "programs",
      });
      QrisAccount.hasMany(models.ManualDonationEntry, {
        foreignKey: "qrisAccountId",
        as: "donations",
      });
    }
  }
  QrisAccount.init(
    {
      accountName: DataTypes.STRING,
      qrisImagePath: DataTypes.STRING,
      bankAccountNumber: DataTypes.STRING,
      bankName: DataTypes.STRING,
      merchantName: DataTypes.STRING,
      merchantId: DataTypes.STRING,
      description: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "QrisAccount",
    }
  );
  return QrisAccount;
};
