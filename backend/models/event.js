"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: "organizerId",
        as: "organizer",
      });
      Event.belongsToMany(models.Category, {
        through: models.EventCategory,
        foreignKey: "eventId",
        otherKey: "categoryId",
        as: "categories",
      });
      Event.hasMany(models.EventRegistration, {
        foreignKey: "eventId",
        as: "registrations",
      });
      Event.hasMany(models.Gallery, { foreignKey: "eventId", as: "galleries" });
    }
  }
  Event.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      eventDate: DataTypes.DATE,
      eventTime: DataTypes.TIME,
      endDate: DataTypes.DATE,
      endTime: DataTypes.TIME,
      eventLocation: DataTypes.STRING,
      eventType: DataTypes.STRING,
      maxParticipants: DataTypes.INTEGER,
      registrationDeadline: DataTypes.DATE,
      featuredImage: DataTypes.STRING,
      organizerId: DataTypes.INTEGER,
      isPublished: DataTypes.BOOLEAN,
      isFeatured: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
