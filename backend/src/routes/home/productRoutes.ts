import express from 'express';
import { getProducts } from '../../controllers/home/productController';

const router = express.Router();

router.get('/products', getProducts); 

export default router;