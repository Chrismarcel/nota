import { check, validationResult } from 'express-validator/check';

/**
 * @class ValidateNote
 * @description Validates note details
 * @exports ValidateNote
 */
class ValidateNote {
  /**
   * @method validateFields
   * @description - Validates note fields
   * @returns {array} - Express Validator middlewares
   */
  static validateFields() {
    return [
      check('title')
        .exists()
        .withMessage('Note title must be specified')
        .isLength({ min: 3 })
        .withMessage('Title must be up to 3 characters or above')
    ];
  }

  /**
   * @method validateNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {callback} next - Callback method
   * @returns {object} - response object
   */
  static async validateNote(req, res, next) {
    const { title, body } = req.body;
    const errorFormatter = ({ msg }) => msg;
    const errorMessages = validationResult(req).formatWith(errorFormatter);

    if (!errorMessages.isEmpty()) {
      return res.status(400).json({ errors: errorMessages.mapped() });
    }

    req.note = { title, body };
    next();
  }
}

export default ValidateNote;
