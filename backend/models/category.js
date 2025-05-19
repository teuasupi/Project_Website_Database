"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Category, {
        foreignKey: "parentId",
        as: "parent",
      });
      Category.hasMany(models.Category, {
        foreignKey: "parentId",
        as: "children",
      });
      Category.hasMany(models.ForumTopic, {
        foreignKey: "categoryId",
        as: "forumTopics",
      });
      Category.belongsToMany(models.News, {
        through: models.NewsCategory,
        foreignKey: "categoryId",
        otherKey: "newsId",
        as: "news",
      });
      Category.belongsToMany(models.Article, {
        through: models.ArticleCategory,
        foreignKey: "categoryId",
        otherKey: "articleId",
        as: "articles",
      });
      Category.belongsToMany(models.Event, {
        through: models.EventCategory,
        foreignKey: "categoryId",
        otherKey: "eventId",
        as: "events",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
