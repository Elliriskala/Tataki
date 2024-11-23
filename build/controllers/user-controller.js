var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchUsers, fetchUserById, modifyUser, deleteUser, registerUser, checkUsernameOrEmailExists } from "../models/user-models";
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchUsers();
        res.json(users);
    }
    catch (e) {
        console.error('getUsers error:', e.message);
        throw new Error('getUsers error: ' + e.message);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.user_id);
    try {
        const user = yield fetchUserById(user_id);
        res.json(user);
    }
    catch (e) {
        console.error('getUserById error:', e.message);
        throw new Error('getUserById error: ' + e.message);
    }
});
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        username: req.body.username,
        password_hash: req.body.password_hash,
        email: req.body.email,
        user_level_id: req.body.user_level_id || 2
    };
    try {
        const user_id = yield registerUser(newUser);
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
});
const modifyUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const moddedUser = {
        username: req.body.username,
        email: req.body.email,
        password_hash: req.body.password_hash,
        user_level_id: req.body.user_level_id,
    };
    try {
        // Fetch the user to validate ownership
        const item = yield fetchUserById(id);
        if (!item) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the requesting user is allowed to modify this user
        if (!req.user || item.user_id !== req.user.user_id && req.user.user_level_id !== 1) {
            return res.status(403).json({ message: 'Only admins can modify other users.' });
        }
        // Check if the new username or email already exists for another user
        const isConflict = yield checkUsernameOrEmailExists(moddedUser.username, moddedUser.email, id);
        if (isConflict) {
            return res.status(409).json({ message: 'Username or email is already taken' });
        }
        // Update the user
        const result = yield modifyUser(id, moddedUser);
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
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.user_id);
    try {
        const result = yield deleteUser(user_id);
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
});
export { getUsers, getUserById, postUser, modifyUserById, deleteUserById };
//# sourceMappingURL=user-controller.js.map