import { promisePool } from "../database";
import { Menu } from "../utils/interfaces";

/**
 * 
 * @returns all menu items from the database based on the category
 * @throws Error
 * @returns {Promise<Menu[]>} - Array of menu items
 */

const fetchMenuItemsByCategory = async (category: string): Promise<Menu[] | null> => {
    try {
        const sql = 'SELECT * FROM menus WHERE category = ?';
        const [rows]: any = await promisePool.query(sql, [category]);
        if (rows && rows.length > 0) {
            return rows;
        }
        return null;
    } catch (e) {
        console.error('fetchMenuItems error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
}

// fetch menu allergens 

const fetchMenuAllergens = async (menuId: number): Promise<string[] | null> => {
    try {
        const sql = 'SELECT allergen_description FROM allergens WHERE menu_id = ?';
        const [rows]: any = await promisePool.query(sql, [menuId]);
        if (rows && rows.length > 0) {
            return rows.map((row: any) => row.allergen_description);
        }
        return null;
    } catch (e) {
        console.error('fetchMenuAllergens error:', (e as Error).message);
        throw new Error('Database error: ' + (e as Error).message);
    }
}

export { fetchMenuItemsByCategory, fetchMenuAllergens };