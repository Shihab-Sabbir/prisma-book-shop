import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/api/v1/users', userController.createUser);
router.get('/api/v1/users', userController.getAllUsers);
router.get('/profile', auth(), userController.getUserProfile);
router.get('/api/v1/users/:id', userController.getUserById);
router.patch('/api/v1/users/:id', userController.updateUserById);
router.delete('/api/v1/users/:id', userController.deleteUser);

export default router;
