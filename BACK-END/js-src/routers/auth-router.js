import express from 'express';
import { getMe } from '../controllers/auth-controller.js';
import authenticateToken from '../middlewares/authentication.js';
import { postLogin } from '../controllers/auth-controller.js';
import { postUser } from '../controllers/user-controller.js';
import { body, validationResult } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const authRouter = express.Router();


authRouter.route('/login').post(
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    validationErrorHandler,
    postLogin);

authRouter
.route('/register')
.post(
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('username').trim().isAlphanumeric().isLength({min: 3, max: 30}),
    validationErrorHandler,
    postUser
);

authRouter.route('/me').get(authenticateToken, getMe);


export default authRouter;
