import { Connection } from 'mysql2';

export const getAllCollections = (db: Connection, callback: (error: any, results?: any) => void) => {
  const query = 'SELECT * FROM collections';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching collections:', error);
      return callback(error);
    }
    console.log('Collections fetched successfully:', results);
    callback(null, results);
  });
};