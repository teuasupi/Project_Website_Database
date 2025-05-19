"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
      News.belongsToMany(models.Category, {
        through: models.NewsCategory,
        foreignKey: "newsId",
        otherKey: "categoryId",
        as: "categories",
      });
      News.belongsToMany(models.Tag, {
        through: models.NewsTag,
        foreignKey: "newsId",
        otherKey: "tagId",
        as: "tags",
      });
      News.hasMany(models.Comment, { foreignKey: "newsId", as: "comments" });
      News.hasMany(models.Gallery, { foreignKey: "newsId", as: "galleries" });
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      excerpt: DataTypes.TEXT,
      featuredImage: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      isPublished: DataTypes.BOOLEAN,
      isFeatured: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
