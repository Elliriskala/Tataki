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
 * Token must be included in the request header as 'Authorization: Bearer <token>'
 */


/**
 * @apiDefine UnauthorizedError
 * @apiError (Error 401) Unauthorized The user is not authorized to access the endpoint.
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": {
 *        "message": "Invalid credentials",
 *        "status": 401
 *      }
 *    }
 */
 


authRouter.route('/login').post(
    /**
     * @api {post} /login Login
     * @apiName Login
     * @apiGroup Authentication
     * @apiDescription Logs in a user and returns an access token.
     * @apiPermission none
     * 
     * @apiParam {String} email User's email address (must be a valid email).
     * @apiParam {String} password User's password (minimum length 8 characters).
     * 
     * @apiSuccess {String} token User's access token.
     * @apiSuccess {String} username User's username.
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "token": "Bearer <JWT>",
     *     "username": "johndoe"
     *   }
     * 
     * @apiError (Error 400) BadRequest Invalid input data.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "error": {
     *       "message": "Invalid credentials",
     *       "status": 400
     *     }
     *   }
     * 
     * @apiError (Error 404) NotFound User not found.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 404 Not Found
     *   {
     *     "error": {
     *       "message": "User not found",
     *       "status": 404
     *     }
     *   }
     */
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 30 }),
    validationErrorHandler,
    postLogin);

authRouter
.route('/register')
.post(
    /**
     * @api {post} /register Register
     * @apiName Register
     * @apiGroup Authentication
     * @apiDescription Registers a new user.
     * @apiPermission none
     * 
     * @apiParam {String} email User's email (must be a valid email address).
     * @apiParam {String} password User's password (8-30 characters).
     * @apiParam {String} username User's username (alphanumeric, 3-30 characters).
     * 
     * @apiSuccess {String} message A confirmation message.
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 201 Created
     *   {
     *     "message": "User created, you may now login"
     *   }
     * 
     * @apiError (Error 400) BadRequest Invalid input data.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "error": {
     *       "message": "Input validation failed",
     *       "status": 400
     *     }
     *   }
     * 
     * @apiError (Error 409) Conflict User already exists.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 409 Conflict
     *   {
     *     "error": {
     *       "message": "User already exists",
     *       "status": 409
     *     }
     *   }
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
     * @apiGroup Authentication
     * @apiDescription Validates the user's token to check if it is expired or invalid.
     * @apiPermission none
     * 
     * @apiParam {String} token User's token (must be included in the request header as 'Authorization: Bearer <token>').
     * 
     * @apiSuccess {Boolean} isTokenExpired Token expiration status (false means token is not expired).
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "isTokenExpired": false
     *   }
     * 
     * @apiError (Error 400) BadRequest Invalid request or missing token.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     *   {
     *     "error": {
     *       "message": "Input validation failed",
     *       "status": 400
     *     }
     *   }
     * 
     * @apiError (Error 401) Unauthorized Invalid or expired token.
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 401 Unauthorized
     *   {
     *     "error": {
     *       "message": "Invalid or expired token",
     *       "status": 401
     *     }
     *   }
     */
    isTokenExpired)

authRouter.route('/change-password').put(
    /**
   * @api {put} /change-password Change Password
   * @apiName ChangePassword
   * @apiGroup token
   * @apiDescription Change the user's password.
   * @apiPermission token
   * 
   * @apiParam {String} currentPassword User's current password
   * @apiParam {String} newPassword User's new password (8-30 characters).
   * 
   * @apiSuccess {String} message A confirmation message.
   * 
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "message": "Password changed successfully"
   *   }
   * 
   * @apiError (Error 400) BadRequest Invalid request or missing parameters.
   * @apiErrorExample Error-Response:
   *   HTTP/1.1 400 Bad Request
   *   {
   *     "error": {
   *       "message": "Input validation failed",
   *       "status": 400
   *     }
   *   }
   * 
   * @apiError (Error 401) Unauthorized Invalid or expired token.
   * @apiErrorExample Error-Response:
   *   HTTP/1.1 401 Unauthorized
   *   {
   *     "error": {
   *       "message": "Invalid or expired token",
   *       "status": 401
   *     }
   *   }
   * 
   * @apiError (Error 403) Forbidden The user does not have permission to change the password.
   * @apiErrorExample Error-Response:
   *   HTTP/1.1 403 Forbidden
   *   {
   *     "error": {
   *       "message": "Permission denied",
   *       "status": 403
   *     }
   *   }
   */
    body('currentPassword').trim().isLength({ min: 8, max: 30 }),
    body('newPassword').trim().isLength({ min: 8, max: 30 }),
    validationErrorHandler,
    authenticateToken,
    changePassword
);

authRouter.route('/me').get(authenticateToken, getMe);


export default authRouter;
