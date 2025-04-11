import { Db } from 'mongodb';

export const getAllProducts = async (db: Db): Promise<any[]> => {
  try {
    const start = Date.now();
    const products = await db.collection('products').find().toArray();
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
    const duration = Date.now() - start;
    console.log(`Products fetched successfully: [${serializedProducts.length} items] in ${duration}ms`, serializedProducts);
    return serializedProducts;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw error;
  }
};