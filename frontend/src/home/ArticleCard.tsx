import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    id: 1,
    image:
      "https://paddy.vn/cdn/shop/articles/Cham_soc_thu_c_ng_1_3290f1d3-d9d9-48e0-875b-ff1ee5422dc8_720x.jpg?v=1741064862",
    alt: "Tìm Hiểu Về Phối Giống Cho Mèo Chuyên Sâu",
    href: "/blogs/cham-soc-thu-cung/tim-hieu-ve-phoi-giong-cho-meo-chuyen-sau",
    title: "Tìm Hiểu Về Phối Giống Cho Mèo Chuyên Sâu",
    author: "John Doe",
    description:
      'Chuyên mục: Tìm hiểu về phối giống cho mèo Quy tắc phối giống mèo "Sen" cần lưu ý Chi phí phối...',
    linkText: "Đọc thêm",
  },
  {
    id: 2,
    image:
      "https://paddy.vn/cdn/shop/articles/Cham_soc_thu_c_ng_05480eb4-1cf5-486d-b224-44773fcb5c6e_720x.jpg?v=1741064065",
    alt: "Cách Chăm Sóc Mèo Con",
    href: "/blogs/cham-soc-thu-cung/cach-cham-soc-meo-con",
    title: "Cách Chăm Sóc Mèo Con",
    author: "Admin",
    description:
      "Hướng dẫn chi tiết cách chăm sóc mèo con từ khi mới sinh đến khi trưởng thành.",
    linkText: "Đọc thêm",
  },
  {
    id: 3,
    image:
      "https://paddy.vn/cdn/shop/articles/Cham_soc_thu_c_ng_4_03a3b2df-c8ce-4655-bdb3-41c7d0a4bfbd_720x.jpg?v=1740469114",
    alt: "Dinh Dưỡng Cho Chó",
    href: "/blogs/cham-soc-thu-cung/dinh-duong-cho-cho",
    title: "Dinh Dưỡng Cho Chó",
    author: "VetExpert",
    description:
      "Các loại thức ăn và chế độ dinh dưỡng phù hợp cho chó ở từng giai đoạn phát triển.",
    linkText: "Đọc thêm",
  },
];

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

      <div className="p-4 text-left border border-gray-300 ">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={article.href}>{article.title}</Link>
        </h3>
        <div className="mb-4 text-sm text-gray-600">{article.author}</div>
        <div className="mb-4 text-gray-700">{article.description}</div>
        <>
          <Link
            href={article.href}
            className="text-blue-500 hover:text-blue-700"
            tabIndex={0}
          >
            {article.linkText}
          </Link>
        </>
      </div>
    </div>
  );
};

const ArticleList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-12 mx-20 gap-5">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
