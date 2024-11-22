var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promisePool } from "../database.ts";
/**
 *
 * @returns all users from the database
 * @throws Error
 * @returns {Promise<User[]>} - Array of users
 */
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield promisePool.query("SELECT * FROM Users");
        if (rows) {
            return rows;
        }
    }
    catch (e) {
        console.error('fetchUsers error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param user_id
 * @returns user with the given user_id
 * @throws Error
 * @returns {Promise<User | null>} - User object or null if not found
 */
const fetchUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = 'SELECT * FROM Users WHERE user_id = ?';
        const [rows] = yield promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('FetchUserById, User not found');
        }
    }
    catch (e) {
        console.error('fetchUserById error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * @param newUser
 * @returns user_id of the newly created user
 * @throws Error
 * @returns {Promise<number>} - user_id of the newly created user
 */
const registerUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO Users (username, password_hash, email, phone_number, user_level_id) VALUES (?, ?, ?, ?, ?)';
    const params = [
        newUser.username,
        newUser.password_hash,
        newUser.email,
        newUser.user_level_id
    ];
    try {
        const [result] = yield promisePool.query(sql, params);
        if (result && result.affectedRows) {
            return result.insertId;
        }
        else {
            throw new Error('RegisterUser, User not created');
        }
    }
    catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            throw new Error('RegisterUser, Duplicate entry');
        }
        else {
            console.error('registerUser error:', e.message);
            throw new Error('Database error: ' + e.message);
        }
    }
});
/**
 *
 * Modifies a user in the database
 * @param user_id
 * @param modifiedUser
 * @returns number of affected rows
 * @throws Error
 * @returns {Promise<number>} - number of affected rows
 */
const modifyUser = (user_id, modifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'UPDATE Users SET username = ?, password_hash = ?, email = ?, phone_number = ?, user_level_id = ? WHERE user_id = ?';
    const params = [
        modifiedUser.username,
        modifiedUser.password_hash,
        modifiedUser.email,
        modifiedUser.user_level_id,
        user_id
    ];
    try {
        const [result] = yield promisePool.query(sql, params);
        if (result && result.affectedRows) {
            return result.affectedRows;
        }
        else {
            throw new Error('ModifyUser, User not found');
        }
    }
    catch (e) {
        console.error('modifyUser error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
/**
 *
 * Deletes a user from the database
 * @param user_id
 * @returns {Promise<{ success: boolean; error?: string }>} - Object with success and error properties
 */
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM Users WHERE user_id = ?';
    try {
        const [result] = yield promisePool.query(sql, [user_id]);
        if (result.affectedRows > 0) {
            console.log('deleteUserById', `User with ID ${user_id} was deleted.`);
            return { success: true };
        }
        else {
            console.log('deleteUserById', `User with ID ${user_id} not found.`);
            return { success: false, error: 'User not found' };
        }
    }
    catch (e) {
        console.log('deleteUserById', +e.message);
        return { success: false, error: 'Database error: ' + e.message };
    }
});
const selectUsernameAndPassword = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM Users WHERE username = ? AND password_hash = ?';
    try {
        const [rows] = yield promisePool.query(sql, [username, password]);
        if (rows && rows.length > 0) {
            return rows[0];
        }
        else {
            throw new Error('SelectUsernameAndPassword, User not found');
        }
    }
    catch (e) {
        console.error('selectUsernameAndPassword error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
const checkUsernameOrEmailExists = (username, email, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT user_id FROM Users WHERE (username = ? OR email = ?) AND user_id != ?';
    try {
        const [rows] = yield promisePool.query(sql, [username, email, user_id]);
        return rows.length > 0;
    }
    catch (e) {
        console.error('checkUsernameOrEmailExists error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
});
export { fetchUsers, fetchUserById, registerUser, modifyUser, deleteUser, selectUsernameAndPassword, checkUsernameOrEmailExists };
//# sourceMappingURL=user-models.js.map