import { Request, Response } from 'express';
import { getAllArticles } from '../../models/home/articleModel';

interface CustomRequest extends Request {
  db: any;
}

export const getArticles = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.db) {
      throw new Error('Database connection is not available');
    }
    const articles = await getAllArticles(req.db);
    console.log('Controller received articles:', articles);
    if (!Array.isArray(articles)) {
      throw new Error('Articles data is not an array');
    }
    res.status(200).json(articles);
    console.log('Response sent for getArticles');
  } catch (error: any) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Failed to fetch articles: ' + error.message });
  }
};