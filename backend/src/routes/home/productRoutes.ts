import express, { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../../controllers/home/productController';

interface CustomRequest extends Request {
  db?: any;
}

const getProductsHandler: RequestHandler = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    await getProducts(customReq, res);
  } catch (error) {
    next(error);
  }
};

const router = express.Router();

router.get('/', getProductsHandler);

export default router;