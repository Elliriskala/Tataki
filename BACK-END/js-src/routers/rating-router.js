import express from "express";
import { getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview, postReview} from "../controllers/rating-controller.js";
import authenticateToken from "../middlewares/authentication.js";
const ratingRouter = express.Router();

ratingRouter.get('/restaurant/ratings', getRestaurantReviews);
ratingRouter.get('/restaurant/ratings/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);
ratingRouter.delete('/restaurant/ratings/:review_id', authenticateToken, deleteReview);
ratingRouter.post('/restaurant/ratings', authenticateToken, postReview);    
export default ratingRouter;
