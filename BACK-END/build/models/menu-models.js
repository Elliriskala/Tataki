import { promisePool } from "../database.js";
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
// fetch menu allergens 
const fetchMenuAllergens = async (menuId) => {
    try {
        const sql = 'SELECT allergen_description FROM allergens WHERE menu_id = ?';
        const [rows] = await promisePool.query(sql, [menuId]);
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
export { fetchMenuItemsByCategory, fetchMenuAllergens };
//# sourceMappingURL=menu-models.js.map