import { customError } from "../middlewares/error-handlers.js";
import { fetchUsers, fetchUserById, modifyUser, deleteUser, registerUser, checkUsernameOrEmailExists } from "../models/user-models.js";
import { checkUserExists } from "../models/user-models.js";
import bcrypt from 'bcryptjs';
import { decodeToken } from "./auth-controller.js";

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
const getUserById = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let user_id;
    if (!token) {
        return next(customError('Missing token', 400));
    } else {
        const decoded = decodeToken(token);
        if (!decoded) {
            return next(customError('Invalid token', 401));
        }
        user_id = decoded.user_id;
        console.log('user_id in getUserById:', user_id);
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
        console.log('hash,' + hashedPassword);
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

        // Construct modified user data
        const moddedUser = {
            username: req.body.username || existingData.username,
            email: req.body.email || existingData.email,
            phone_number: req.body.phone_number || existingData.phone_number,
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
        const result = await deleteUser(user_id);
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
