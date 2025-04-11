import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Shuffle, Search } from "lucide-react";

interface FoodProduct {
  id: string;
  title: string;
  brand: string;
  original_price: string; // Đổi tên để khớp với dữ liệu
  discounted_price?: string; // Đổi tên để khớp với dữ liệu
  image: string;
  hover_image: string; // Đổi tên để khớp với dữ liệu
  href: string;
}

const FoodProducts = () => {
  const [products, setProducts] = useState<FoodProduct[]>([]);

  useEffect(() => {
    const fetchFoodProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food-products');
        if (!response.ok) {
          throw new Error('Failed to fetch food products');
        }
        const data: FoodProduct[] = await response.json();
        console.log('Food products data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching food products:', error);
      }
    };

    fetchFoodProducts();
  }, []);

  const minColumns = 4;
  const placeholders = Array.from(
    { length: Math.max(0, minColumns - products.length) },
    (_, index) => ({
      id: `placeholder-${index}`,
      title: "Sản phẩm sắp ra mắt",
      brand: "Đang cập nhật",
      original_price: "N/A", // Đổi tên để khớp với interface
      discounted_price: undefined, // Đổi tên để khớp với interface
      image: "/images/default-product.jpg",
      hover_image: "/images/default-product-hover.jpg", // Đổi tên để khớp với interface
      href: "#",
    })
  );

  const displayProducts = [...products, ...placeholders];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 px-20 text-center lg:text-left">
      {displayProducts.map((product) => {
        const hasDiscount = product.discounted_price && !["4", "8"].includes(product.id) && !product.id.startsWith("placeholder");

        return (
          <div key={product.id} className="group overflow-hidden relative">
            <div className="absolute left-0 bg-[#ffd8d7] text-[#e10600] px-2 py-1 text-xs font-bold inline-block z-10">
              {product.id.startsWith("placeholder") ? "Sắp có" : "Giảm giá"}
            </div>
            <Link href={product.href}>
              <div className="relative w-[320px] h-[320px] overflow-hidden">
                <Image
                  src={product.image || "/images/default-product.jpg"}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-500 group-hover:opacity-0 z-10"
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-product.jpg";
                    console.log(`Error loading image for ${product.title}: ${product.image}`);
                  }}
                />
                <Image
                  src={product.hover_image || "/images/default-product-hover.jpg"}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 z-20"
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-product-hover.jpg";
                    console.log(`Error loading hoverImage for ${product.title}: ${product.hover_image}`);
                  }}
                />
                <div className="absolute inset-0 bg-opacity-40 hidden group-hover:flex flex-col justify-center items-center gap-3 transition-all duration-300 z-30">
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
              <p className={`font-bold ${hasDiscount ? "line-through text-black" : ""}`}>
                {product.original_price}
                
              </p>
              {hasDiscount && (
                <>
                  <p className="ml-2 text-gray-500 font-bold"> | </p>
                  <p className="ml-2 text-red-500 font-bold">{product.discounted_price}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FoodProducts;