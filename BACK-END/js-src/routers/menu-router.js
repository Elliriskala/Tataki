import express from 'express';
import { getAllMenuItems, getMenuItemById, getMenuItemsByCategory, getSpecialMenuItems } from '../controllers/menu-controllers.js';

const menuRouter = express.Router();

// menu routes
menuRouter.get('/', getAllMenuItems);
menuRouter.get('/category/:category', getMenuItemsByCategory);
menuRouter.get('/:menu_id', getMenuItemById);
menuRouter.get('/specials/:is_special', getSpecialMenuItems);

export default menuRouter;
