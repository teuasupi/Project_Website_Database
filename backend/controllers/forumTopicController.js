const { ForumTopic, Category, User, ForumPost, Comment, sequelize } = require("../models");
const { Op } = require("sequelize");

class ForumTopicController {
  static async createForumTopic(req, res, next) {
    try {
      const { categoryId, title, content } = req.body;
      const authorId = req.user.id;

      if (!categoryId || !title || !content) {
        return res.status(400).json({
          success: false,
          message: "Category ID, title, and content are required"
        });
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      const newTopic = await ForumTopic.create({
        categoryId,
        title,
        content,
        authorId,
        isClosed: false,
        isPinned: false,
        lastActivityAt: new Date()
      });

      return res.status(201).json({
        success: true,
        message: "Forum topic created successfully",
        data: newTopic
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllForumTopics(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || "";
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
      const authorId = req.query.authorId ? parseInt(req.query.authorId) : null;
      const isPinned = req.query.isPinned === "true" ? true : (req.query.isPinned === "false" ? false : null);
      const isClosed = req.query.isClosed === "true" ? true : (req.query.isClosed === "false" ? false : null);
      const sortBy = req.query.sortBy || "lastActivityAt";
      const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const whereCondition = {};
      
      if (search) {
        whereCondition[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } }
        ];
      }
      
      if (categoryId) {
        whereCondition.categoryId = categoryId;
      }
      
      if (authorId) {
        whereCondition.authorId = authorId;
      }
      
      if (isPinned !== null) {
        whereCondition.isPinned = isPinned;
      }
      
      if (isClosed !== null) {
        whereCondition.isClosed = isClosed;
      }

      const { count, rows } = await ForumTopic.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"]
          },
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          }
        ],
        limit,
        offset,
        distinct: true,
        order: [[sortBy, sortOrder]]
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return res.status(200).json({
        success: true,
        message: "Forum topics retrieved successfully",
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

  static async getForumTopicById(req, res, next) {
    try {
      const { id } = req.params;

      const topic = await ForumTopic.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"]
          },
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "email"]
          },
          {
            model: ForumPost,
            as: "posts",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "username", "email"]
              }
            ],
            limit: 10,
            order: [["createdAt", "ASC"]]
          }
        ]
      });

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Forum topic retrieved successfully",
        data: topic
      });
    } catch (error) {
      next(error);
    }
  }

  static async getForumTopicPosts(req, res, next) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const topic = await ForumTopic.findByPk(id);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      const { count, rows } = await ForumPost.findAndCountAll({
        where: { topicId: id },
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
        message: "Forum topic posts retrieved successfully",
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

  static async getForumTopicComments(req, res, next) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const topic = await ForumTopic.findByPk(id);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      const { count, rows } = await Comment.findAndCountAll({
        where: { forumId: id },
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
        message: "Forum topic comments retrieved successfully",
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

  static async updateForumTopic(req, res, next) {
    try {
      const { id } = req.params;
      const { categoryId, title, content } = req.body;
      const currentUserId = req.user.id;

      const topic = await ForumTopic.findByPk(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      if (topic.authorId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this topic"
        });
      }

      if (categoryId && categoryId !== topic.categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: "Category not found"
          });
        }
      }

      await topic.update({
        categoryId: categoryId || topic.categoryId,
        title: title || topic.title,
        content: content || topic.content,
        lastActivityAt: new Date()
      });

      return res.status(200).json({
        success: true,
        message: "Forum topic updated successfully",
        data: topic
      });
    } catch (error) {
      next(error);
    }
  }

  static async toggleTopicClosed(req, res, next) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;

      const topic = await ForumTopic.findByPk(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      if (topic.authorId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this topic"
        });
      }

      await topic.update({
        isClosed: !topic.isClosed,
        lastActivityAt: new Date()
      });

      return res.status(200).json({
        success: true,
        message: `Forum topic ${topic.isClosed ? "closed" : "reopened"} successfully`,
        data: topic
      });
    } catch (error) {
      next(error);
    }
  }

  static async toggleTopicPinned(req, res, next) {
    try {
      const { id } = req.params;

      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Only administrators can pin/unpin topics"
        });
      }

      const topic = await ForumTopic.findByPk(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      await topic.update({
        isPinned: !topic.isPinned
      });

      return res.status(200).json({
        success: true,
        message: `Forum topic ${topic.isPinned ? "pinned" : "unpinned"} successfully`,
        data: topic
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteForumTopic(req, res, next) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;

      const topic = await ForumTopic.findByPk(id);

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Forum topic not found"
        });
      }

      if (topic.authorId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to delete this topic"
        });
      }

      await topic.destroy();

      return res.status(200).json({
        success: true,
        message: "Forum topic deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTrendingTopics(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const days = parseInt(req.query.days) || 7;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const trendingTopics = await ForumTopic.findAll({
        attributes: [
          "id",
          "title",
          "categoryId",
          "authorId",
          "isPinned",
          "isClosed",
          "lastActivityAt",
          "createdAt",
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM "ForumPosts" 
              WHERE "ForumPosts"."topicId" = "ForumTopic"."id" 
              AND "ForumPosts"."createdAt" > '${startDate.toISOString()}'
            )`),
            "postCount"
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM "Comments" 
              WHERE "Comments"."forumId" = "ForumTopic"."id" 
              AND "Comments"."createdAt" > '${startDate.toISOString()}'
            )`),
            "commentCount"
          ]
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"]
          },
          {
            model: User,
            as: "author",
            attributes: ["id", "username"]
          }
        ],
        where: {
          lastActivityAt: {
            [Op.gte]: startDate
          }
        },
        order: [
          [sequelize.literal("postCount + commentCount"), "DESC"],
          ["isPinned", "DESC"],
          ["lastActivityAt", "DESC"]
        ],
        limit
      });

      return res.status(200).json({
        success: true,
        message: "Trending forum topics retrieved successfully",
        data: trendingTopics
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ForumTopicController;