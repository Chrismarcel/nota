import express from 'express';
import ValidateUser from '../middlewares/ValidateUser';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/users',
  ValidateUser.validateFields(false),
  ValidateUser.validateRegistrationDetails,
  UserController.registerUser);

router.post('/users/login',
  ValidateUser.validateFields(true),
  ValidateUser.validateLoginDetails,
  UserController.loginUser);

export default router;
