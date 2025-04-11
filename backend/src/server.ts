import express, { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB, { getDb } from './utils/database'; 
import { Db } from 'mongodb';
import { EventEmitter } from 'events';
import path from 'path';

EventEmitter.defaultMaxListeners = 15;

interface CustomRequest extends Request {
  db: Db;
}

const app = express();
const port = 5000;

// Middleware để log thời gian xử lý request
const logRequestTime = (req: CustomRequest, res: Response, next: NextFunction): void => {
  console.log(`Starting logRequestTime for ${req.method} ${req.url}`);
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
  });
  next();
};

// Middleware để gán req.db
const setDb = (req: CustomRequest, res: Response, next: NextFunction): void => {
  console.log(`Setting db for ${req.method} ${req.url}`);
  req.db = getDb();
  console.log(`Db set for ${req.method} ${req.url}`);
  next();
};

// Middleware để log response trước khi gửi
const logResponse = (req: CustomRequest, res: Response, next: NextFunction): void => {
  console.log(`Processing response for ${req.method} ${req.url}`);
  const originalJson = res.json;
  res.json = function (data) {
    try {
      console.log(`Sending response for ${req.method} ${req.url}:`, data);
      return originalJson.call(this, data);
    } catch (error) {
      console.error(`Error sending response for ${req.method} ${req.url}:`, error);
      res.status(500).json({ error: 'Failed to send response' });
      return this;
    }
  };
  next();
};

// Middleware xử lý lỗi
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error: ' + err.message });
};

import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import menuRoutes from './routes/menuRoutes';
import productRoutes from './routes/home/productRoutes';
import articleRoutes from './routes/home/articleRoutes';
import brandRoutes from './routes/home/brandRoutes';
import collectionRoutes from './routes/home/collectionRoutes';
import foodProductRoutes from './routes/home/foodProductRoutes';

dotenv.config();

// Cấu hình CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(logRequestTime as RequestHandler);
app.use(logResponse as RequestHandler);

async function startServer() {
  try {
    await connectDB();

    app.use(setDb as RequestHandler);

    app.use('/data', dataRoutes);
    app.use('/auth', authRoutes);
    app.use('/chatbot', chatbotRoutes);
    app.use('/api/menu', menuRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/articles', articleRoutes);
    app.use('/api/brands', brandRoutes);
    app.use('/api/collections', collectionRoutes);
    app.use('/api/food-products', foodProductRoutes);
    app.use('/images', express.static(path.join(__dirname, '../public/images')));
    
    app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Welcome to PetShop API. Use /api/food-products to get food products.' });
    });

    app.use('/images', express.static(path.join(__dirname, '../public/images')));

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
  }
}

startServer();