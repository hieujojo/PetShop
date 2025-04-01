import { Router } from 'express';
import menuController from '../controllers/menuController';

const router = Router();

router.get('/', menuController.getMenuItems);

export default router;