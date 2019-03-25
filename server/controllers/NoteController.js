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

  /**
   * @method getSingleNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async getSingleNote(req, res) {
    const { note } = req;
    res
      .status(200)
      .json({
        message: 'Note fetched successfully',
        note
      });
  }

  /**
   * @method updateNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async updateNote(req, res) {
    const { id } = req.note;
    try {
      const updatedNote = await Note.update(req.note, {
        where: {
          id
        },
        returning: true,
        raw: true
      });
      res
        .status(200)
        .json({
          message: 'Note updated successfully',
          note: updatedNote[1][0]
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  /**
   * @method deleteNote
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - response object
   */
  static async deleteNote(req, res) {
    const { id } = req.note;
    try {
      await Note.destroy({
        where: {
          id
        }
      });
      res
        .status(200)
        .json({
          message: 'Note deleted successfully'
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default NoteController;
