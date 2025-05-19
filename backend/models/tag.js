"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.News, {
        through: models.NewsTag,
        foreignKey: "tagId",
        otherKey: "newsId",
        as: "news",
      });
      Tag.belongsToMany(models.Article, {
        through: models.ArticleTag,
        foreignKey: "tagId",
        otherKey: "articleId",
        as: "articles",
      });
      Tag.belongsToMany(models.Gallery, {
        through: models.GalleryTag,
        foreignKey: "tagId",
        otherKey: "galleryId",
        as: "galleries",
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
