import { getUsers, getUserById, modifyUserById, deleteUserById} from '../controllers/user-controller.js';
import express from 'express';
import authenticateToken from '../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get(
    /**
     * @api {get} /user Get a user
     * @apiName GetUser
     * @apiGroup token
     * @apiDescription Get a user
     * @apiPermission token
     * 
     * @apiSuccess {Object[]} user User object
     * @apiSuccess {String} user.username User's username
     * @apiSuccess {String} user.email User's email
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "user": {
     * "username": "username",
     * "email": "email"
     * }
     * 
     * }
     * 
     * @apiUse UnauthorizedError
     * 
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     * "error": {
     * "message": "Internal server error",
     * "status": 500
     * }
     * 
     * }
     */
    '/user', getUserById);

//userRouter.delete('/user', authenticateToken, deleteUserById);

userRouter.put('/user',
    /**
     * @api {put} /user Modify a user
     * @apiName ModifyUser
     * @apiGroup token
     * @apiDescription Modify a user
     * @apiPermission token
     * 
     * @apiParam {String} username User's username
     * @apiParam {String} email User's email
     * @apiParam {String} password User's email
     * 
     * @apiSuccess {String} message Success message
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "message": "User modified successfully"
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "error": {
     * "message": "Invalid user",
     * "status": 400
     * }
     * 
     * }
     * 
     * @apiUse UnauthorizedError
     * 
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     * "error": {
     * "message": "Internal server error",
     * "status": 500
     * }
     * }
     * 
     * @apiError (Error 409) Conflict The user already exists
     * @apiErrorExample Error-Response:
     * HTTP/1.1 409 Conflict
     * {
     * "error": {
     * "message": "User with that email already exists",
     * "status": 409
     * }
     * }
     * 
     */
     authenticateToken, modifyUserById);

userRouter.delete('/user',
    /**
     * @api {delete} /user Delete a user
     * @apiName DeleteUser
     * @apiGroup token
     * @apiDescription Delete a user
     * @apiPermission token
     * 
     * @apiSuccess {String} message Success message
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "message": "User deleted successfully"
     * }
     *  
     * @apiUse UnauthorizedError
     * 
     * @apiUse token
     * 
     * @apiError (Error 500) InternalServerError Internal server error
     * @apiErrorExample Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     * "error": {
     * "message": "Internal server error",
     * "status": 500
     * }
     * }
     * 
     */
     authenticateToken, deleteUserById);

export default userRouter;
