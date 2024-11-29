import { getUsers, getUserById, modifyUserById, deleteUserById } from '../controllers/user-controller.js';
import express from 'express';
import authenticateToken from '../middlewares/authentication.js';
const userRouter = express.Router();
userRouter.get('/', getUsers);
userRouter.get('/:user_id', getUserById);
userRouter.delete('/:user_id', authenticateToken, deleteUserById);
userRouter.put('/:user_id', authenticateToken, modifyUserById);
export default userRouter;
