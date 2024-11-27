import express from 'express';
import { getMenuItems } from '../controllers/menu-controllers.js';
const menuRouter = express.Router();
menuRouter.get('/:category', getMenuItems);
export default menuRouter;
//# sourceMappingURL=menu-router.js.map