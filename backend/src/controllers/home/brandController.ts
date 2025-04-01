import { Request, Response } from 'express';
import { getAllBrands } from '../../models/home/brandModel';

interface CustomRequest extends Request {
  db: any; // Connection từ mysql2
}

export const getBrands = (req: CustomRequest, res: Response) => {
  getAllBrands(req.db, (error, results) => {
    if (error) {
      console.error('Controller error:', error);
      return res.status(500).json({ error: 'Failed to fetch brands: ' + error.message });
    }
    res.status(200).json(results);
  });
};