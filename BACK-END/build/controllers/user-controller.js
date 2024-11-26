"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.modifyUserById = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const user_models_1 = require("../models/user-models");
const getUsers = async (_req, res) => {
    try {
        const users = await (0, user_models_1.fetchUsers)();
        res.json(users);
    }
    catch (e) {
        console.error('getUsers error:', e.message);
        throw new Error('getUsers error: ' + e.message);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const user_id = Number(req.params.user_id);
    try {
        const user = await (0, user_models_1.fetchUserById)(user_id);
        res.json(user);
    }
    catch (e) {
        console.error('getUserById error:', e.message);
        throw new Error('getUserById error: ' + e.message);
    }
};
exports.getUserById = getUserById;
const postUser = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password_hash: req.body.password_hash,
        email: req.body.email,
        user_level_id: req.body.user_level_id || 2
    };
    try {
        const user_id = await (0, user_models_1.registerUser)(newUser);
        if (user_id) {
            res.status(201).json({ message: 'User added: ', id: { user_id } });
        }
        else {
            res.status(500).json({ message: 'User not added' });
        }
    }
    catch (e) {
        console.error('postUser error:', e.message);
        throw new Error('postUser error: ' + e.message);
    }
};
exports.postUser = postUser;
const modifyUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const moddedUser = {
        username: req.body.username,
        email: req.body.email,
        password_hash: req.body.password_hash,
        user_level_id: req.body.user_level_id,
    };
    try {
        // Fetch the user to validate ownership
        const item = await (0, user_models_1.fetchUserById)(id);
        if (!item) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the requesting user is allowed to modify this user
        if (!req.user || item.user_id !== req.user.user_id && req.user.user_level_id !== 1) {
            return res.status(403).json({ message: 'Only admins can modify other users.' });
        }
        // Check if the new username or email already exists for another user
        const isConflict = await (0, user_models_1.checkUsernameOrEmailExists)(moddedUser.username, moddedUser.email, id);
        if (isConflict) {
            return res.status(409).json({ message: 'Username or email is already taken' });
        }
        // Update the user
        const result = await (0, user_models_1.modifyUser)(id, moddedUser);
        if (result > 0) {
            return res.status(200).json({ message: 'User modified', id });
        }
        else {
            return res.status(500).json({ message: 'Failed to modify user' });
        }
    }
    catch (e) {
        console.error('modifyUserById', e.message);
        return res.status(500).json({ message: 'Error in modifyUserById database query' });
    }
};
exports.modifyUserById = modifyUserById;
const deleteUserById = async (req, res) => {
    const user_id = Number(req.params.user_id);
    try {
        const result = await (0, user_models_1.deleteUser)(user_id);
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
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user-controller.js.map