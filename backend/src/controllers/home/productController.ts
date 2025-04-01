import { Request, Response } from 'express';
import { getAllProducts } from '../../models/home/productModel';

interface CustomRequest extends Request {
  db?: any; 
}

export const getProducts = (req: CustomRequest, res: Response) => {
  getAllProducts(req.db, (error, results) => {
    if (error) {
      console.error('Controller error:', error);
      return res.status(500).json({ error: 'Failed to fetch products: ' + error.message });
    }
    res.status(200).json(results);
  });
};