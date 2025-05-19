"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForumTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumTopic.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      ForumTopic.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author",
      });
      ForumTopic.hasMany(models.ForumPost, {
        foreignKey: "topicId",
        as: "posts",
      });
      ForumTopic.hasMany(models.Comment, {
        foreignKey: "forumId",
        as: "comments",
      });
    }
  }
  ForumTopic.init(
    {
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
      isClosed: DataTypes.BOOLEAN,
      isPinned: DataTypes.BOOLEAN,
      lastActivityAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ForumTopic",
    }
  );
  return ForumTopic;
};
