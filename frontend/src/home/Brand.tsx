import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Brand {
  id: string;
  brand: string;
  image: string;
  href: string;
}

const BrandBoss = () => {
  const [brands, setBrands] = useState<Brand[]>([]); 

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/brands');
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const data: Brand[] = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []); //

  return (
    <div className="grid grid-rows-2 grid-cols-8 gap-4 mt-12 mx-20">
      {brands.map((product) => (
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