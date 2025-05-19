const { ForumPost, ForumTopic, User, sequelize } = require("../models");
const { Op } = require("sequelize");

class ForumPostController {
  static async createForumPost(req, res, next) {
    try {
      const { topicId, content, parentId } = req.body;
      const authorId = req.user.id;

      if (!topicId || !content) {
        return res.status(400).json({
          success: false,
          message: "Topic ID and content are required"
        });
      }

      const topic = await ForumTopic.findByPk(topicId);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      if (topic.isClosed) {
        return res.status(403).json({
          success: false,
          message: "This topic is closed for new posts"
        });
      }

      if (parentId) {
        const parentPost = await ForumPost.findByPk(parentId);
        if (!parentPost) {
          return res.status(404).json({
            success: false,
            message: "Parent post not found"
          });
        }

        if (parentPost.topicId !== parseInt(topicId)) {
          return res.status(400).json({
            success: false,
            message: "Parent post does not belong to the specified topic"
          });
        }
      }

      const newPost = await ForumPost.create({
        topicId,
        content,
        authorId,
        parentId: parentId || null
      });

      await topic.update({ lastActivityAt: new Date() });

      const postWithDetails = await ForumPost.findByPk(newPost.id, {
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          }
        ]
      });

      return res.status(201).json({
        success: true,
        message: "Forum post created successfully",
        data: postWithDetails
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPostsByTopic(req, res, next) {
    try {
      const { topicId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;
      const hierarchical = req.query.hierarchical === "true";

      const topic = await ForumTopic.findByPk(topicId);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      if (hierarchical) {
        const { count, rows } = await ForumPost.findAndCountAll({
          where: { 
            topicId,
            parentId: null
          },
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "username", "email"]
            },
            {
              model: ForumPost,
              as: "replies",
              include: [
                {
                  model: User,
                  as: "author",
                  attributes: ["id", "username", "email"]
                }
              ],
              order: [["createdAt", "ASC"]]
            }
          ],
          limit,
          offset,
          distinct: true,
          order: [["createdAt", "ASC"]]
        });

        const totalPages = Math.ceil(count / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return res.status(200).json({
          success: true,
          message: "Forum posts retrieved successfully",
          data: rows,
          meta: {
            page,
            limit,
            totalItems: count,
            totalPages,
            nextPage,
            prevPage,
            viewType: "hierarchical"
          }
        });
      } else {
        const { count, rows } = await ForumPost.findAndCountAll({
          where: { topicId },
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "username", "email"]
            },
            {
              model: ForumPost,
              as: "parent",
              include: [
                {
                  model: User,
                  as: "author",
                  attributes: ["id", "username"]
                }
              ],
              attributes: ["id", "content", "createdAt", "authorId"]
            }
          ],
          limit,
          offset,
          order: [["createdAt", "ASC"]]
        });

        const totalPages = Math.ceil(count / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return res.status(200).json({
          success: true,
          message: "Forum posts retrieved successfully",
          data: rows,
          meta: {
            page,
            limit,
            totalItems: count,
            totalPages,
            nextPage,
            prevPage,
            viewType: "flat"
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const includeReplies = req.query.includeReplies !== "false";

      const post = await ForumPost.findByPk(id, {
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          },
          {
            model: ForumTopic,
            as: "topic",
            attributes: ["id", "title", "isClosed"]
          },
          {
            model: ForumPost,
            as: "parent",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "username"]
              }
            ],
            attributes: ["id", "content", "createdAt", "authorId"]
          }
        ]
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Forum post not found"
        });
      }

      let replies = [];
      if (includeReplies) {
        replies = await ForumPost.findAll({
          where: { parentId: id },
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "username", "email"]
            }
          ],
          order: [["createdAt", "ASC"]]
        });
      }

      const responseData = post.toJSON();
      if (includeReplies) {
        responseData.replies = replies;
      }

      return res.status(200).json({
        success: true,
        message: "Forum post retrieved successfully",
        data: responseData
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPostReplies(req, res, next) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const parentPost = await ForumPost.findByPk(id);
      if (!parentPost) {
        return res.status(404).json({
          success: false,
          message: "Parent post not found"
        });
      }

      const { count, rows } = await ForumPost.findAndCountAll({
        where: { parentId: id },
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          }
        ],
        limit,
        offset,
        order: [["createdAt", "ASC"]]
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return res.status(200).json({
        success: true,
        message: "Post replies retrieved successfully",
        data: rows,
        meta: {
          page,
          limit,
          totalItems: count,
          totalPages,
          nextPage,
          prevPage
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const currentUserId = req.user.id;

      if (!content) {
        return res.status(400).json({
          success: false,
          message: "Content is required"
        });
      }

      const post = await ForumPost.findByPk(id, {
        include: [
          {
            model: ForumTopic,
            as: "topic"
          }
        ]
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Forum post not found"
        });
      }

      if (post.topic.isClosed) {
        return res.status(403).json({
          success: false,
          message: "This topic is closed and posts cannot be updated"
        });
      }

      if (post.authorId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this post"
        });
      }

      await post.update({
        content
      });

      await post.topic.update({ lastActivityAt: new Date() });

      const updatedPost = await ForumPost.findByPk(id, {
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          }
        ]
      });

      return res.status(200).json({
        success: true,
        message: "Forum post updated successfully",
        data: updatedPost
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;

      const post = await ForumPost.findByPk(id, {
        include: [
          {
            model: ForumTopic,
            as: "topic"
          }
        ]
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Forum post not found"
        });
      }

      if (post.authorId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to delete this post"
        });
      }

      const repliesCount = await ForumPost.count({
        where: { parentId: id }
      });

      if (repliesCount > 0 && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Cannot delete post with replies"
        });
      }

      if (repliesCount > 0 && req.user.isAdmin) {
        await ForumPost.update(
          { parentId: post.parentId },
          { where: { parentId: id } }
        );
      }

      await post.destroy();

      await post.topic.update({ lastActivityAt: new Date() });

      return res.status(200).json({
        success: true,
        message: "Forum post deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRecentPosts(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * limit;
      const excludeReplies = req.query.excludeReplies === "true";

      const whereCondition = excludeReplies ? { parentId: null } : {};

      const { count, rows } = await ForumPost.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          },
          {
            model: ForumTopic,
            as: "topic",
            attributes: ["id", "title", "categoryId"]
          }
        ],
        limit,
        offset,
        distinct: true,
        order: [["createdAt", "DESC"]]
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return res.status(200).json({
        success: true,
        message: "Recent forum posts retrieved successfully",
        data: rows,
        meta: {
          page,
          limit,
          totalItems: count,
          totalPages,
          nextPage,
          prevPage
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchPosts(req, res, next) {
    try {
      const { query } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;

      if (!query || query.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Search query is required"
        });
      }

      const whereCondition = {
        content: {
          [Op.like]: `%${query}%`
        }
      };

      const { count, rows } = await ForumPost.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          },
          {
            model: ForumTopic,
            as: "topic",
            attributes: ["id", "title", "categoryId"],
            where: categoryId ? { categoryId } : {}
          }
        ],
        limit,
        offset,
        distinct: true,
        order: [["createdAt", "DESC"]]
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return res.status(200).json({
        success: true,
        message: "Search results retrieved successfully",
        data: rows,
        meta: {
          page,
          limit,
          totalItems: count,
          totalPages,
          nextPage,
          prevPage,
          searchQuery: query
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ForumPostController;