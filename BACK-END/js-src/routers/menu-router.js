import express from 'express';
import { getAllMenuItems, getMenuItemsByCategory, getSpecialMenuItems } from '../controllers/menu-controllers.js';
const menuRouter = express.Router();
menuRouter.get('/', getAllMenuItems);
menuRouter.get('/:category', getMenuItemsByCategory);
menuRouter.get('/is_special', getSpecialMenuItems);
export default menuRouter;
