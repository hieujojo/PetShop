import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  image: string;
  alt: string;
  href: string;
  title: string;
  author: string;
  description: string;
  linkText: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="bg-white">
      <div className="mb-0">
        <Link
          href={article.href}
          className="block relative"
          style={{ paddingTop: "55%" }}
        >
          <Image
            src={article.image}
            alt={article.alt}
            className="absolute top-0 left-0 w-full h-full"
            width={720}
            height={40}
          />
        </Link>
      </div>

      <div className="p-4 text-left border-x border-b h-56 border-gray-300">
  <h3 className="text-xl font-semibold mb-2">
    <Link href={article.href}>{article.title}</Link>
  </h3>
  <div className="mb-4 text-sm text-gray-600">{article.author}</div>
  <div className="mb-4 text-gray-700">{article.description}</div>
  <Link
    href={article.href}
    className="text-blue-500 hover:text-blue-700"
    tabIndex={0}
  >
    {article.linkText}
  </Link>
</div>
    </div>
  );
};

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]); 

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-12 mx-20 gap-5">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;