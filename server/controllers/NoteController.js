import models from '../database/models';

const { Note } = models;
/**
 * @class NoteController
 * @description Handles Note CRUD operations
 * @exports NoteController
 */
class NoteController {
  /**
   * @method createNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async createNote(req, res) {
    const userId = req.user.id;
    try {
      await Note.create({ ...req.note, userId });
      res
        .status(201)
        .json({
          message: 'Note created successfully',
          note: { ...req.note }
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  /**
   * @method getNotes
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async getNotes(req, res) {
    const { user } = req;
    try {
      const notes = await Note.findAll({
        where: {
          userId: user.id
        },
        raw: true
      });

      res
        .status(200)
        .json({
          message: 'Notes fetched successfully',
          notes
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default NoteController;
