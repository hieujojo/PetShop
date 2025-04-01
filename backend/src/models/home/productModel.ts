import { Connection } from 'mysql2';

export const getAllProducts = (db: Connection, callback: (error: any, results?: any) => void) => {
  const query = 'SELECT * FROM products';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return callback(error);
    }
    console.log('Products fetched successfully:', results);
    callback(null, results);
  });
};