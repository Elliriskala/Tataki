import express from 'express';
import { getAllMenuItems, getMenuItemsByCategory  } from '../controllers/menu-controllers';

const menuRouter = express.Router();

menuRouter.get('/', getAllMenuItems);
menuRouter.get('/:category', getMenuItemsByCategory);

export default menuRouter;