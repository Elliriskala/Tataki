import express from "express";
import { getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview, postReview} from "../controllers/rating-controller.js";
import authenticateToken from "../middlewares/authentication.js";
const ratingRouter = express.Router();

ratingRouter.get('/restaurant/', getRestaurantReviews);
ratingRouter.get('/restaurant/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);
ratingRouter.delete('/restaurant/:review_id', authenticateToken, deleteReview);
ratingRouter.post('/restaurant/', postReview);    
export default ratingRouter;
