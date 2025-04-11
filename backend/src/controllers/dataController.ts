// src/controllers/dataController.ts
import { Request, Response } from 'express';
import connection from '../utils/database';

export const getData = (req: Request, res: Response) => {
  connection.query('SELECT * FROM mytable', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
};

export const addData = (req: Request, res: Response) => {
  const { name, age } = req.body;
  connection.query('INSERT INTO mytable (name, age) VALUES (?, ?)', [name, age], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(201).send('Data added successfully');
  });
};