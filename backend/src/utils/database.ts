import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;
const client = new MongoClient(mongoURI);
let db: Db;

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Kết nối MongoDB Atlas thành công');
    db = client.db("petshop_mongo");
    return db;
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    process.exit(1);
  }
};

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  // Kiểm tra xem kết nối còn hoạt động không
  try {
    client.db("petshop_mongo").command({ ping: 1 });
  } catch (error) {
    console.error('Kết nối MongoDB bị gián đoạn, đang thử kết nối lại...');
    throw new Error('MongoDB connection lost. Please restart the server.');
  }
  return db;
}

export default connectDB;