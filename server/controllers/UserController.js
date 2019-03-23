import models from '../database/models';

const { User } = models;
/**
 * @class UserController
 * @description Handles User authentication processes
 * @exports UserController
 */
class UserController {
  /**
   * @method registerUser
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async registerUser(req, res) {
    try {
      await User.create({ ...req.user });
      delete req.user.password;
      res
        .status(201)
        .json({
          message: 'User created successfully',
          user: req.user
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default UserController;
