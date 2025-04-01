import { Request, Response } from 'express';
import { getAllFoodProducts } from '../../models/home/foodProductModel';

interface CustomRequest extends Request {
  db: any; // Connection từ mysql2
}

export const getFoodProducts = (req: CustomRequest, res: Response) => {
  getAllFoodProducts(req.db, (error, results) => {
    if (error) {
      console.error('Controller error:', error);
      return res.status(500).json({ error: 'Failed to fetch food products: ' + error.message });
    }
    res.status(200).json(results);
  });
};