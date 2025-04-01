import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT) || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công');
  connection.query('USE petshop', (err) => {
    if (err) {
      console.error('Lỗi chọn database:', err);
      return;
    }
    console.log('Database đã được chọn');
  });
});

export default connection;