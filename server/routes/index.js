import express from 'express';
import ValidateUser from '../middlewares/ValidateUser';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/users',
  ValidateUser.validateFields(false),
  ValidateUser.validateUserDetails,
  UserController.registerUser);

export default router;
