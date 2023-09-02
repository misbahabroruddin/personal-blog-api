const { Comment, sequelize } = require('./../models');

class CommentController {
  static async create(req, res, next) {
    try {
      const { name, comment, post_id } = req.body;
      console.log(req.body);
      if (!name || !comment || !post_id) throw { name: 'badRequest' };
      await Comment.create({ name, comment, post_id });
      res.status(201).json({
        success: true,
        message: 'Successfully create',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const foundComment = await Comment.findByPk(id);

      if (!foundComment) throw { name: 'dataNotFound' };

      await Comment.destroy({
        where: { id },
      });

      res.status(201).json({
        success: true,
        message: 'Successfully delete',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
