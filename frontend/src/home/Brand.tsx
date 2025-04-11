import React from "react";
import Image from "next/image";
import Link from "next/link";

const brand = [
  {
    id: "1",
    brand: "Nutrience",
    image:
      "https://paddy.vn/cdn/shop/files/nutrience_logo_534x.png?v=1671338493",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "2",
    brand: "Royal Canin",
    image:
      "https://paddy.vn/cdn/shop/files/royal_canin_logo_bf62d31c-c2a2-4ec3-bc66-6eccdeffb5af_534x.png?v=1671338889",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "3",
    brand: "Hi Raw!",
    image:
      "https://paddy.vn/cdn/shop/files/thuong-hieu-hi-raw_534x.jpg?v=1695873647",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "4",
    brand: "Equilibrio",
    image:
      "https://paddy.vn/cdn/shop/files/equilibrio-logo-paddy_534x.jpg?v=1695891927",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "5",
    brand: "Kit Cat",
    image: "https://paddy.vn/cdn/shop/files/kit_cat_logo_534x.png?v=1671342867",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "6",
    brand: "Tropiclean",
    image:
      "https://paddy.vn/cdn/shop/files/tropiclean_logo_534x.png?v=1671341407",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "7",
    brand: "Ciao Churu",
    image: "https://paddy.vn/cdn/shop/files/ciao_logo_534x.png?v=1671341170",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "8",
    brand: "Nekko",
    image: "https://paddy.vn/cdn/shop/files/nekko_logo_534x.png?v=1671338350",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "9",
    brand: "Monge",
    image: "https://paddy.vn/cdn/shop/files/monge_logo_534x.png?v=1671338281",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "10",
    brand: "Zenith",
    image:
      "https://paddy.vn/cdn/shop/files/thuong-hieu-zenith_2_534x.jpg?v=1695873452",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "11",
    brand: "ANF",
    image:
      "https://paddy.vn/cdn/shop/files/thuong-hieu-anf_534x.jpg?v=1695873889",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "12",
    brand: "Gimcat",
    image:
      "https://paddy.vn/cdn/shop/files/thuong-hieu-gimcat_534x.jpg?v=1695874026",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "13",
    brand: "Inaba",
    image:
      "https://paddy.vn/cdn/shop/files/4_e1e55f87-596f-419d-ad39-80c067f373e3_534x.jpg?v=1695961518",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "14",
    brand: "Me-O",
    image:
      "https://paddy.vn/cdn/shop/files/2_6fae0002-0cba-4518-9713-65dbd655a730_534x.jpg?v=1695961518",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "15",
    brand: "Lapaw",
    image:
      "https://paddy.vn/cdn/shop/files/1_a81865ff-df97-490a-8e04-7d87a592e76c_534x.jpg?v=1695961518",
    href: "/products/thuc-an-cho-meo-400g",
  },
  {
    id: "16 ",
    brand: "Absolute Hoistic",
    image:
      "https://paddy.vn/cdn/shop/files/3_9501095c-72c3-4fd2-bfbb-8c74d06d9dd5_534x.jpg?v=1695961518",
    href: "/products/thuc-an-cho-meo-400g",
  },
];

const BrandBoss = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-8 gap-4 mt-12 mx-20">
      {brand.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-col items-center justify-center"
        >
          <Link href={product.href} className="w-full">
            <div className="relative shadow-lg overflow-hidden h-[160px] flex flex-col items-center justify-center rounded-lg box-shadow">
              <Image
                src={product.image}
                alt={product.brand}
                width={160}
                height={100}
              />
              <h3 className="mt-2 text-center hover:text-[#234BBB] hover:underline hover:underline-offset-4 hover:decoration-2 transition-all duration-300">
                {product.brand}
              </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrandBoss;
