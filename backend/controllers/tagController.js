const { Tag, News, Article, Gallery, sequelize } = require("../models");
const { Op } = require("sequelize");

class TagController {
  /**
   * Create a new tag
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async createTag(req, res, next) {
    try {
      const { name, slug } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Tag name is required"
        });
      }

      // Generate slug from name if not provided
      const tagSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

      // Check if tag with the same slug already exists
      const existingTag = await Tag.findOne({
        where: { slug: tagSlug }
      });

      if (existingTag) {
        return res.status(409).json({
          success: false,
          message: "Tag with this slug already exists"
        });
      }

      // Create new tag
      const newTag = await Tag.create({
        name,
        slug: tagSlug
      });

      return res.status(201).json({
        success: true,
        message: "Tag created successfully",
        data: newTag
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all tags
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async getAllTags(req, res, next) {
    try {
      // Get query parameters for pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || "";

      // Build query conditions
      const whereCondition = search
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { slug: { [Op.like]: `%${search}%` } }
            ]
          }
        : {};

      // Find tags with pagination
      const { count, rows } = await Tag.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]]
      });

      // Calculate pagination data
      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return res.status(200).json({
        success: true,
        message: "Tags retrieved successfully",
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

  /**
   * Get tag by ID
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async getTagById(req, res, next) {
    try {
      const { id } = req.params;

      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Tag retrieved successfully",
        data: tag
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get tag by slug
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async getTagBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const tag = await Tag.findOne({
        where: { slug }
      });

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Tag retrieved successfully",
        data: tag
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update tag by ID
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async updateTag(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug } = req.body;

      // Find tag by ID
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      // Generate slug from name if not provided
      const tagSlug = slug || (name ? name.toLowerCase().replace(/\s+/g, "-") : tag.slug);

      // Check if updated slug conflicts with existing tag
      if (tagSlug !== tag.slug) {
        const existingTag = await Tag.findOne({
          where: {
            slug: tagSlug,
            id: { [Op.ne]: id }
          }
        });

        if (existingTag) {
          return res.status(409).json({
            success: false,
            message: "Tag with this slug already exists"
          });
        }
      }

      // Update tag
      await tag.update({
        name: name || tag.name,
        slug: tagSlug
      });

      return res.status(200).json({
        success: true,
        message: "Tag updated successfully",
        data: tag
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete tag by ID
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async deleteTag(req, res, next) {
    try {
      const { id } = req.params;

      // Find tag by ID
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      // Delete tag
      await tag.destroy();

      return res.status(200).json({
        success: true,
        message: "Tag deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get tag with associated content
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async getTagWithContent(req, res, next) {
    try {
      const { id } = req.params;

      const tag = await Tag.findByPk(id, {
        include: [
          {
            model: News,
            as: "news",
            through: { attributes: [] } // Exclude the junction table
          },
          {
            model: Article,
            as: "articles",
            through: { attributes: [] }
          },
          {
            model: Gallery,
            as: "galleries",
            through: { attributes: [] }
          }
        ]
      });

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Tag with associated content retrieved successfully",
        data: tag
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get popular tags based on usage count
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next middleware function
   */
  static async getPopularTags(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;

      // Get popular tags by counting associations
      const popularTags = await Tag.findAll({
        attributes: [
          "id",
          "name",
          "slug",
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM "NewsTags" WHERE "NewsTags"."tagId" = "Tag"."id"
              +
              SELECT COUNT(*) FROM "ArticleTags" WHERE "ArticleTags"."tagId" = "Tag"."id"
              +
              SELECT COUNT(*) FROM "GalleryTags" WHERE "GalleryTags"."tagId" = "Tag"."id"
            )`),
            "count"
          ]
        ],
        order: [[sequelize.literal('"count"'), "DESC"]],
        limit
      });

      return res.status(200).json({
        success: true,
        message: "Popular tags retrieved successfully",
        data: popularTags
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TagController;