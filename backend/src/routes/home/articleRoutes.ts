import express, { Request, Response } from 'express';
import { getArticles } from '../../controllers/home/articleController';

const router = express.Router();

router.get('/articles', (req: Request, res: Response) => getArticles(req as any, res));

export default router;
