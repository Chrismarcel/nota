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
    try {
      await Note.create({ ...req.note, userId: 2 });
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
}

export default NoteController;
