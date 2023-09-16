const {
  Post,
  Tag,
  Post_Tag,
  User,
  Comment,
  sequelize,
} = require('./../models');

class PostController {
  static async create(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const { title, content, category, tags } = req.body;

      let postData = {
        author_id: id,
        title,
        content,
        category,
        tags,
      };

      if (req.file) {
        const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;

        postData = {
          ...postData,
          thumbnail_url: imagePath,
        };
      }

      const post = await Post.create(postData);

      res.status(201).json({
        success: true,
        message: 'Successfully create post',
        data: {
          title: post.title,
          thumbnail: post.thumbnail_url,
          content: post.content,
          category: post.category,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const { page, limit } = req.query;

    try {
      const DEFAULT_PAGE = 1;
      const DEFAULT_LIMIT = 10;
      const curretPage = parseInt(page) || DEFAULT_PAGE;
      const dataPerPage = parseInt(limit) || DEFAULT_LIMIT;
      const offset = (curretPage - 1) * dataPerPage;

      const post = await Post.findAll({
        attributes: [
          'id',
          'title',
          'content',
          'category',
          'thumbnail_url',
          'createdAt',
        ],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['first_name', 'last_name', 'username', 'image_url'],
          },
          {
            model: Tag,
            as: 'tags',
            attributes: ['name'],
          },
        ],
        limit: dataPerPage,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const countPost = await Post.count();

      const totalPages = Math.ceil(countPost / dataPerPage);

      res.status(200).json({
        success: true,
        message: 'Successfully retrivied data',
        metadata: {
          page: curretPage,
          dataPerPage,
          totalPages,
        },
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getId(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({
        where: { id },
        attributes: [
          'id',
          'title',
          'content',
          'category',
          'thumbnail_url',
          'createdAt',
        ],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['first_name', 'last_name', 'username', 'image_url'],
          },
          {
            model: Tag,
            as: 'tags',
            attributes: ['name'],
          },
          {
            model: Comment,
            as: 'comments',
            attributes: ['id', 'name', 'comment', ['createdAt', 'time']],
          },
        ],
      });

      if (!post) throw { name: 'dataNotFound' };

      res.status(200).json({
        success: true,
        message: 'Successfully retrivied data',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, category } = req.body;
      let updatedPost = {
        title,
        content,
        category,
      };

      const foundPost = await Post.findByPk(id);

      if (!foundPost) throw { name: 'dataNotFound' };

      if (req.file) {
        const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;

        updatedPost = {
          ...updatedPost,
          thumbnail_url: imagePath,
        };
      }

      if (!title || !content || !category) {
        throw { name: 'badRequest' };
      }

      await Post.update(updatedPost, {
        where: { id: foundPost.id },
      });

      res.status(200).json({
        success: true,
        message: 'Successfully update',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const foundPost = await Post.findOne({
        where: { id },
      });

      if (!foundPost) throw { name: 'dataNotFound' };

      await Post.destroy({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: 'Successfully delete',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
