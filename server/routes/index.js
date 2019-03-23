import express from 'express';
import ValidateUser from '../middlewares/ValidateUser';
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
  ValidateNote.validateFields(),
  ValidateNote.validateNote,
  NoteController.createNote);

export default router;
