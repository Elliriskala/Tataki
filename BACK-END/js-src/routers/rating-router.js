import express from "express";
import { getRestaurantReviews, deleteReview, postReview} from "../controllers/rating-controller.js";
import {authenticateToken} from "../middlewares/authentication.js";
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
   * @apiSuccess {String} reviews.star_rating Rating of the restaurant (1 to 5 stars)
   * @apiSuccess {String} reviews.review Review text of the restaurant
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "reviews": [
   *     {
   *       "star_rating": "5",
   *       "review": "Great food!"
   *     }
   *   ]
   * }
   *
   * @apiError (Error 500) InternalServerError Server error while fetching reviews
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
   *
   * @apiError (Error 404) NotFound No reviews found for this restaurant
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No reviews found",
   *     "status": 404
   *   }
   * }
   */
    '/restaurant/', getRestaurantReviews);

//ratingRouter.get('/restaurant/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);

ratingRouter.delete(
    /**
   * @api {delete} /restaurant/:review_id Delete a review
   * @apiName DeleteReview
   * @apiGroup token
   * @apiDescription Delete a review
   * @apiPermission token
   *
   * @apiParam {String} review_id ID of the review to delete
   *
   * @apiSuccess {String} message Success message indicating the review has been deleted
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "Review deleted successfully"
   * }
   *
   * @apiError (Error 404) NotFound Review not found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "Review not found",
   *     "status": 404
   *   }
   * }
   *
   * @apiError (Error 500) InternalServerError Server error during review deletion
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
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
   * @apiParam {String} star_rating Rating of the restaurant (1 to 5)
   * @apiParam {String} review Text review of the restaurant
   *
   * @apiSuccess {String} message Success message indicating the review has been posted
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "Review posted successfully"
   * }
   *
   * @apiError (Error 400) BadRequest Invalid review input
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   * {
   *   "error": {
   *     "message": "Invalid review",
   *     "status": 400
   *   }
   * }
   */
    body('star_rating').isNumeric(),
    body('review').isString() || body('review').isEmpty(),
    validationErrorHandler,
    postReview);    

export default ratingRouter;
