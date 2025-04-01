"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import ToggleThemeButton from "@/components/ui/ToggleThemeButton";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

// Định nghĩa kiểu cho menu item
interface MenuItem {
  id: number;
  category: string;
  sub_item: string;
  locale: string;
}

export default function Header() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Lấy dữ liệu menu từ backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/menu?locale=${locale}`);
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };
    fetchMenuItems();
  }, [locale]);

  // Nhóm các mục menu theo category
  const groupedMenuItems = menuItems.reduce((acc: { [key: string]: MenuItem[] }, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Hàm chuyển đổi ngôn ngữ
  const switchLanguage = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    let newPath;
  
    if (pathname === "/" || pathname === `/${locale}`) {
      newPath = `/${newLocale}`; // Chỉ thay đổi locale nếu ở trang chủ
    } else {
      newPath = `/${newLocale}${pathname.replace(/^\/(vi|en)/, "")}`; // Giữ nguyên đường dẫn hiện tại
    }
  
    console.log("Switching to:", newPath); // Kiểm tra đường dẫn
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800">
      <div className="container mx-auto max-w-[1370px] px-4">
        <div className="flex items-center py-4">
          <div>
            <Link href="/">
              <Image
                src="https://paddy.vn/cdn/shop/files/logo_paddy_desktop_155x@2x.png?v=1693364605"
                alt="Paddy Pet Shop"
                width={180}
                height={51.5}
                className="w-auto"
              />
            </Link>
          </div>

          <div className="hidden lg:block bg-white rounded-md max-w-[680px] flex-1 ml-28">
            <div className="relative">
              <Input type="search" className="w-full h-[50px]" />
              <Button className="absolute bg-white right-2 top-1/2 -translate-y-1/2 shadow-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="ml-16 text-white">
            <div>{t("hotline")}</div>
            <div className="font-bold">086 767 7891</div>
          </div>

          <div className="ml-12">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[32px] w-[32px] ml-2 text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <div>
              <div className="text-white mt-1">{t("wishlist")}</div>
            </div>
          </div>

          <div className="relative ml-8">
            <div className="ml-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="h-[32px] w-[32px] ml-2 mb-1 text-white"
                viewBox="0 0 1024 1024"
                fill="currentColor"
              >
                <path
                  className="path1"
                  d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
                ></path>
                <path
                  className="path2"
                  d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
                ></path>
              </svg>
            </div>

            {user ? (
  <div className="relative">
    <button
      className="text-white focus:outline-none ml-1"
      onClick={() => setIsOpen(!isOpen)}
    >
      {t("account")}
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
        <div className="p-2 border-b">
          <span className="font-semibold">Hi {user?.name || "User"}</span>
        </div>
        {/* ... */}
      </div>
    )}
  </div>
) : (
  <Link href="/auth/login">
    <span className="cursor-pointer text-white">{t("login")}</span>
  </Link>
)}
          </div>

          <div className="ml-8 text-white">
            <div className="ml-3">
              <svg
                viewBox="0 0 1024 1024"
                className="h-[32px] w-[32px] ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  className="path1"
                  d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4S512 865.136 512 921.6 466.064 1024 409.6 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                ></path>
                <path
                  className="path2"
                  d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4S711.536 819.2 768 819.2s102.4 45.936 102.4 102.4S824.464 1024 768 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                ></path>
                <path
                  className="path3"
                  d="M898.021 228.688C885.162 213.507 865.763 204.8 844.8 204.8H217.954l-5.085-30.506C206.149 133.979 168.871 102.4 128 102.4H76.8c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6H128c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395C254.65 736.421 291.929 768 332.799 768h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zm-35.69 48.006l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"
                ></path>
              </svg>
            </div>
            <div>
              <div className="text-white mt-1">{t("cart")}</div>
            </div>
          </div>

          {/* Nút chuyển đổi ngôn ngữ */}
          <div className="ml-8">
            <button
              onClick={switchLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
              </svg>
              <span>{locale === "vi" ? "English" : "Tiếng Việt"}</span>
            </button>
          </div>
        </div>

        <div className="">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8 py-2">
            {Object.keys(groupedMenuItems).map((category) => (
  <div key={category} className="relative group">
    <button className="text-white text-[18px] font-bold group-hover:after:content-[''] group-hover:after:absolute group-hover:after:w-full group-hover:after:h-[2px] group-hover:after:bg-white group-hover:after:bottom-0 group-hover:after:left-0 transition-all">
      {category}
    </button>
    <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
      {groupedMenuItems[category].map((item: MenuItem) => (
        <Link
          key={item.id} // Sử dụng item.id làm key
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          {item.sub_item}
        </Link>
      ))}
    </div>
  </div>
))}
              <div className="relative group">
                <ToggleThemeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}