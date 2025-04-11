import { Request, Response } from 'express';
import { getAllFoodProducts } from '../../models/home/foodProductModel';

interface CustomRequest extends Request {
  db: any;
}

export const getFoodProducts = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.db) {
      throw new Error('Database connection is not available');
    }
    const foodProducts = await getAllFoodProducts(req.db);
    console.log(`Controller received ${foodProducts.length} food products:`, foodProducts);
    res.status(200).json(foodProducts);
  } catch (error: any) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Failed to fetch food products: ' + error.message });
  }
};