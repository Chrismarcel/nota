import { check, validationResult } from 'express-validator/check';
import Sequelize from 'sequelize';
import models from '../database/models';
import Helpers from '../helpers/Helpers';

const { Op } = Sequelize;
const { User } = models;
/**
 * @class ValidateUser
 * @description Validates user registration details
 * @exports ValidateUser
 */
class ValidateUser {
  /**
   * @method validateFields
   * @description - Validates user profile fields
   * @param {boolean} isLogin - check if the login route is being assessed
   * @returns {array} - Express Validator middlewares
   */
  static validateFields(isLogin = false) {
    const passwordField = [
      check('password')
        .exists()
        .withMessage('Password field must be specified')
        .isLength({ min: 8 })
        .withMessage('Password must be up to 8 characters or above')
    ];

    const registrationFields = [
      check('username')
        .exists()
        .withMessage('Username field must be specified')
        .isAlphanumeric('en-GB')
        .withMessage('Username field can contain only numbers and alphabets')
        .isLength({ min: 3 })
        .withMessage('Username must be up to 3 characters or above'),

      check('email')
        .exists()
        .withMessage('Email field must be specified')
        .isEmail()
        .withMessage('You have specified an invalid email'),
    ];

    const loginField = [
      check('name')
        .exists({
          checkFalsy: true,
          checkNull: true
        })
        .withMessage('Username or email must be specifed'),
    ];

    if (isLogin) {
      return [...loginField, ...passwordField];
    }
    return [...registrationFields, ...passwordField];
  }

  /**
   * @method validateRegistration
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {callback} next - Callback method
   * @returns {object} - response object
   */
  static async validateUserDetails(req, res, next) {
    const { username, email, password } = req.body;
    const errorFormatter = ({ msg }) => msg;
    const errorMessages = validationResult(req).formatWith(errorFormatter);

    const hashedPassword = Helpers.hashPassword(password);

    if (!errorMessages.isEmpty()) {
      return res.status(400).json({ errors: errorMessages.mapped() });
    }

    const uniqueUsers = await ValidateUser.isUserUnique(email, username);
    if (uniqueUsers.length > 0) {
      return res.status(409).json({ errors: 'Username or Email already exists' });
    }

    const { body } = req;
    req.user = { ...body, password: hashedPassword };
    next();
  }

  /**
   * @method isUserUnique
   * @description Validates if user is unique
   * @param {string} email - User's email
   * @param {string} username - User's username
   * @returns {boolean} - If user detail is unique or not
   */
  static async isUserUnique(email, username) {
    const user = await User.findAll({
      attributes: ['email', 'username'],
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    const existingUserObject = await user;
    return user.length > 0 ? Object.keys(existingUserObject[0]) : [];
  }
}

export default ValidateUser;
