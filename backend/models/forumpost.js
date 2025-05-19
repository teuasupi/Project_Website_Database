"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForumPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumPost.belongsTo(models.ForumTopic, {
        foreignKey: "topicId",
        as: "topic",
      });
      ForumPost.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author",
      });
      ForumPost.belongsTo(models.ForumPost, {
        foreignKey: "parentId",
        as: "parent",
      });
      ForumPost.hasMany(models.ForumPost, {
        foreignKey: "parentId",
        as: "replies",
      });
    }
  }
  ForumPost.init(
    {
      topicId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ForumPost",
    }
  );
  return ForumPost;
};
