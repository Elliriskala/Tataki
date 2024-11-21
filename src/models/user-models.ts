import { promisePool } from "../database.ts";
import { User } from "../utils/interfaces";

/**
 * 
 * @returns all users from the database
 * @throws Error
 * @returns {Promise<User[]>} - Array of users
 */
const fetchUsers = async () => {
    try {
        const rows = await promisePool.query("SELECT * FROM Users");
        if (rows) {
            return rows;
        }
    } catch (e) {
        console.error('fetchUsers error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
};


/**
 *  
 * @param user_id
 * @returns user with the given user_id
 * @throws Error
 * @returns {Promise<User | null>} - User object or null if not found
 */
const fetchUserById = async (user_id: number): Promise<User | null> => {
    try {
        const sql = 'SELECT * FROM Users WHERE user_id = ?';
        const [rows]: any = await promisePool.query(sql, [user_id]);
        if (rows && rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('FetchUserById, User not found');
        }
    } catch (e) {
        console.error('fetchUserById error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
};

/**
 * 
 * @param newUser 
 * @returns user_id of the newly created user
 * @throws Error
 * @returns {Promise<number>} - user_id of the newly created user
 */
const registerUser = async (newUser: User): Promise<number> => {
    const sql = 'INSERT INTO Users (username, password_hash, email, phone_number, user_level_id) VALUES (?, ?, ?, ?, ?)';
    const params = [
        newUser.username,
        newUser.password_hash,
        newUser.email,
        newUser.phone_number,
        newUser.user_level_id
    ];
    try {
        const [result]: any = await promisePool.query(sql, params);
        if (result && result.affectedRows) {
            return result.insertId;
        } else {
            throw new Error('RegisterUser, User not created');
        }
    } catch (e) {
        if ((e as any).code === 'ER_DUP_ENTRY') {
            throw new Error('RegisterUser, Duplicate entry');
        } else {
            console.error('registerUser error:', (e as Error).message);
            throw new Error('Database error: ' + (e as Error).message);
        }
    }
};

/**
 * 
 * Modifies a user in the database
 * @param user_id 
 * @param modifiedUser 
 * @returns number of affected rows
 * @throws Error
 * @returns {Promise<number>} - number of affected rows
 */
const modifyUser = async (user_id: number, modifiedUser: User): Promise<number> => {
    const sql = 'UPDATE Users SET username = ?, password_hash = ?, email = ?, phone_number = ?, user_level_id = ? WHERE user_id = ?';
    const params = [
        modifiedUser.username,
        modifiedUser.password_hash,
        modifiedUser.email,
        modifiedUser.phone_number,
        modifiedUser.user_level_id,
        user_id
    ];
    try {
        const [result]: any = await promisePool.query(sql, params);
        if (result && result.affectedRows) {
            return result.affectedRows;
        } else {
            throw new Error('ModifyUser, User not found');
        }
    } catch (e) {
        console.error('modifyUser error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
};


/**
 * 
 * Deletes a user from the database
 * @param user_id 
 * @returns {Promise<{ success: boolean; error?: string }>} - Object with success and error properties
 */
const deleteUser = async (user_id: number): Promise<{ success: boolean; error?: string }> => {
    const sql = 'DELETE FROM Users WHERE user_id = ?';
  try {
    const [result]: any = await promisePool.query(sql, [user_id]);
    if (result.affectedRows > 0) {
      console.log('deleteUserById', `User with ID ${user_id} was deleted.`);
      return { success: true };
    } else {
      console.log('deleteUserById', `User with ID ${user_id} not found.`);
      return { success: false, error: 'User not found' };
    }
  } catch (e) {
    console.log('deleteUserById', + (e as Error).message);
    return { success: false, error: 'Database error: ' + (e as Error).message };
  }
};



export { fetchUsers, fetchUserById, registerUser, modifyUser, deleteUser};