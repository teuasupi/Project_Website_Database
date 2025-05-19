"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Comment.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
      Comment.belongsTo(models.ForumTopic, {
        foreignKey: "forumId",
        as: "forumTopic",
      });
      Comment.belongsTo(models.News, { foreignKey: "newsId", as: "news" });
      Comment.belongsTo(models.Comment, {
        foreignKey: "parentId",
        as: "parent",
      });
      Comment.hasMany(models.Comment, {
        foreignKey: "parentId",
        as: "replies",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      articleId: DataTypes.INTEGER,
      forumId: DataTypes.INTEGER,
      newsId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
      isApproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
