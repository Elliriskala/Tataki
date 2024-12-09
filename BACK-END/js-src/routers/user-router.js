import { getUsers, getUserById, modifyUserById, deleteUserById} from '../controllers/user-controller.js';
import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get(
    /**
     * @api {get} /user Get the authenticated user
     * @apiName GetUser
     * @apiGroup token
     * @apiDescription Retrieve the user details of the authenticated user.
     * @apiPermission token
     * 
     * @apiSuccess {Object} user User object
     * @apiSuccess {String} user.username The username of the user.
     * @apiSuccess {String} user.email The email address of the user.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "user": {
     *     "username": "username",
     *     "email": "email@example.com"
     *   }
     * }
     * 
     * @apiUse UnauthorizedError
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error occurred.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "error": {
     *     "message": "Internal server error",
     *     "status": 500
     *   }
     * }
     */
    '/user', getUserById);

//userRouter.delete('/user', authenticateToken, deleteUserById);

userRouter.put('/user',
    /**
     * @api {put} /user Modify the authenticated user
     * @apiName ModifyUser
     * @apiGroup token
     * @apiDescription Modify the details of the authenticated user.
     * @apiPermission token
     * 
     * @apiParam {String} username The new username of the user.
     * @apiParam {String} email The new email address of the user.
     * @apiParam {string} customer_address The new address of the user.
     * @apiParam {string} phone_number The new phone number of the user.
     * @apiParam {string} city The new city residence of the user.
     * 
     * @apiSuccess {String} message Success message indicating the user was modified.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "message": "User modified successfully"
     * }
     * 
     * @apiError (Error 400) BadRequest Invalid user details provided.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *   "error": {
     *     "message": "Invalid user details",
     *     "status": 400
     *   }
     * }
     * 
     * @apiUse UnauthorizedError
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error occurred.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "error": {
     *     "message": "Internal server error",
     *     "status": 500
     *   }
     * }
     * 
     * @apiError (Error 409) Conflict The provided email is already in use by another user.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 409 Conflict
     * {
     *   "error": {
     *     "message": "User with that email already exists",
     *     "status": 409
     *   }
     * }
     */
     authenticateToken, modifyUserById);

userRouter.delete('/user',
    /**
     * @api {delete} /user Delete the authenticated user
     * @apiName DeleteUser
     * @apiGroup token
     * @apiDescription Delete the account of the authenticated user.
     * @apiPermission token
     * 
     * @apiSuccess {String} message Success message indicating the user was deleted.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "message": "User deleted successfully"
     * }
     *  
     * @apiUse UnauthorizedError
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error occurred.
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "error": {
     *     "message": "Internal server error",
     *     "status": 500
     *   }
     * }
     * 
     */
     authenticateToken, deleteUserById);

export default userRouter;
