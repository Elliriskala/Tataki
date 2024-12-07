import express from "express";
import { getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview, postReview} from "../controllers/rating-controller.js";
import authenticateToken from "../middlewares/authentication.js";
import { body } from "express-validator";
import { validationErrorHandler } from "../middlewares/error-handlers.js";
const ratingRouter = express.Router();

ratingRouter.get(
    /**
     * @api {get} /restaurant Get all reviews
     * @apiName GetReviews
     * @apiGroup all
     * @apiDescription Get all reviews for a restaurant
     * @apiPermission none
     * 
     * @apiSuccess {Object[]} reviews List of reviews
     * @apiSuccess {String} reviews.star_rating Rating of the restaurant
     * @apiSuccess {String} reviews.review Review of the restaurant
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "reviews": [
     * {
     * "star_rating": "5",
     * "review": "Great food"
     * }
     * ]
     * }
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
     * @apiUse (Error 404) NotFound No reviews found
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     * "error": {
     * "message": "No reviews found",
     * "status": 404
     * }
     * }
     * 
     */
    '/restaurant/', getRestaurantReviews);

ratingRouter.get('/restaurant/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);

ratingRouter.delete(
    /**
     * @api {delete} /restaurant/:review_id Delete a review
     * @apiName DeleteReview
     * @apiGroup token
     * @apiDescription Delete a review
     * @apiPermission token
     * 
     * @apiParam {String} review_id Review's id
     * 
     * @apiSuccess {String} message Success message
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "message": "Review deleted successfully"
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
     * @apiError (Error 404) NotFound Review not found
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     * "error": {
     * "message": "Review not found",
     * "status": 404
     * }
     * }
     * 
     */
    '/restaurant/:review_id', authenticateToken, deleteReview);

ratingRouter.post('/restaurant/',
    /**
     * @api {post} /restaurant Post a review
     * @apiName PostReview
     * @apiGroup all
     * @apiDescription Post a review for a restaurant
     * @apiPermission none
     * 
     * @apiParam {String} star_rating Rating of the restaurant
     * @apiParam {String} review Review of the restaurant in text form
     * 
     * @apiSuccess {String} message Success message
     * 
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     * "message": "Review posted successfully"
     * }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 400 Bad Request
     * {
     * "error": {
     * "message": "Invalid review",
     * "status": 400
     * }
     * 
     * }
     */
    body('star_rating').isNumeric(),
    body('review').isString() || body('review').isEmpty(),
    validationErrorHandler,
    postReview);    

export default ratingRouter;
