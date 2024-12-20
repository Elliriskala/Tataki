import { fetchMenuItems, fetchMenuItemsById, fetchMenuItemsByCategory, fetchMenuAllergens, fetchSpecialMenus } from "../models/menu-models.js";
/**
 * Fetch all menu items
 * @param req
 * @param res
 * @returns all menu items with allergens included
 * @throws Error
 * @returns {Promise<void>} - Menu items or null if not found
 */
const getAllMenuItems = async (req, res) => {
    try {
        // Fetch all menu items
        const menuItems = await fetchMenuItems();
        if (!menuItems) {
            res.status(404).json({ message: "Menu items not found" });
            return;
        }
        // Fetch allergens for each menu item
        for (const menuItem of menuItems) {
            const allergenDescription = await fetchMenuAllergens(menuItem.menu_id);
            const allergens = allergenDescription
                ? allergenDescription.map((description) => ({
                    // id is hardcoded to 1 for now
                    allergen_id: 1,
                    menu_id: menuItem.menu_id,
                    allergen_description: description,
                }))
                : [];
            menuItem.allergens = allergens;
        }
        // the menu items with allergens
        res.json(menuItems);
    }
    catch (e) {
        console.error("getAllMenuItems error:", e.message);
        throw new Error("getAllMenuItems error: " + e.message);
    }
};

/**
 * fetch menu item baed on id
 * @param req 
 * @param res 
 * @returns menu item with the given id
 */

const getMenuItemById = async (req, res) => {
    const id = req.params.menu_id;
    try {
        // Fetch menu item by id
        const menuItems = await fetchMenuItemsById(id);
        if (!menuItems) {
            res.status(404).json({ message: "Menu items not found" });
            return;
        }
        // Fetch allergens for each menu item
        for (const menuItem of menuItems) {
            const allergenDescription = await fetchMenuAllergens(menuItem.menu_id);
            const allergens = allergenDescription
                ? allergenDescription.map((description) => ({
                    allergen_id: 1,
                    menu_id: menuItem.menu_id,
                    allergen_description: description,
                }))
                : [];
            menuItem.allergens = allergens;
        }
        // the menu items with allergens
        res.json(menuItems);
    }
    catch (e) {
        console.error("getMenuItemById error:", e.message);
        throw new Error("getMenuItemById error: " + e.message);
    }
};

/**
 * Fetch menu items based on the category
 * @param req
 * @param res
 * @returns menu items based on the category with allergens included
 * @throws Error
 * @returns {Promise<void>} - Menu items or null if not found
 */
const getMenuItemsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        // Fetch menu items based on the category
        const menuItems = await fetchMenuItemsByCategory(category);
        if (!menuItems) {
            res.status(404).json({ message: "Menu items not found" });
            return;
        }
        // Fetch allergens for each menu item
        for (const menuItem of menuItems) {
            const allergenDescription = await fetchMenuAllergens(menuItem.menu_id);
            const allergens = allergenDescription
                ? allergenDescription.map((description) => ({
                    allergen_id: 1,
                    menu_id: menuItem.menu_id,
                    allergen_description: description,
                }))
                : [];
            menuItem.allergens = allergens;
        }
        // the menu items with allergens
        res.json(menuItems);
    }
    catch (e) {
        console.error("getMenuItems error:", e.message);
        throw new Error("getMenuItems error: " + e.message);
    }
};
/**
 * Fetch special menu items
 * @param req
 * @param res
 * @returns special menu items with allergens included
 * @throws Error
 * @returns {Promise<void>} - Special menu items or null if not found
 */
const getSpecialMenuItems = async (req, res) => {
    try {
        // Fetch special menu items
        const menuItems = await fetchSpecialMenus();
        if (!menuItems) {
            res.status(404).json({ message: "Special menu items not found" });
            return;
        }
        // Fetch allergens for each menu item
        for (const menuItem of menuItems) {
            const allergenDescription = await fetchMenuAllergens(menuItem.menu_id);
            const allergens = allergenDescription
                ? allergenDescription.map((description) => ({
                    allergen_id: 1,
                    menu_id: menuItem.menu_id,
                    allergen_description: description,
                }))
                : [];
            menuItem.allergens = allergens;
        }
        // the menu items with allergens
        res.json(menuItems);
    }
    catch (e) {
        console.error("getSpecialMenuItems error:", e.message);
        throw new Error("getSpecialMenuItems error: " + e.message);
    }
};
export { getAllMenuItems, getMenuItemById, getMenuItemsByCategory, getSpecialMenuItems };
