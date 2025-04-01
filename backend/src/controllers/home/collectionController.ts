import { Request, Response } from 'express';
import { getAllCollections } from '../../models/home/collectionModel';

interface CustomRequest extends Request {
  db: any; 
}

export const getCollections = (req: CustomRequest, res: Response) => {
  getAllCollections(req.db, (error, results) => {
    if (error) {
      console.error('Controller error:', error);
      return res.status(500).json({ error: 'Failed to fetch collections: ' + error.message });
    }
    res.status(200).json(results);
  });
};