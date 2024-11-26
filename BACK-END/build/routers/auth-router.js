import express from 'express';
import { getMe, postLogin } from '../controllers/auth-controller';
import authenticateToken from '../middlewares/authentication';
const authRouter = express.Router();
authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);
export default authRouter;
//# sourceMappingURL=auth-router.js.map