import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './utils/database';
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import menuRoutes from './routes/menuRoutes';
import productRoutes from './routes/home/productRoutes';
import articleRoutes from './routes/home/articleRoutes';
import brandRoutes from './routes/home/brandRoutes';
import collectionRoutes from './routes/home/collectionRoutes';
import foodProductRoutes from './routes/home/foodProductRoutes';
import dotenv from 'dotenv';

interface CustomRequest extends Request {
  db: any; 
}

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(((req: CustomRequest, _res: Response, next: NextFunction) => {
  req.db = connection;
  next();
}) as express.RequestHandler);

app.use('/data', dataRoutes);
app.use('/auth', authRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api', productRoutes);
app.use('/api', articleRoutes);
app.use('/api', brandRoutes);
app.use('/api', collectionRoutes);
app.use('/api', foodProductRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});