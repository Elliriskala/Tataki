import express from 'express';
import { getMe } from '../controllers/auth-controller.js';
import authenticateToken from '../middlewares/authentication.js';
const authRouter = express.Router();
//authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);
export default authRouter;
//# sourceMappingURL=auth-router.js.map