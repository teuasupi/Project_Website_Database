"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gallery.belongsTo(models.User, {
        foreignKey: "uploaderId",
        as: "uploader",
      });
      Gallery.belongsTo(models.Event, { foreignKey: "eventId", as: "event" });
      Gallery.belongsTo(models.News, { foreignKey: "newsId", as: "news" });
      Gallery.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
      Gallery.belongsToMany(models.Tag, {
        through: models.GalleryTag,
        foreignKey: "galleryId",
        otherKey: "tagId",
        as: "tags",
      });
    }
  }
  Gallery.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.STRING,
      filePath: DataTypes.STRING,
      thumbnailPath: DataTypes.STRING,
      uploaderId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      newsId: DataTypes.INTEGER,
      articleId: DataTypes.INTEGER,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Gallery",
    }
  );
  return Gallery;
};
