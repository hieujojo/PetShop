import { Request, Response } from 'express';
import menuModel from '../models/menuModel';

const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { locale } = req.query as { locale: string };
    const menuItems = await menuModel.getMenuItems(locale);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

export default { getMenuItems };