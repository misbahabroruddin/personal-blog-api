const { User, Post } = require('./../models');

class UserController {
  static async getUserLogin(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const data = await User.findOne({
        where: { id },
        attributes: [
          'first_name',
          'last_name',
          'email',
          'username',
          'image_url',
        ],
        include: [
          {
            model: Post,
            attributes: [
              'id',
              'title',
              'content',
              'category',
              'thumbnail_url',
              'createdAt',
            ],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: 'Successfully retrivied data',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const { first_name, last_name, username, email, password } = req.body;

      let updatedUser = {
        first_name,
        last_name,
        username,
        email,
        password,
      };

      if (req.file) {
        const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
        updatedUser = {
          ...updatedUser,
          image_url: imagePath,
        };
      }

      await User.update(updatedUser, {
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: 'Successfully updated data',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
