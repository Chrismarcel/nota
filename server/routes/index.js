import express from 'express';
import ValidateUser from '../middlewares/ValidateUser';
import AuthenticateUser from '../middlewares/AuthenticateUser';
import ValidateNote from '../middlewares/ValidateNote';
import UserController from '../controllers/UserController';
import NoteController from '../controllers/NoteController';

const router = express.Router();

router.post('/users',
  ValidateUser.validateFields(false),
  ValidateUser.validateRegistrationDetails,
  UserController.registerUser);

router.post('/users/login',
  ValidateUser.validateFields(true),
  ValidateUser.validateLoginDetails,
  UserController.loginUser);

router.post('/notes',
  AuthenticateUser.verifyUser,
  ValidateNote.validateFields(),
  ValidateNote.validateNoteFields,
  NoteController.createNote);

router.get('/notes',
  AuthenticateUser.verifyUser,
  NoteController.getNotes);

router.get('/notes/:id',
  AuthenticateUser.verifyUser,
  ValidateNote.validateFields(true),
  ValidateNote.validateSingleNote,
  NoteController.getSingleNote);

export default router;
