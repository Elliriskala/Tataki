import express from 'express';
import { getAllMenuItems, getMenuItemsByCategory } from '../controllers/menu-controllers.js';
const menuRouter = express.Router();
menuRouter.get('/', getAllMenuItems);
menuRouter.get('/:category', getMenuItemsByCategory);
export default menuRouter;
//# sourceMappingURL=menu-router.js.map