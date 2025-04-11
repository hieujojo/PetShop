import { Db } from 'mongodb';

export const getAllFoodProducts = async (db: Db): Promise<any[]> => {
  try {
    const foodProducts = await db.collection('food_products').find().toArray();
    const serializedProducts = foodProducts.map(product => {
      const defaultImage = '/images/default-product.jpg';
      const defaultHoverImage = '/images/default-product-hover.jpg';
      console.log(`Product ${product.title}: image=${product.image || defaultImage}, hoverImage=${product.hoverImage || defaultHoverImage}`);
      return {
        ...product,
        _id: product._id.toString(),
        image: product.image || defaultImage,
        hoverImage: product.hoverImage || defaultHoverImage,
      };
    });
    console.log('Food products fetched successfully:', serializedProducts);
    return serializedProducts;
  } catch (error: any) {
    console.error('Error fetching food products:', error);
    throw error;
  }
};