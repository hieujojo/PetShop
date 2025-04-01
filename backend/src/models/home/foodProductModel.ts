import { Connection } from 'mysql2';

export const getAllFoodProducts = (db: Connection, callback: (error: any, results?: any) => void) => {
  const query = 'SELECT * FROM food_products';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching food products:', error);
      return callback(error);
    }
    console.log('Food products fetched successfully:', results);
    callback(null, results);
  });
};