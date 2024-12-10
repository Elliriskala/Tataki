import express from 'express';
import { getAllMenuItems, getMenuItemById, getMenuItemsByCategory, getSpecialMenuItems } from '../controllers/menu-controllers.js';

const menuRouter = express.Router();

// menu routes
menuRouter.get('/',
    /**
   * @api {get} /menu Get all menu items
   * @apiName GetMenuItems
   * @apiGroup all
   * @apiDescription Get all menu items available in the restaurant.
   * @apiPermission none
   * 
   * @apiSuccess {Object[]} menu_items List of menu items
   * @apiSuccess {String} menu_items.menu_id ID of the menu item
   * @apiSuccess {String} menu_items.name Name of the menu item
   * @apiSuccess {String} menu_items.description Description of the menu item
   * @apiSuccess {String} menu_items.price Price of the menu item
   * @apiSuccess {String} menu_items.category Category of the menu item (e.g., "Lunch", "Dinner", "Special")
   * @apiSuccess {String} menu_items.is_special Special status of the menu item ("1" for special, "0" for regular)
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "menu_items": [
   *     {
   *       "menu_id": "1",
   *       "name": "Koyto Bliss",
   *       "description": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.",
   *       "price": "24.90",
   *       "category": "Lunch",
   *       "is_special": "1"
   *     },
   *     {
   *       "menu_id": "2",
   *       "name": "Sushi Delight",
   *       "description": "12 pieces of assorted sushi with miso soup.",
   *       "price": "29.90",
   *       "category": "Dinner",
   *       "is_special": "0"
   *     }
   *   ]
   * }
   * 
   * @apiError (Error 404) NotFound No menu items found
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No menu items found",
   *     "status": 404
   *   }
   * }
   * 
   * @apiError (Error 500) InternalServerError Internal server error while fetching menu items
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
   * 
   */
    getAllMenuItems);

menuRouter.get('/category/:category',
    /**
   * @api {get} /menu/category/:category Get menu items by category
   * @apiName GetMenuItemsByCategory
   * @apiGroup all
   * @apiDescription Get menu items filtered by a specified category.
   * @apiPermission none
   * 
   * @apiParam {String} category Category of the menu items (e.g., "Lunch", "Dinner", "Special")
   * 
   * @apiSuccess {Object[]} menu_items List of menu items in the specified category
   * @apiSuccess {String} menu_items.menu_id ID of the menu item
   * @apiSuccess {String} menu_items.name Name of the menu item
   * @apiSuccess {String} menu_items.description Description of the menu item
   * @apiSuccess {String} menu_items.price Price of the menu item
   * @apiSuccess {String} menu_items.category Category of the menu item
   * @apiSuccess {String} menu_items.is_special Special status of the menu item ("1" for special, "0" for regular)
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "menu_items": [
   *     {
   *       "menu_id": "1",
   *       "name": "Koyto Bliss",
   *       "description": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.",
   *       "price": "24.90",
   *       "category": "Lunch",
   *       "is_special": "1"
   *     },
   *     {
   *       "menu_id": "2",
   *       "name": "Sushi Delight",
   *       "description": "12 pieces of assorted sushi with miso soup.",
   *       "price": "29.90",
   *       "category": "Lunch",
   *       "is_special": "0"
   *     }
   *   ]
   * }
   * 
   * @apiError (Error 404) NotFound No menu items found for the specified category
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No menu items found for the specified category",
   *     "status": 404
   *   }
   * }
   * 
   * @apiError (Error 500) InternalServerError Internal server error while fetching menu items
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
   * 
   */
    getMenuItemsByCategory);

menuRouter.get('/:menu_id',
    /**
   * @api {get} /menu/:menu_id Get a menu item by ID
   * @apiName GetMenuItemById
   * @apiGroup all
   * @apiDescription Get a menu item by its unique ID
   * @apiPermission none
   * 
   * @apiParam {String} menu_id The unique ID of the menu item (string format, e.g., "1", "special-123").
   * 
   * @apiSuccess {Object} menu_item The menu item details
   * @apiSuccess {String} menu_item.menu_id ID of the menu item
   * @apiSuccess {String} menu_item.name Name of the menu item
   * @apiSuccess {String} menu_item.description Description of the menu item
   * @apiSuccess {String} menu_item.price Price of the menu item
   * @apiSuccess {String} menu_item.category Category of the menu item
   * @apiSuccess {String} menu_item.is_special Special status of the menu item ("1" for special, "0" for regular)
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "menu_item": {
   *     "menu_id": "1",
   *     "name": "Koyto Bliss",
   *     "description": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.",
   *     "price": "24.90",
   *     "category": "Lunch",
   *     "is_special": "1"
   *   }
   * }
   * 
   * @apiError (Error 404) NotFound No menu item found with the given ID
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No menu item found with the given ID",
   *     "status": 404
   *   }
   * }
   * 
   * @apiError (Error 500) InternalServerError Internal server error while fetching menu item
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
   * 
   */
    getMenuItemById);

menuRouter.get('/specials/:is_special',
    /**
   * @api {get} /menu/specials/:is_special Get special menu items
   * @apiName GetSpecialMenuItems
   * @apiGroup all
   * @apiDescription Get menu items that are marked as special or regular, based on the `is_special` status
   * @apiPermission none
   * 
   * @apiParam {String} is_special Special status of the menu item ("1" for special items, "0" for regular items)
   * 
   * @apiSuccess {Object[]} menu_items List of menu items that match the special status
   * @apiSuccess {String} menu_items.menu_id ID of the menu item
   * @apiSuccess {String} menu_items.name Name of the menu item
   * @apiSuccess {String} menu_items.description Description of the menu item
   * @apiSuccess {String} menu_items.price Price of the menu item
   * @apiSuccess {String} menu_items.category Category of the menu item
   * @apiSuccess {String} menu_items.is_special Special status of the menu item ("1" for special, "0" for regular)
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "menu_items": [
   *     {
   *       "menu_id": "1",
   *       "name": "Koyto Bliss",
   *       "description": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad.",
   *       "price": "24.90",
   *       "category": "Lunch",
   *       "is_special": "1"
   *     }
   *   ]
   * }
   * 
   * @apiError (Error 404) NotFound No menu items found with the specified special status
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *   "error": {
   *     "message": "No menu items found with the specified special status",
   *     "status": 404
   *   }
   * }
   * 
   * @apiError (Error 500) InternalServerError Internal server error while fetching menu items
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": {
   *     "message": "Internal server error",
   *     "status": 500
   *   }
   * }
   * 
   */
    getSpecialMenuItems);

export default menuRouter;
