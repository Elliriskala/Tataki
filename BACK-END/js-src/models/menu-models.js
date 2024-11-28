import { promisePool } from "../../build/database.js";
// fetch all menus
/**
 *
 * @returns all menu items from the database
 * @throws Error
 * @returns {Promise<Menu[]>} - Array of menu items
 */
const fetchMenuItems = async () => {
    try {
        const sql = 'SELECT * FROM menus';
        const [rows] = await promisePool.query(sql);
        if (rows && rows.length > 0) {
            return rows;
        }
        return null;
    }
    catch (e) {
        console.error('fetchMenuItems error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
/**
 *
 * @returns all menu items from the database based on the category
 * @throws Error
 * @returns {Promise<Menu[]>} - Array of menu items
 */
const fetchMenuItemsByCategory = async (category) => {
    try {
        const sql = 'SELECT * FROM menus WHERE category = ?';
        const [rows] = await promisePool.query(sql, [category]);
        if (rows && rows.length > 0) {
            return rows;
        }
        return null;
    }
    catch (e) {
        console.error('fetchMenuItems error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
// fetch special menu items; 
const fetchSpecialMenus = async () => {
    try {
        const sql = 'SELECT * FROM menus WHERE is_special = true';
        const [rows] = await promisePool.query(sql);
        if (rows && rows.length > 0) {
            return rows;
        }
        return null;
    }
    catch (e) {
        console.error('fetchSpecialMenus error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
// fetch menu allergens 
const fetchMenuAllergens = async (menu_id) => {
    try {
        const sql = 'SELECT allergen_description FROM allergens WHERE menu_id = ?';
        const [rows] = await promisePool.query(sql, [menu_id]);
        if (rows && rows.length > 0) {
            return rows.map((row) => row.allergen_description);
        }
        return null;
    }
    catch (e) {
        console.error('fetchMenuAllergens error:', e.message);
        throw new Error('Database error: ' + e.message);
    }
};
export { fetchMenuItems, fetchMenuItemsByCategory, fetchMenuAllergens, fetchSpecialMenus };
