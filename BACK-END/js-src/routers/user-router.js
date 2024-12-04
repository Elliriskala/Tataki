import { getUsers, getUserById, modifyUserById, deleteUserById } from '../controllers/user-controller.js';
import express from 'express';
import authenticateToken from '../middlewares/authentication.js';
const userRouter = express.Router();
userRouter.get('/', getUsers);
userRouter.get('/user', getUserById);
userRouter.delete('/user', authenticateToken, deleteUserById);
userRouter.put('/user', authenticateToken, modifyUserById);
export default userRouter;
