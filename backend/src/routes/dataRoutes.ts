import express from 'express';
import { getData, addData } from '../controllers/dataController';

const router = express.Router();

router.get('/data', getData);
router.post('/data', addData);

export default router;