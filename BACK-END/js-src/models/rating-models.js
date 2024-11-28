import { promisePool } from "../database.js";
/**
 *
 * @returns all food reviews from the database
 * @throws Error
 * @returns {Promise<FoodReview[]>} - Array of food reviews
 */
const fetchFoodReviews = async () => {
    try {
        const [rows] = await promisePool.query("SELECT * FROM foodreview");
        if (rows) {
            return rows;
        }
    }
    catch (e) {
        console.error('fetchFoodReviews error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param food_review_id
 * @returns food review with the given food_review_id
 * @throws Error
 * @returns {Promise<FoodReview | null>} - FoodReview object or null if not found
 */
const fetchFoodReviewById = async (food_review_id) => {
    try {
        const sql = 'SELECT * FROM foodreview WHERE review_id = ?';
        const [rows] = await promisePool.query(sql, [food_review_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchFoodReviewById, FoodReview not found');
        }
    }
    catch (e) {
        console.error('fetchFoodReviewById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param user_id
 * @returns food reviews with the given user_id
 * @throws Error
 * @returns {Promise<FoodReview | null>} - FoodReview object or null if not found
 */
const fetchFoodReviewsByUserId = async (user_id) => {
    try {
        const sql = 'SELECT * FROM foodreview WHERE user_id = ?';
        const [rows] = await promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchFoodReviewById, FoodReview not found');
        }
    }
    catch (e) {
        console.error('fetchFoodReviewById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param menu_id
 * @returns food review with the given menu_id
 * @throws Error
 * @returns {Promise<FoodReview | null>} - FoodReview object or null if not found
 */
const fetchFoodReviewsByMenuId = async (menu_id) => {
    try {
        const sql = 'SELECT * FROM foodreview WHERE menu_id = ?';
        const [rows] = await promisePool.query(sql, [menu_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchFoodReviewById, FoodReview not found');
        }
    }
    catch (e) {
        console.error('fetchFoodReviewById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param newFoodReview
 * @returns review_id of the newly created food review
 * @throws Error
 * @returns {Promise<number>} - review_id of the newly created food review
 */
const addFoodReview = async (newFoodReview) => {
    const sql = 'INSERT INTO foodreview (user_id, review, star_rating, menu_id) VALUES (?, ?, ?, ?, ?)';
    const params = [
        newFoodReview.user_id,
        newFoodReview.review,
        newFoodReview.star_rating,
        newFoodReview.menu_id
    ];
    try {
        const [result] = await promisePool.query(sql, params);
        if (result.affectedRows === 1) {
            return result.insertId;
        }
        else {
            throw new Error('AddFoodReview, FoodReview not created');
        }
    }
    catch (e) {
        console.error('postFoodReview error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param food_review_id
 * @param newFoodReview
 * @returns review_id of the modified food review
 * @throws Error
 * @returns {Promise<number>} - review_id of the modified food review
*/
const modifyFoodReview = async (food_review_id, newFoodReview) => {
    const sql = 'UPDATE foodreview SET review = ?, star_rating = ? WHERE review_id = ?';
    const params = [
        newFoodReview.review,
        newFoodReview.star_rating,
        food_review_id
    ];
    try {
        const [result] = await promisePool.query(sql, params);
        if (result.affectedRows === 1) {
            return result.insertId;
        }
        else {
            throw new Error('ModifyFoodReview, FoodReview not modified');
        }
    }
    catch (e) {
        console.error('modifyFoodReview error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @param food_review_id
 * @returns review_id of the deleted food review
 * @throws Error
 * @returns {Promise<number>} - review_id of the deleted food review
 */
const deleteFoodReview = async (food_review_id) => {
    const sql = 'DELETE FROM ratings WHERE rating_id = ?';
    try {
        const [result] = await promisePool.query(sql, [food_review_id]);
        if (result.affectedRows > 0) {
            console.log('deleteRating', 'Deleted rating with ID', food_review_id);
            return result.affectedRows;
        }
        else {
            console.log('deleteRating', `Rating with ID ${food_review_id} not found`);
            throw new Error('Rating not found');
        }
    }
    catch (e) {
        console.log('deleteRating Error:' + e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @returns all restaurant reviews from the database
 * @throws Error
 * @returns {Promise<RestaurantReview[]>} - Array of restaurant reviews
 */
const fetchRestaurantReviews = async () => {
    try {
        const rows = await promisePool.query("SELECT * FROM restreview");
        if (rows) {
            return rows;
        }
    }
    catch (e) {
        console.error('fetchRestaurantReviews error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
const fetchRestaurantReviewsByUserId = async (user_id) => {
    try {
        const sql = 'SELECT * FROM restreview WHERE user_id = ?';
        const [rows] = await promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchRestaurantReviewById, RestaurantReview not found');
        }
    }
    catch (e) {
        console.error('fetchRestaurantReviewById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
const deleteRestaurantReview = async (rest_review_id) => {
    const sql = 'DELETE FROM restreview WHERE review_id = ?';
    try {
        const [result] = await promisePool.query(sql, [rest_review_id]);
        if (result.affectedRows > 0) {
            console.log('deleteRating', 'Deleted rating with ID', rest_review_id);
            return result.affectedRows;
        }
        else {
            console.log('deleteRating', `Rating with ID ${rest_review_id} not found`);
            throw new Error('Rating not found');
        }
    }
    catch (e) {
        console.log('deleteRating Error:' + e.message);
        throw new Error('Database error: ' + e.message);
    }
};
export { fetchFoodReviews, fetchFoodReviewById, fetchFoodReviewsByUserId, fetchFoodReviewsByMenuId, addFoodReview, modifyFoodReview, deleteFoodReview, fetchRestaurantReviews, fetchRestaurantReviewsByUserId, deleteRestaurantReview };
