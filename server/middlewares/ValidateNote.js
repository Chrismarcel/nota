import { check, validationResult } from 'express-validator/check';
import models from '../database/models';

const { Note } = models;
/**
 * @class ValidateNote
 * @description Validates note details
 * @exports ValidateNote
 */
class ValidateNote {
  /**
   * @method validateFields
   * @description - Validates note fields
   * @param {boolean} isSingleArticle - Single article
   * @returns {array} - Express Validator middlewares
   */
  static validateFields(isSingleArticle = true) {
    if (isSingleArticle) {
      return [
        check('id')
          .exists()
          .withMessage('Note id must be specified')
          .isNumeric()
          .withMessage('Note id can only be numeric')
      ];
    }
    return [
      check('title')
        .exists()
        .withMessage('Note title must be specified')
        .isLength({ min: 3 })
        .withMessage('Title must be up to 3 characters or above')
    ];
  }

  /**
   * @method validateNoteFields
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {callback} next - Callback method
   * @returns {object} - response object
   */
  static async validateNoteFields(req, res, next) {
    const { title, body } = req.body;
    const errorFormatter = ({ msg }) => msg;
    const errorMessages = validationResult(req).formatWith(errorFormatter);

    if (!errorMessages.isEmpty()) {
      return res.status(400).json({ errors: errorMessages.mapped() });
    }

    req.note = { title, body };
    next();
  }

  /**
   * @method validateSingleNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {callback} next - Callback method
   * @returns {object} - response object
   */
  static async validateSingleNote(req, res, next) {
    const errorFormatter = ({ msg }) => msg;
    const errorMessages = validationResult(req).formatWith(errorFormatter);

    if (!errorMessages.isEmpty()) {
      return res.status(400).json({ errors: errorMessages.mapped() });
    }

    try {
      const note = await Note.findOne({
        where: {
          id: req.params.id
        },
        raw: true
      });
      if (!note) {
        res
          .status(404)
          .json({
            message: 'Note not found',
            note
          });
      }
      req.note = note;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default ValidateNote;
