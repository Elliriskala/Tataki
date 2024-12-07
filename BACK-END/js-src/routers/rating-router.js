import express from "express";
import { getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview, postReview} from "../controllers/rating-controller.js";
import authenticateToken from "../middlewares/authentication.js";
import { body } from "express-validator";
import { validationErrorHandler } from "../middlewares/error-handlers.js";
const ratingRouter = express.Router();

ratingRouter.get('/restaurant/', getRestaurantReviews);

ratingRouter.get('/restaurant/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);

ratingRouter.delete('/restaurant/:review_id', authenticateToken, deleteReview);

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
