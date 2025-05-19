"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
      Article.belongsToMany(models.Category, {
        through: models.ArticleCategory,
        foreignKey: "articleId",
        otherKey: "categoryId",
        as: "categories",
      });
      Article.belongsToMany(models.Tag, {
        through: models.ArticleTag,
        foreignKey: "articleId",
        otherKey: "tagId",
        as: "tags",
      });
      Article.hasMany(models.Comment, {
        foreignKey: "articleId",
        as: "comments",
      });
      Article.hasMany(models.Gallery, {
        foreignKey: "articleId",
        as: "galleries",
      });
    }
  }
  Article.init(
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
      modelName: "Article",
    }
  );
  return Article;
};
