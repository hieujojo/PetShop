import express, { Request, Response } from 'express';
import { getFoodProducts } from '../../controllers/home/foodProductController';

const router = express.Router();

router.get('/food-products', (req: Request, res: Response) => getFoodProducts(req as any, res));;

export default router;