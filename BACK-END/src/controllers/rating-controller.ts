import { fetchFoodReviews, fetchFoodReviewById, fetchFoodReviewsByUserId, fetchFoodReviewsByMenuId, addFoodReview, modifyFoodReview, deleteFoodReview, fetchRestaurantReviews, fetchRestaurantReviewsByUserId, deleteRestaurantReview } from '../models/rating-models.ts';
import { Response } from 'express';
import { AuthenticatedRequest as Request } from '../utils/interfaces.ts';

/**
 * 
 * @returns all food reviews from the database
 * @throws Error
 * @returns {Promise<FoodReview[]>} - Array of food reviews
 */
const getFoodReviews = async (_req: Request, res: Response): Promise<void> => {
    try {
        const foodReviews = await fetchFoodReviews();
        res.json(foodReviews);
    } catch (e) {
        console.error('getFoodReviews error:', (e as Error).message);
        throw new Error('getFoodReviews error: ' + (e as Error).message);
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns food review with the given food_review_id
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const getFoodReviewById = async (req: Request, res: Response): Promise<void> => {
    const food_review_id = Number(req.params.food_review_id);
    try {
        const foodReview = await fetchFoodReviewById(food_review_id);
        res.json(foodReview);
    } catch (e) {
        console.error('getFoodReviewById error:', (e as Error).message);
        throw new Error('getFoodReviewById error: ' + (e as Error).message);
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns food reviews with the given user_id
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const getFoodReviewsByUserId = async (req: Request, res: Response): Promise<void> => {
    const user_id = Number(req.params.user_id);
    try {
        const foodReviews = await fetchFoodReviewsByUserId(user_id);
        res.json(foodReviews);
    } catch (e) {
        console.error('getFoodReviewsByUserId error:', (e as Error).message);
        throw new Error('getFoodReviewsByUserId error: ' + (e as Error).message);
    }
};


/**
 * 
 * @param req 
 * @param res 
 * @returns food reviews with the given menu_id
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const getFoodReviewsByMenuId = async (req: Request, res: Response): Promise<void> => {
    const menu_id = Number(req.params.menu_id);
    try {
        const foodReviews = await fetchFoodReviewsByMenuId(menu_id);
        res.json(foodReviews);
    } catch (e) {
        console.error('getFoodReviewsByMenuId error:', (e as Error).message);
        throw new Error('getFoodReviewsByMenuId error: ' + (e as Error).message);
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns food review_id of the newly created food review
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const createFoodReview = async (req: Request, res: Response): Promise<void> => {
    const newFoodReview = {
        user_id: req.body.user_id,
        menu_id: req.body.menu_id,
        star_rating: req.body.star_rating,
        review: req.body.review
    }
    try {
        const foodReviewId = await addFoodReview(newFoodReview);
        res.json(foodReviewId);
    } catch (e) {
        console.error('createFoodReview error:', (e as Error).message);
        throw new Error('createFoodReview error: ' + (e as Error).message);
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns food review_id of the modified food review
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const updateFoodReview = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.food_review_id);
    const modifiedFoodReview = {
        food_review_id: req.body.food_review_id,
        user_id: req.body.user_id,
        menu_id: req.body.menu_id,
        star_rating: req.body.star_rating,
        review: req.body.review 
    }
    try {
        const foodReviewId = await modifyFoodReview(id, modifiedFoodReview);
        res.json(foodReviewId);
    } catch (e) {
        console.error('updateFoodReview error:', (e as Error).message);
        throw new Error('updateFoodReview error: ' + (e as Error).message);
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns food review_id of the deleted food review
 * @throws Error
 * @returns {Promise<void>} - FoodReview object or null if not found
 */
const removeFoodReview = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.food_review_id);
    try {
        const foodReviewId = await deleteFoodReview(id);
        if (foodReviewId) {
            res.status(200).json({message: 'Food review deleted: ', id: { foodReviewId }});
        } else {
            res.status(500).json({message: 'Food review not deleted'});
        }
    } catch (e) {
        console.error('removeFoodReview error:', (e as Error).message);
        throw new Error('removeFoodReview error: ' + (e as Error).message);
    }
};


/**
 * 
 * @returns all restaurant reviews from the database
 * @throws Error
 * @returns {Promise<RestaurantReview[]>} - Array of restaurant reviews
 */
const getRestaurantReviews = async (_req: Request, res: Response): Promise<void> => {
    try {
        const restaurantReviews = await fetchRestaurantReviews();
        res.json(restaurantReviews);
    } catch (e) {
        console.error('getRestaurantReviews error:', (e as Error).message);
        throw new Error('getRestaurantReviews error: ' + (e as Error).message);
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
const getRestaurantReviewsByUserId = async (req: Request, res: Response): Promise<void> => {
    const user_id = Number(req.params.user_id);
    try {
        const restaurantReviews = await fetchRestaurantReviewsByUserId(user_id);
        res.json(restaurantReviews);
    } catch (e) {
        console.error('getRestaurantReviewsByUserId error:', (e as Error).message);
        throw new Error('getRestaurantReviewsByUserId error: ' + (e as Error).message);
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
const deleteReview = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.review_id);
    try {
        const reviewId = await deleteRestaurantReview(id);
        if (reviewId) {
            res.status(200).json({message: 'Restaurant review deleted: ', id: { reviewId }});
        } else {
            res.status(500).json({message: 'Restaurant review not deleted'});
        }
    } catch (e) {
        console.error('deleteReview error:', (e as Error).message);
        throw new Error('deleteReview error: ' + (e as Error).message);
    }
}

export { getFoodReviews, getFoodReviewById, getFoodReviewsByUserId, getFoodReviewsByMenuId, createFoodReview, updateFoodReview, removeFoodReview, getRestaurantReviews, getRestaurantReviewsByUserId, deleteReview };