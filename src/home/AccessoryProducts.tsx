import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Shuffle, Search } from "lucide-react";

const products = [
  {
    id: "1",
    title: "Khay Vệ Sinh Thành Cao Cho Mèo Richell <8kg 41x50x31",
    brand: "Richell",
    originalPrice: "400.000đ",
    quantity: "0",
    image:
      "https://paddy.vn/cdn/shop/files/1_d2b357e9-3a9b-4dd3-90c9-a728432acfd5_785x.png?v=1741147113",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/5_c42c9e8e-5caa-4b20-91bb-c7975a8abca9_785x.png?v=1741147113",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "2",
    title: "Nhà Vệ Sinh Cho Mèo Kèm Xẻng Richell <6kg 40x51x38",
    brand: "Richell",
    originalPrice: "550.000đ",
    quantity: "0",
    image:
      "https://paddy.vn/cdn/shop/files/Hinh_cover_sp_785x.png?v=1741163616",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/2_8a92cc58-251c-41fd-b968-3442b703e6ec_785x.jpg?v=1741163616",
    href: "/products/thuc-an-cho-meo-2kg",
  },
  {
    id: "3",
    title: "Hạt Cho Mèo Cats On Mix T 1.4kg",
    brand: "Cat's On",
    originalPrice: "220.000đ",
    quantity: "30",
    image:
      "https://paddy.vn/cdn/shop/files/4_0dae6796-b143-40a4-8dd9-501730455a29_785x.png?v=1740383628",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/3_22a5d233-3872-4fa3-a7e8-c6cf86968a13_785x.png?v=1740383628",
    href: "/products/thuc-an-cho-meo-4kg",
  },
  {
    id: "4",
    title: "Set Dụng Cụ Tắm Cho Chó Mèo Doggyman",
    brand: "DoggyMan",
    originalPrice: "220.000đ",
    quantity: "30",
    image:
      "https://paddy.vn/cdn/shop/files/Hinh_cover_sp_09558686-e05b-4bfa-b1c4-5c6829ad0cce_785x.jpg?v=1740035687",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/480503684_1287681876692356_2597880460299895573_n_1770x.jpg?v=1740035687",
    href: "/products/thuc-an-cho-meo-10kg",
  },
  {
    id: "5",
    title: "Súp Thưởng Sữa Dê Cho Mèo PetQ 15g",
    brand: "PetQ",
    originalPrice: "5.000đ",
    quantity: "30",
    image:
      "https://paddy.vn/cdn/shop/files/Hinh_cover_sp_15_785x.jpg?v=1739780159",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/6_27a37196-281d-4895-b37f-3c298d5dd717_785x.jpg?v=1739780159",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "6",
    title: "Gel Dinh Dưỡng Cho Mèo Gimcat 20g",
    brand: "GimCat (Đức)",
    originalPrice: "70.000đ",
    quantity: "30",
    image:
      "https://paddy.vn/cdn/shop/files/3_c2965dd2-697f-4ba2-9d7a-6872e063b43f_785x.jpg?v=1739179963",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/1_47c534db-366a-4548-9b22-88e7af4cd52c_785x.jpg?v=1739179963",
    href: "/products/thuc-an-cho-meo-2kg",
  },
  {
    id: "7",
    title: "Bộ Khay Vệ Sinh & Hứng Cát Cho Mèo - 40x30x17cm",
    brand: "China",
    originalPrice: "120.000đ",
    quantity: "0",
    image:
      "https://paddy.vn/cdn/shop/files/Hinhcoversp_9_785x.jpg?v=1739156699",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/457054078_1063937841765721_3853891279272934387_n-1724993784452_1570x.jpg?v=1739156700",
    href: "/products/thuc-an-cho-meo-4kg",
  },
  {
    id: "8",
    title: "Hạt Cho Mèo Mọi Lứa Tuổi ANF Fresh Meat 1.6kg",
    brand: "ANF",
    originalPrice: "550.000đ",
    discountedPrice: "450.000đ",
    quantity: "30",
    image:
      "https://paddy.vn/cdn/shop/files/hat-cho-meo-moi-lua-tuoi-anf-fresh-meat-1-6kg_7_785x.jpg?v=1738659315",
    hoverImage:
      "https://paddy.vn/cdn/shop/files/hat-cho-meo-moi-lua-tuoi-anf-fresh-meat-1-6kg_2_785x.jpg?v=1738659315",
    href: "/products/thuc-an-cho-meo-10kg",
  },
];

const AccessoryProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);
  
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 px-20 text-center lg:text-left">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group overflow-hidden relative rotate-on-hover ${
                index < 4 ? "lg:mb-10" : ""
              }`}
            >
              <div className="absolute left-0 top-2 bg-[#D2E7FF] text-[#0A6CDC] px-2 py-1 text-xs inline-block z-10">
                Mới
              </div>
              <div className="flex mt-2">
                {Number(product.quantity) === 0 ? (
                  <div className="absolute left-0 top-9 bg-[#F5F5F5] text-[#505050] px-2 py-1 text-xs font-bold inline-block z-10">
                    Đã bán hết
                  </div>
                ) : product.discountedPrice && ["1", "2", "7"].includes(product.id) ? (
                  <div className="absolute left-0 top-9 bg-[#ffd8d7] text-[#e10600] px-2 py-1 text-xs font-bold inline-block z-10">
                    Giảm giá
                  </div>
                ) : null}
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
                    <p className="line-through font-bold">{product.originalPrice}</p>
                    <p className="ml-2">|</p>
                    <p className="ml-3 text-red-500 font-bold">{product.discountedPrice}</p>
                  </>
                ) : (
                  <p className="font-bold">{product.originalPrice}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-3 h-3 rounded-full ${
                currentPage === i + 1 ? "bg-black" : "bg-white border border-gray-400"
              }`}
            />
          ))}
        </div>
      </>
    );
  };

export default AccessoryProducts;
