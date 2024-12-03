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
    body('star_rating').isNumeric(),
    body('review').isString() || body('review').isEmpty(),
    validationErrorHandler,
    postReview);    
export default ratingRouter;
