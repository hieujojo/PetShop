import pool from '../config/db';

const getMenuItems = async (locale: string) => {
  const [rows] = await pool.execute(
    'SELECT * FROM menu_items WHERE locale = ?',
    [locale]
  );
  return rows;
};

export default { getMenuItems };