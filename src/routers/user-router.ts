import { getUsers, getUserById, postUser, modifyUserById, deleteUserById} from '../controllers/user-controller.ts';
import express from 'express';
import authenticateToken from '../middlewares/authentication';

const userRouter = express.Router();

userRouter.get('/', getUsers)
.post('/', postUser);

userRouter.get('/:user_id', authenticateToken, getUserById);

userRouter.delete('/:user_id', authenticateToken, deleteUserById)

userRouter.put('/:user_id', authenticateToken, modifyUserById);

export default userRouter;