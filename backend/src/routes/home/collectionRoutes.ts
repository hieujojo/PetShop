import express, { Request, Response } from 'express';
import { getCollections } from '../../controllers/home/collectionController';

const router = express.Router();

router.get('/collections', (req: Request, res: Response) => getCollections(req as any, res));;

export default router;