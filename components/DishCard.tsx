"use client";

import Link from "next/link";
import Image from "next/image";

export const DishCard = ({ dish }) => {
  return (
    <Link href={`/dishes/${dish.id}`} className="block cursor-pointer">
      <div className="bg-white pb-4 rounded shadow-md my-4">
        <div className="relative rounded-t-lg overflow-hidden shadow-lg">
          <Image
            src={dish.image}
            alt={dish.name}
            className="w-full object-cover"
            fill={true}
          />
          <div className="absolute top-0 right-0 bg-yellow-500 text-black rounded-full p-4 m-4">
            {dish.averageScore}
          </div>
        </div>
        <h2 className="text-lg m-2 text-gray-600 font-extrabold">
          {dish.name}
        </h2>
        <p className="text-gray-600 m-2">{dish.description}</p>
      </div>
    </Link>
  );
};
