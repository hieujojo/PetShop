import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
}

const Collections = () => {
  const [items, setItems] = useState<Collection[]>([]); 

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/collections');
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data: Collection[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []); 

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