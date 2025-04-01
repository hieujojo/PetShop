import express, { Request, Response } from 'express';
import { getBrands } from '../../controllers/home/brandController';

const router = express.Router();

router.get('/brands', (req: Request, res: Response) => getBrands(req as any, res));

export default router;