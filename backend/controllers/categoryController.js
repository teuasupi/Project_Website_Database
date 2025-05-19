const { Category, ForumTopic, News, Article, Event } = require('../models');
const { Op } = require('sequelize');
const slugify = require('slugify');

class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { name, description, parentId } = req.body;
      
      const slug = slugify(name, { 
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      
      const existingCategory = await Category.findOne({ where: { slug } });
      
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'A category with this name already exists'
        });
      }
      
      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
        
        if (!parentCategory) {
          return res.status(404).json({
            success: false,
            message: 'Parent category not found'
          });
        }
      }
      
      const category = await Category.create({
        name,
        slug,
        description,
        parentId: parentId || null
      });
      
      return res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getAllCategories(req, res, next) {
    try {
      const { 
        parentId,
        search,
        sort = 'name',
        order = 'ASC',
        limit = 10,
        offset = 0
      } = req.query;
      
      const whereConditions = {};
      
      if (parentId === 'null') {
        whereConditions.parentId = null;
      } else if (parentId) {
        whereConditions.parentId = parentId;
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }
      
      const { count, rows: categories } = await Category.findAndCountAll({
        where: whereConditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sort, order]],
        include: [
          {
            model: Category,
            as: 'parent',
            attributes: ['id', 'name', 'slug']
          },
          {
            model: Category,
            as: 'children',
            attributes: ['id', 'name', 'slug'],
            separate: true,
            limit: 5
          }
        ]
      });
      
      return res.status(200).json({
        success: true,
        message: 'Categories retrieved successfully',
        data: {
          total: count,
          categories,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const { includeRelated } = req.query;
      
      const includes = [
        {
          model: Category,
          as: 'parent',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: Category,
          as: 'children',
          attributes: ['id', 'name', 'slug', 'description']
        }
      ];
      
      if (includeRelated === 'true') {
        includes.push(
          {
            model: ForumTopic,
            as: 'forumTopics',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            limit: 5
          },
          {
            model: News,
            as: 'news',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            through: { attributes: [] },
            limit: 5
          },
          {
            model: Article,
            as: 'articles',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            through: { attributes: [] },
            limit: 5
          },
          {
            model: Event,
            as: 'events',
            attributes: ['id', 'title', 'slug', 'startDate', 'endDate'],
            through: { attributes: [] },
            limit: 5
          }
        );
      }
      
      const category = await Category.findByPk(id, {
        include: includes
      });
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getCategoryBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { includeRelated } = req.query;
      
      const includes = [
        {
          model: Category,
          as: 'parent',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: Category,
          as: 'children',
          attributes: ['id', 'name', 'slug', 'description']
        }
      ];
      
      if (includeRelated === 'true') {
        includes.push(
          {
            model: ForumTopic,
            as: 'forumTopics',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            limit: 5
          },
          {
            model: News,
            as: 'news',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            through: { attributes: [] },
            limit: 5
          },
          {
            model: Article,
            as: 'articles',
            attributes: ['id', 'title', 'slug', 'createdAt'],
            through: { attributes: [] },
            limit: 5
          },
          {
            model: Event,
            as: 'events',
            attributes: ['id', 'title', 'slug', 'startDate', 'endDate'],
            through: { attributes: [] },
            limit: 5
          }
        );
      }
      
      const category = await Category.findOne({
        where: { slug },
        include: includes
      });
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, parentId } = req.body;
      
      const category = await Category.findByPk(id);
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      // Prevent circular reference (a category cannot be its own parent)
      if (parentId && parseInt(parentId) === parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'A category cannot be its own parent'
        });
      }
      
      // If parentId provided, check if parent category exists
      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
        
        if (!parentCategory) {
          return res.status(404).json({
            success: false,
            message: 'Parent category not found'
          });
        }
        
        // Prevent circular references in category hierarchy
        // Check if the proposed parent is a child of this category
        const childCategories = await CategoryController.getAllChildIds(id);
        if (childCategories.includes(parseInt(parentId))) {
          return res.status(400).json({
            success: false,
            message: 'Cannot set a child category as parent (circular reference)'
          });
        }
      }
      
      // Generate new slug if name is changed
      let slug = category.slug;
      if (name && name !== category.name) {
        slug = slugify(name, { 
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g
        });
        
        // Check if new slug already exists for a different category
        const existingCategory = await Category.findOne({ 
          where: { 
            slug,
            id: { [Op.ne]: id }
          } 
        });
        
        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: 'A category with this name already exists'
          });
        }
      }
      
      // Update the category
      await category.update({
        name: name || category.name,
        slug,
        description: description !== undefined ? description : category.description,
        parentId: parentId !== undefined ? (parentId || null) : category.parentId
      });
      
      // Fetch updated category with parent and children info
      const updatedCategory = await Category.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'parent',
            attributes: ['id', 'name', 'slug']
          },
          {
            model: Category,
            as: 'children',
            attributes: ['id', 'name', 'slug']
          }
        ]
      });
      
      return res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { forceDelete } = req.query;
      
      const category = await Category.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'children'
          },
          {
            model: ForumTopic,
            as: 'forumTopics'
          },
          {
            model: News,
            as: 'news'
          },
          {
            model: Article,
            as: 'articles'
          },
          {
            model: Event,
            as: 'events'
          }
        ]
      });
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      const hasChildren = category.children && category.children.length > 0;
      const hasForumTopics = category.forumTopics && category.forumTopics.length > 0;
      const hasNews = category.news && category.news.length > 0;
      const hasArticles = category.articles && category.articles.length > 0;
      const hasEvents = category.events && category.events.length > 0;
      
      if (!forceDelete && (hasChildren || hasForumTopics || hasNews || hasArticles || hasEvents)) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete category with related content or subcategories. Use forceDelete=true to override.',
          data: {
            hasChildren,
            hasForumTopics,
            hasNews,
            hasArticles,
            hasEvents
          }
        });
      }
      
      if (hasChildren) {
        await Category.update(
          { parentId: category.parentId },
          { where: { parentId: id } }
        );
      }
      
      await category.destroy();
      
      return res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getAllChildIds(categoryId) {
    const childIds = [];
    const findChildIds = async (parentId) => {
      const children = await Category.findAll({
        where: { parentId },
        attributes: ['id']
      });
      
      for (const child of children) {
        childIds.push(child.id);
        await findChildIds(child.id);
      }
    };
    
    await findChildIds(categoryId);
    return childIds;
  }
  
  static async getCategoryTree(req, res, next) {
    try {
      const rootCategories = await Category.findAll({
        where: { parentId: null },
        attributes: ['id', 'name', 'slug', 'description']
      });
      
      const buildCategoryTree = async (categories) => {
        const result = [];
        
        for (const category of categories) {
          const children = await Category.findAll({
            where: { parentId: category.id },
            attributes: ['id', 'name', 'slug', 'description']
          });
          
          const categoryObj = category.toJSON();
          
          if (children.length > 0) {
            categoryObj.children = await buildCategoryTree(children);
          } else {
            categoryObj.children = [];
          }
          
          result.push(categoryObj);
        }
        
        return result;
      };
      
      const categoryTree = await buildCategoryTree(rootCategories);
      
      return res.status(200).json({
        success: true,
        message: 'Category tree retrieved successfully',
        data: categoryTree
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async getCategoryBreadcrumb(req, res, next) {
    try {
      const { id } = req.params;
      
      const getBreadcrumbPath = async (categoryId, path = []) => {
        if (!categoryId) return path;
        
        const category = await Category.findByPk(categoryId, {
          attributes: ['id', 'name', 'slug', 'parentId']
        });
        
        if (!category) return path;
        
        path.unshift({
          id: category.id,
          name: category.name,
          slug: category.slug
        });
        
        if (category.parentId) {
          return getBreadcrumbPath(category.parentId, path);
        }
        
        return path;
      };
      
      const breadcrumb = await getBreadcrumbPath(id);
      
      if (breadcrumb.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Category breadcrumb retrieved successfully',
        data: breadcrumb
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;