import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load biến môi trường từ .env
dotenv.config();

// Tạo kết nối MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306, 
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công!');
});

export default connection;
