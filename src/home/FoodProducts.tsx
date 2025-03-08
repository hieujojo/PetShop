import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Shuffle, Search } from "lucide-react";

const products = [
  {
    id: "1",
    title:
      "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    brand: "Royal Canin",
    originalPrice: "124.000đ",
    discountedPrice: "115.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor_940x.jpg?v=1724921575",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/preview_images/b982d5e091de473f9187c0d8e1860f3d.thumbnail.0000000000.jpg?v=1719993471",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "2",
    title: "Thức Ăn Hạt Cho Mèo Con Royal Canin Kitten 36",
    brand: "Royal Canin",
    originalPrice: "127.000đ",
    discountedPrice: "120.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-con-royal-canin-kitten-36_940x.jpg?v=1737351672",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/preview_images/2bf0e9d6843f477e9783d884f7e59c2a.thumbnail.0000000000.jpg?v=1727688061",
    href: "/products/thuc-an-cho-meo-2kg",
  },
  {
    id: "3",
    title: "Pate Mèo Con Royal Canin Kitten Instinctive 85g",
    brand: "Royal Canin",
    originalPrice: "28.000đ",
    discountedPrice: "20.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/royal-canin_88d0e834-94a8-4917-a074-34fda22ccc82_785x.jpg?v=1730286373",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/preview_images/9515599e2fb94b6a8c406568b66fca1e.thumbnail.0000000000.jpg?v=1728278041",
    href: "/products/thuc-an-cho-meo-4kg",
  },
  {
    id: "4",
    title: "Thức Ăn Hạt Cho Mèo Sỏi Thận Royal Canin Urinary S/O",
    brand: "Royal Canin",
    originalPrice: "169.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-soi-than-royal-canin-urinary-so_940x.jpg?v=1694499674",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/preview_images/b9e51b8cb35a4b8eb9b6a1704e27df47.thumbnail.0000000000.jpg?v=1719993593",
    href: "/products/thuc-an-cho-meo-10kg",
  },
  {
    id: "5",
    title: "Thức Ăn Hạt Cho Chó Con Poodle Royal Canin Poodle Puppy",
    brand: "Royal Canin",
    originalPrice: "184.000đ",
    discountedPrice: "169.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/thuc-an-cho-cho-con-royal-canin-poodle-puppy_785x.png?v=1724921659",
    hoverImage:
      "https://paddy.vn/cdn/shop/products/hat-royal-canin-poodle-puppy-cho-cho-con-poodle-paddy-2_1066x.jpg?v=1724921659",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "6",
    title: "Pate Mèo Trưởng Thành Royal Canin Instinctive 85g",
    brand: "Royal Canin",
    originalPrice: "34.000đ",
    discountedPrice: "25.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/royal-canin_6_785x.jpg?v=1730181155",
    hoverImage:
      "https://paddy.vn/cdn/shop/products/pate-royal-canin-instinctive-cho-meo-truong-thanh-paddy-6_460x.jpg?v=1724915205",
    href: "/products/thuc-an-cho-meo-2kg",
  },
  {
    id: "7",
    title: "Thức Ăn Hạt Cho Chó Con Giống Nhỏ Royal Canin Mini Puppy",
    brand: "Royal Canin",
    originalPrice: "235.000đ",
    discountedPrice: "209.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/Thuc-an-cho-cho-royal-canin-mini-puppy_785x.jpg?v=1724921700",
    hoverImage:
      "https://paddy.vn/cdn/shop/products/minipuppy800g_785x.jpg?v=1724921700",
    href: "/products/thuc-an-cho-meo-4kg",
  },
  {
    id: "8",
    title:
      "Thức Ăn Hạt Cho Mèo Lớn Anh Lông Ngắn Royal Canin British Shorthair",
    brand: "Royal Canin",
    originalPrice: "144.000đ",
    image:
      "https://paddy.vn/cdn/shop/files/RoyalCaninBritishShorthairMeoAnhLongNgan_940x.jpg?v=1694499644",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/2_af005783-383a-4e00-a403-68832cae3e34_940x.jpg?v=1693241134",
    href: "/products/thuc-an-cho-meo-10kg",
  },
];

const FoodProducts = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 px-20 text-center lg:text-left">
      {products.map((product) => (
        <div key={product.id} className="group overflow-hidden relative">
          <div className="absolute left-0 bg-[#ffd8d7] text-[#e10600] px-2 py-1 text-xs font-bold inline-block z-10">
            Giảm giá
          </div>
          <Link href={product.href}>
            <div className="relative w-[320px] h-[320px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-opacity-40 hidden group-hover:flex flex-col justify-center items-center gap-3 transition-all duration-300">
                <div className="absolute right-4 top-4 flex flex-col gap-3">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-transparent flex items-center transition-all duration-300">
                    <Eye size={20} />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-transparent">
                    <Shuffle size={20} />
                  </button>

                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-transparent">
                    <Search size={20} />
                  </button>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-2xl w-[300px] border-2 border-black hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 absolute bottom-4">
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </Link>
          <p className="text-[#234BBB] font-bold mt-3">{product.brand}</p>
          <h3 className="mt-2 hover:text-[#234BBB] hover:underline hover:underline-offset-4 hover:decoration-2 transition-all duration-300">
            {product.title}
          </h3>
          <div className="flex mt-2">
            {product.discountedPrice && !["4", "8"].includes(product.id) ? (
              <>
                <p className="line-through font-bold">
                  {product.originalPrice}
                </p>
                <p className="ml-2">|</p>
                <p className="ml-3 text-red-500 font-bold">
                  {product.discountedPrice}
                </p>
              </>
            ) : (
              <p className="font-bold">{product.originalPrice}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodProducts;
