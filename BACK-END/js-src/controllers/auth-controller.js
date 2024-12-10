import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {fetchUserById, selectUserByEmail, selectPasswordHash, updatePassword} from '../models/user-models.js';
import 'dotenv/config';
import {customError} from '../middlewares/error-handlers.js';

/**
 * JSDoc Documentation
 */

/**
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 * @returns {Promise<void>} - User data and token
 * @description - Login a user, validate email and password, generate JWT token, remove sensitive data, respond with user data and token
 * 
 * @throws {Error} - Error handling - Email and password are required, Username not found, Password invalid, Internal server error
 */

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return next(customError('Email and password are required.', 400));
    }

    // Fetch user by email
    const user = await selectUserByEmail(email);
    if (!user) {
      return next(customError('Username not found.', 401));
    }

    // Compare provided password with stored hash
    const pwMatch = await bcrypt.compare(password, user.password_hash);
    if (!pwMatch) {
      return next(customError('Password invalid.', 401));
    }

    // Generate JWT token with expiry time
    const token = jwt.sign({ user_id: user.user_id, user_level_id: user.user_level_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',  // Default expiry set to 1 hour
    });

    // Remove sensitive data (password_hash) before responding
    delete user.password_hash;

    // Respond with user data and token
    return res.status(200).json({ ...user, token });
  } catch (error) {
    console.error('postLogin error:', error);
    next(customError('Internal server error.', 500));  // Handle server errors with a 500 status
  }
};


/**
 * Decode a token
 * @param {String} token - The token to decode
 * @returns {Object} - The decoded token
 * @throws {Error} - Error handling - Invalid token
 */
const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.error('decodeToken', e.message);
    return null;
  }
};

/**
 * Get the user data for the token
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 * @returns {Promise<void>} - The user data
 * @throws {Error} - Error handling - No token provided, Invalid token, Error in getMe
 */
const getMe = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(customError('No token provided', 401));
  }
  const {user_id: id} = decodeToken(token);
  if (!id) {
    return next(customError('Invalid token', 401));
  }
  try {
    const user = await fetchUserById(id);
    if (user) {
      res.json({user_id: id, ...user});
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.error('getMe', +e.message);
    res.status(503).json({message: 'Error in getMe'});
  }
};

/**
 * Check if a token is expired
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 * @returns {Promise<void>} - The response, indicating if the token is expired
 * @throws {Error} - Error handling - Invalid token
 */
const isTokenExpired = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(customError('No token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // If token is expired, the verification will throw an error
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    const isExpired = decoded.exp < currentTime;

    if (isExpired) {
      return res.status(401).json({ expired: true });
    }

    // Token is valid
    return res.status(200).json({ expired: false });
  } catch (e) {
    console.error('Token verification error:', e.message);
    return next(customError('Invalid token', 401));
  }
};


/**
 * Change a user's password
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 * @returns {Promise<void>} - The response, indicating if the password was changed
 * @throws {Error} - Error handling for changePassword
 */
const changePassword = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(customError('No token provided', 401));
  }
  const {user_id: id} = decodeToken(token);
  if (!id) {
    return next(customError('Invalid token', 401));
  }
  const {currentPassword, newPassword} = req.body;
  if (!currentPassword || !newPassword) {
    return next(customError('Missing required fields', 400));
  }
  try {
    const oldPassword = await selectPasswordHash(id);
    const pwMatch =  bcrypt.compare(currentPassword, oldPassword);
    if (!pwMatch) {
      return next(customError('Password invalid.', 401));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const success = await updatePassword(id, hashedPassword);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(503);
    }
  }
  catch (e) {
    console.error('changePassword', +e.message);
    res.status(503).json({message: 'Error in changePassword'});
  }
};




export {postLogin, getMe, decodeToken, isTokenExpired, changePassword};
