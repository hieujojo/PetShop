import { Connection } from 'mysql2';

export const getAllBrands = (db: Connection, callback: (error: any, results?: any) => void) => {
  const query = 'SELECT * FROM brands';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching brands:', error);
      return callback(error);
    }
    console.log('Brands fetched successfully:', results);
    callback(null, results);
  });
};