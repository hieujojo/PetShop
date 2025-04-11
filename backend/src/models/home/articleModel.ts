import { Db } from 'mongodb';

export const getAllArticles = async (db: Db): Promise<any[]> => {
  try {
    const start = Date.now();
    const articles = await db.collection('articles').find().toArray();
    const serializedArticles = articles.map(article => ({
      ...article,
      _id: article._id.toString(),
    }));
    const duration = Date.now() - start;
    console.log(`Articles fetched successfully: [${serializedArticles.length} items] in ${duration}ms`, serializedArticles);
    return serializedArticles;
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};