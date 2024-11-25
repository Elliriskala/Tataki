import { fetchMenuItems, fetchMenuAllergens } from "../models/menu-models";
import { Request, Response } from "express";
import { Allergen } from "../utils/interfaces";

/**
 * Fetch menu items based on the category
 * @param req
 * @param res
 * @returns menu items based on the category with allergens included
 * @throws Error
 * @returns {Promise<void>} - Menu items or null if not found
 */

const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;
  try {
    // Fetch menu items based on the category
    const menuItems = await fetchMenuItems(category);

    if (!menuItems) {
      res.status(404).json({ message: "Menu items not found" });
      return;
    }

    // Fetch allergens for each menu item
    for (const menuItem of menuItems) {
      const allergenDescription = await fetchMenuAllergens(menuItem.menu_id);

      const allergens: Allergen[] = allergenDescription
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
  } catch (e) {
    console.error("getMenuItems error:", (e as Error).message);
    throw new Error("getMenuItems error: " + (e as Error).message);
  }
};

export { getMenuItems };
