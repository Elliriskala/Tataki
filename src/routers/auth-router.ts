import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.ts';
import authenticateToken from '../middlewares/authentication.ts';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;