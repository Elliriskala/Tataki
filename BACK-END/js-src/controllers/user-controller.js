import { customError } from "../middlewares/error-handlers.js";
import { fetchUsers, fetchUserById, modifyUser, deleteUser, registerUser, checkUsernameOrEmailExists } from "../models/user-models.js";
import { checkUserExists } from "../models/user-models.js";
import bcrypt from 'bcryptjs';
import { decodeToken } from "./auth-controller.js";

/**
 * Get all users
 * @param req
 * @param res
 * @returns {Promise<void>} - Array of user objects
 * @throws Error - Database error
 */
const getUsers = async (_req, res) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    }
    catch (e) {
        console.error('getUsers error:', e.message);
        throw new Error('getUsers error: ' + e.message);
    }
};

/**
 * Get user by user_id
 * @param req
 * @param res
 * @param next
 * @returns user with the given user_id
 * @throws Error
 * @returns {Promise<void>} - User object or null if not found
 */
const getUserById = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Get token from header
    let user_id;
    if (!token) {
        return next(customError('Missing token', 400));
    } else {
        const decoded = decodeToken(token); // Decode token to get user_id
        if (!decoded) {
            return next(customError('Invalid token', 401));
        }
        user_id = decoded.user_id;
        }
    try {
        const user = await fetchUserById(user_id);
        res.json(user);
    }
    catch (e) {
        console.error('getUserById error:', e.message);
        throw new Error('getUserById error: ' + e.message);
    }
};

/**
 * Post a new user
 * @param req
 * @param res
 * @param next
 * @description - Create a new user with the provided data, hash the password and store it in the database with bcrypt
 * @returns user_id of the newly created user
 * @throws Error - Database error (500), Missing required information (400), Email or Username already exists (409)
 * @returns {Promise<void>} - User object or null if not found
 */
const postUser = async (req, res, next) => {
    const newUser = {
        username: req.body.username,
        password_hash: req.body.password,
        email: req.body.email
    };

    // Check if all required fields are provided
    if (!newUser.username || !newUser.password_hash || !newUser.email) {
        res.status(400).json({ message: 'Missing required information' });
        return;
    }

    try {
        // Check if user already exists by email or username
        const existingUser = await checkUserExists(newUser.email, newUser.username);

        if (existingUser) {
            // If user exists, return conflict status
            return res.status(409).json({ message: 'Email or Username already exists' });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password_hash, salt);
        newUser.password_hash = hashedPassword;

        // Register the new user
        const user_id = await registerUser(newUser);
        
        if (user_id) {
            res.status(201).json({ message: 'User added successfully', id: user_id });
        } else {
            res.status(500).json({ message: 'User not added' });
        }

    } catch (e) {
        console.error('postUser error:', e.message);
        return next(customError(e.message, 503));
    }
};

/**
 * Modify user by user_id
 * @param req
 * @param res
 * @param next
 * @returns user_id of the modified user
 * @throws Error - Database error or invalid token
 * @returns {Promise<void>} - User object or null if not found
 */
const modifyUserById = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(customError('No token provided', 401));
    }

    const { user_id: id } = decodeToken(token);
    if (!id) {
        return next(customError('Invalid token', 401));
    }

    try {
        // Fetch existing data to check if user exists
        const existingData = await fetchUserById(id);
        if (!existingData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct modified user data with existing data as default
        const moddedUser = {
            username: req.body.username || existingData.username,
            email: req.body.email || existingData.email,
            phone_number: req.body.phone_number || existingData.phone_number, customer_address: req.body.customer_address || existingData.customer_address, city: req.body.city || existingData.city
        };

        // Fetch the user again to validate ownership
        const item = await fetchUserById(id);
        if (!item) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check for username or email conflicts
        const isConflict = await checkUsernameOrEmailExists(moddedUser.username, moddedUser.email, id);
        if (isConflict) {
            return res.status(409).json({ message: 'Username or email is already taken' });
        }

        // Update the user
        const result = await modifyUser(id, moddedUser);
        if (result > 0) {
            return res.status(200).json({ message: 'User modified', id });
        } else {
            return res.status(500).json({ message: 'Failed to modify user' });
        }
    } catch (e) {
        console.error('Error in modifyUserById:', e.message);
        return res.status(500).json({ message: 'Error in modifyUserById database query' });
    }
};

/**
 * Delete user by user_id
 * @param req
 * @param res
 * @param next
 * @returns user_id of the deleted user
 * @throws Error - Database error or invalid token
 * @returns {Promise<void>} - User object or null if not found
 */
const deleteUserById = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(customError('No token provided', 401));
    }
    const { user_id } = decodeToken(token);
    if (!user_id) {
        return next(customError('Invalid token', 401));
    }
    try {
        const result = await deleteUser(user_id); // Delete user
        if (result) {
            res.json({ message: 'User deleted: ', id: user_id });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (e) {
        console.error('deleteUserById error:', e.message);
        throw new Error('deleteUserById error: ' + e.message);
    }
};
export { getUsers, getUserById, postUser, modifyUserById, deleteUserById };
