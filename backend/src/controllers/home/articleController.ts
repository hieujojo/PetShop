import { Request, Response } from 'express';
import { getAllArticles } from '../../models/home/articleModel';

interface CustomRequest extends Request {
  db: any;
}

export const getArticles = (req: CustomRequest, res: Response) => {
  getAllArticles(req.db, (error, results) => {
    if (error) {
      console.error('Controller error:', error);
      return res.status(500).json({ error: 'Failed to fetch articles: ' + error.message });
    }
    res.status(200).json(results);
  });
};