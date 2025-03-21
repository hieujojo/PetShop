import Image from "next/image";
import Link from "next/link";

const Collections = () => {
  const items = [
    {
      id: "block-41b12b4c-82b5-4352-8517-389aad8e189c",
      title: "Pate Mèo Con",
      href: "/collections/pate-cho-meo-con",
      imageSrc: "https://paddy.vn/cdn/shop/files/Pate_MEo_Con_2_940x.jpg?v=1695354433",
    },
    {
      id: "block-bdae57c3-5b52-4a54-8e32-0a044b504263",
      title: "Thức Ăn Cho Mèo Con",
      href: "/collections/thuc-an-cho-meo-con-kitten",
      imageSrc: "https://paddy.vn/cdn/shop/files/Pate_meo_con_e8c96144-57aa-49a1-aa57-ac24b820fcdb_940x.jpg?v=1695354390",
    },
    {
      id: "block-fcfce55e-8fe7-4a74-9144-b92bd0bc2b2c",
      title: "Cát Vệ Sinh Mèo",
      href: "/collections/cat-meo",
      imageSrc: "https://paddy.vn/cdn/shop/files/Pate_MEo_Con_3_940x.jpg?v=1695357439",
    },
    {
      id: "block-d436bd12-1274-4406-9390-e950151fbe8a",
      title: "Sữa Tắm Cho Mèo Con",
      href: "https://paddy.vn/collections/sua-tam-cho-meo-con",
      imageSrc: "https://paddy.vn/cdn/shop/files/nha-cho-meo_1_940x.jpg?v=1695357460",
    },
    {
      id: "block-f15bb8a5-40f9-4d63-97ab-a51b2e7a1420",
      title: "Đồ Chơi Cho Mèo Con",
      href: "/collections/do-choi-cho-meo-con",
      imageSrc: "https://paddy.vn/cdn/shop/files/do-choi-cho-meo-con_940x.jpg?v=1695355724",
    },
    {
      id: "block-e6a19dc6-2aec-4512-92b1-383a2457fd78",
      title: "Nhà Cho Mèo",
      href: "/collections/cat-tree-cay-meo",
      imageSrc: "https://paddy.vn/cdn/shop/files/nha-cho-meo_940x.jpg?v=1695356300",
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center w-[200px] text-center"
        >
          <div className="w-full max-w-[1000px] mx-auto">
            <Link href={item.href} className="block relative pt-[10%]">
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={165}
                height={165}
                layout="responsive"
                className="rounded-lg"
              />
            </Link>
          </div>
          <Link
            href={item.href}
            className="text-center mt-2 text-black text-lg font-medium hover:text-[#234bbb] hover:underline hover:underline-offset-2"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Collections;