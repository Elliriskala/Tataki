import { customError } from '../middlewares/error-handlers.js';
import { fetchRestaurantReviews, fetchRestaurantReviewsByUserId, deleteRestaurantReview, addRestaurantReview, checkRatingExists } from '../models/rating-models.js';







/**
 *
 * @returns all restaurant reviews from the database
 * @throws Error
 * @returns {Promise<RestaurantReview[]>} - Array of restaurant reviews
 */
const getRestaurantReviews = async (_req, res) => {
    try {
        const restaurantReviews = await fetchRestaurantReviews();
        res.json(restaurantReviews);
    }
    catch (e) {
        console.error('getRestaurantReviews error:', e.message);
        throw new Error('getRestaurantReviews error: ' + e.message);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns restaurant reviews with the given user_id
 * @throws Error
 * @returns {Promise<void>} - RestaurantReview object or null if not found
 */
const getRestaurantReviewsByUserId = async (req, res) => {
    const user_id = Number(req.params.user_id);
    try {
        const restaurantReviews = await fetchRestaurantReviewsByUserId(user_id);
        res.json(restaurantReviews);
    }
    catch (e) {
        console.error('getRestaurantReviewsByUserId error:', e.message);
        throw new Error('getRestaurantReviewsByUserId error: ' + e.message);
    }
};
/**
 *
 * @param req
 * @param res
 * @returns restaurant review_id of the deleted restaurant review
 * @throws Error
 * @returns {Promise<void>} - RestaurantReview object or null if not found
 */
const deleteReview = async (req, res) => {
    const id = Number(req.params.review_id);
    try {
        const reviewId = await deleteRestaurantReview(id);
        if (reviewId) {
            res.status(200).json({ message: 'Restaurant review deleted: ', id: { reviewId } });
        }
        else {
            res.status(500).json({ message: 'Restaurant review not deleted' });
        }
    }
    catch (e) {
        console.error('deleteReview error:', e.message);
        throw new Error('deleteReview error: ' + e.message);
    }
};

const postReview = async (req, res, next) => {
    const newReview = {
        user_id: req.body.user_id,
        star_rating: req.body.star_rating,
        review: req.body.review
    }

    if (!newReview.user_id || !newReview.star_rating || !newReview.review) {
        res.status(400).json({ message: 'Missing required information' });
    }

    try {
        const existingReview = await checkRatingExists(newReview.user_id);
        if (existingReview) {
            return res.status(409).json({ message: 'Review already exists' });
        }

        const reviewId = await addRestaurantReview(newReview);
        if (reviewId) {
            res.status(201).json({ message: 'Review added successfully', id: reviewId });
        } else {
            res.status(500).json({ message: 'Review not added' });
        }
    } catch (e) {
        console.error('postReview error:', e.message);
        return next(customError(e.message, 503));
    }
};

export { getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview, postReview };
