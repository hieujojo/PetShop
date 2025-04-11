import express, { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';
import { getFoodProducts } from '../../controllers/home/foodProductController';

interface CustomRequest extends Request {
  db: any;
}

const getFoodProductsHandler: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    await getFoodProducts(customReq, res);
  } catch (error) {
    next(error);
  }
};

const router = express.Router();

router.get('/', getFoodProductsHandler); // Sửa '/food-products' thành '/'

export default router;