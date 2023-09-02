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
      await sequelize.transaction(async (t) => {
        const post = await Post.create(
          {
            author_id: id,
            title,
            content,
            category,
          },
          { transaction: t }
        );

        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];

          const foundTag = await Tag.findOne({
            where: { name: tag.name },
          });

          if (foundTag) {
            await Post_Tag.create(
              {
                post_id: post.id,
                tag_id: foundTag.id,
              },
              { transaction: t }
            );
          } else {
            const createTag = await Tag.create(
              {
                name: tag.name,
              },
              { transaction: t }
            );

            await Post_Tag.create(
              {
                post_id: post.id,
                tag_id: createTag.id,
              },
              { transaction: t }
            );
          }
        }

        res.status(201).json({
          success: true,
          message: 'Successfully create post',
          data: {
            title: post.title,
            content: post.content,
            category: post.category,
          },
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const post = await Post.findAll({
        attributes: ['title', 'content', 'category'],
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
      });

      res.status(200).json({
        success: true,
        message: 'Successfully retrivied data',
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
        attributes: ['title', 'content', 'category'],
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
            attributes: ['name', 'comment', ['createdAt', 'time']],
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
      const { title, content, category, tags } = req.body;
      let updatedPost = {
        title,
        content,
        category,
        tags,
      };

      await sequelize.transaction(async (t) => {
        const foundPost = await Post.findOne({
          where: { id },
        });

        if (!foundPost) throw { name: 'dataNotFound' };

        if (!title || !content || !category || !tags) {
          throw { name: 'badRequest' };
        }

        await Post.update(updatedPost, {
          where: { id },
        });

        res.status(200).json({
          success: true,
          message: 'Successfully update',
        });
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
