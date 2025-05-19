"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventRegistration.belongsTo(models.Event, {
        foreignKey: "eventId",
        as: "event",
      });
      EventRegistration.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  EventRegistration.init(
    {
      eventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      registrationDate: DataTypes.DATE,
      attendanceStatus: DataTypes.STRING,
      attendanceNotes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "EventRegistration",
    }
  );
  return EventRegistration;
};
