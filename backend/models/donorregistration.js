"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DonorRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DonorRegistration.belongsTo(models.DonationProgram, {
        foreignKey: "programId",
        as: "program",
      });
    }
  }
  DonorRegistration.init(
    {
      donorName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      donationAmount: DataTypes.DECIMAL,
      donationDate: DataTypes.DATE,
      transactionReference: DataTypes.STRING,
      programId: DataTypes.INTEGER,
      isAnonymous: DataTypes.BOOLEAN,
      message: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "DonorRegistration",
    }
  );
  return DonorRegistration;
};
