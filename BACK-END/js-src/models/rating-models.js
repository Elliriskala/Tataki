import {promisePool} from '../database.js';

/**
 *
 * @returns all restaurant reviews from the database
 * @throws Error
 * @returns {Promise<RestaurantReview[]>} - Array of restaurant reviews
 */
const fetchRestaurantReviews = async () => {
  try {
    const rows = await promisePool.query('SELECT * FROM restreview');
    if (rows) {
      return rows;
    }
  } catch (e) {
    console.error('fetchRestaurantReviews error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};


const fetchRestaurantReviewsByUserId = async (user_id) => {
  try {
    const sql = 'SELECT * FROM RestReview WHERE user_id = ?';
    const [rows] = await promisePool.query(sql, [user_id]);
    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('FetchRestaurantReviewById, RestaurantReview not found');
    }
  } catch (e) {
    console.error('fetchRestaurantReviewById error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};


const deleteRestaurantReview = async (rest_review_id) => {
  try {
    const sql = 'DELETE FROM restreview WHERE review_id = ?';
    const [result] = await promisePool.query(sql, [rest_review_id]);

    if (result.affectedRows > 0) {
      console.log('deleteRating', 'Deleted rating with ID', rest_review_id);
      return result.affectedRows;

    } else {
      console.log('deleteRating', `Rating with ID ${rest_review_id} not found`);
      throw new Error('Rating not found');

    }

  } catch (e) {
    console.log('deleteRating Error:' + e.message);
    throw new Error('Database error: ' + e.message);
  }
};


/**
 * Add a new restaurant review to the database
 * @param {Object} newReview - The new review to add
 * @param {number} newReview.user_id - The user id
 * @param {string} newReview.username - The username
 * @param {number} newReview.star_rating - The star rating
 * @param {string} newReview.review - The review
 * @returns {Promise<number>} - The new review ID
 * 
 * @throws Error
 * 
 */
const addRestaurantReview = async (newReview) => {
  const sql =
    'INSERT INTO RestaurantReview (username, star_rating, review) VALUES (?, ?, ?)';
  const params = [
    newReview.username,
    newReview.star_rating,
    newReview.review || null,
  ];
  try {
    const [result] = await promisePool.query(sql, params);
    if (result && result.affectedRows) {
      return result.insertId;
    } else {
        console.log('addRestaurantReview model', 'RestaurantReview not added');
        throw new Error('AddRestaurantReview, RestaurantReview not added');
    }
  } catch (e) {
    console.error('addRestaurantReview error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};


/**
 * Check if a rating exists
 * @param {number} user_id - The user ID
 * @returns {Promise<boolean>} - If the rating exists
 * @throws Error
 */
const checkRatingExists = async (user_id) => {
  try {
    const sql = 'SELECT * FROM RestaurantReview WHERE user_id = ?';
    const [rows] = await promisePool.query(sql, [user_id]);
    return rows.length > 0;
  } catch (e) {
    console.error('checkRatingExists error:', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

export {
  fetchRestaurantReviews,
  fetchRestaurantReviewsByUserId,
  deleteRestaurantReview,
  addRestaurantReview,
  checkRatingExists,
};
