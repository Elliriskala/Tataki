import express from "express";
import { getFoodReviews, getFoodReviewById, getFoodReviewsByUserId, getFoodReviewsByMenuId, createFoodReview, updateFoodReview, removeFoodReview, getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview } from "../controllers/rating-controller";
import authenticateToken from "../middlewares/authentication";

const ratingRouter = express.Router();

ratingRouter
    .get('/food/ratings', getFoodReviews)
    .post('/food/ratings', createFoodReview);

ratingRouter.get('/food/ratings/:food_review_id', authenticateToken, getFoodReviewById)

ratingRouter.get('/food/ratings/user/:user_id', authenticateToken, getFoodReviewsByUserId);

ratingRouter.get('/food/ratings/menu/:menu_id', getFoodReviewsByMenuId);

ratingRouter.put('/food/ratings/:food_review_id', authenticateToken, updateFoodReview);

ratingRouter.delete('/food/ratings/:food_review_id', authenticateToken, removeFoodReview);

ratingRouter.get('/restaurant/ratings', getRestaurantReviews);

ratingRouter.get('/restaurant/ratings/user/:user_id', authenticateToken, getRestaurantReviewsByUserId);

ratingRouter.delete('/restaurant/ratings/:review_id', authenticateToken, deleteReview);

export default ratingRouter;