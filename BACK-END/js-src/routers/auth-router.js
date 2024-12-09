import express from 'express';
import { changePassword, getMe } from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { postLogin, isTokenExpired } from '../controllers/auth-controller.js';
import { postUser } from '../controllers/user-controller.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handlers.js';


const authRouter = express.Router();

/**
 * @apiDefine all No authentication required
 */

/**
 * @apiDefine token Authentication required in the form of a token
 * Token in the request header in the form of 'Bearer token'
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError (Error 401) Unauthorized The user is not authorized to access the endpoint
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Forbidden
 *   {
 *    "error": {
 *      "message": "Invalid credentials",
 *      "status": 403
 * }
 * }
 */
 


authRouter.route('/login').post(
    /**
     * @api {post} /login Login
     * @apiName Login
     * @apiGroup all
     * @apiDescription Login a user
     * @apiPermission none
     * 
     * @apiParam {String} email User's email
     * @apiParam {String} password User's password
     * 
     * @apiSuccess {String} token User's token
     * @apiSuccess {String} username User's username
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *  {
     *   "token": "Bearer token",
     *  "username": "username"
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     * {
     * "error": {
     *  "message": "Invalid credentials",
     * "status": 400
     * }
     * }
     * 
     * @apiError (Error 404) NotFound The requested resource was not found
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 404 Not Found
     * {
     * "error": {
     * "message": "User not found",
     * "status": 404
     * }
     * }
     * 
     */
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    validationErrorHandler,
    postLogin);

authRouter
.route('/register')
.post(
    /**
     * @api {post} /register Register
     * @apiName Register
     * @apiGroup all
     * @apiDescription Register a user
     * @apiPermission none
     * 
     * @apiParam {String} email User's email
     * @apiParam {String} password User's password
     * @apiParam {String} username User's username
     * 
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *  {
     * "message": "User created, you may now login"
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     * {
     * "error": {
     *  "message": "Input validation failed",
     * "status": 400
     * }
     * }
     * 
     * @apiError (Error 409) Conflict The requested resource already exists
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 409 Conflict
     * {
     * "error": {
     * "message": "User already exists",
     * "status": 409
     * }
     * }
     * 
     */
    body('email').isEmail(),
    body('password').isLength({ min: 8, max : 30 }),
    body('username').trim().isAlphanumeric().isLength({min: 3, max: 30}),
    validationErrorHandler,
    postUser
);

authRouter
.route('/token-validation')
.post(
    /**
     * @api {post} /token-validation Token Validation
     * @apiName TokenValidation
     * @apiGroup all
     * @apiDescription Validate a token to check if it is expired
     * @apiPermission none
     * 
     * @apiParam {String} token User's token
     * 
     * @apiSuccess {Boolean} isTokenExpired Token status
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *  {
     * "isTokenExpired": false
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     * {
     * "error": {
     *  "message": "Input validation failed",
     * "status": 400
     * }
     * }
     * 
     * @apiError (Error 401) Unauthorized The user is not authorized to access the endpoint
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 401 Unauthorized
     * {
     * "error": {
     * "message": "Invalid token",
     * "status": 401
     * }
     * }
     * 
     */
    isTokenExpired)

authRouter.route('/change-password').put(
    /**
     * @api {put} /change-password Change Password
     * @apiName ChangePassword
     * @apiGroup token
     * @apiDescription Change a user's password
     * @apiPermission token
     * 
     * @apiParam {String} currentPassword User's current password
     * @apiParam {String} newPassword User's new password
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *  {
     * "message": "Password changed successfully"
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     * {
     * "error": {
     *  "message": "Input validation failed",
     * "status": 400
     * }
     * }
     * 
     * @apiError (Error 401) Unauthorized The user is not authorized to access the endpoint
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 401 Unauthorized
     * {
     * "error": {
     * "message": "Invalid token",
     * "status": 401
     * }
     * }
     * 
     */
    body('currentPassword').trim().isLength({ min: 8, max: 30 }),
    body('newPassword').trim().isLength({ min: 8, max: 30 }),
    validationErrorHandler,
    authenticateToken,
    changePassword
);

authRouter.route('/me').get(authenticateToken, getMe);


export default authRouter;
