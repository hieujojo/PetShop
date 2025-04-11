import { Request, Response } from 'express';
import { getAllProducts } from '../../models/home/productModel';

interface CustomRequest extends Request {
  db?: any; 
}

export const getProducts = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.db) {
      throw new Error('Database connection is not available');
    }
    const products = await getAllProducts(req.db);
    res.status(200).json(products);
  } catch (error: any) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Failed to fetch products: ' + error.message });
  }
};