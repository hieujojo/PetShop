import { Connection } from 'mysql2';

export const getAllArticles = (db: Connection, callback: (error: any, results?: any) => void) => {
  const query = 'SELECT * FROM articles';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching articles:', error);
      return callback(error);
    }
    console.log('Articles fetched successfully:', results);
    callback(null, results);
  });
};