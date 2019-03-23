import models from '../database/models';
import Helper from '../helpers/Helpers';

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
      const userObject = req.user;
      delete userObject.password;
      const token = Helper.generateToken({ ...req.user });
      res
        .status(201)
        .json({
          message: 'User created successfully',
          user: { ...userObject, token }
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default UserController;
