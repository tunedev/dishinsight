"use client";

import Link from "next/link";
import Image from "next/image";
import { IDishWithReviewsAndAverageRatings } from "@/interface";

export const DishCard: React.FC<{
  dish: IDishWithReviewsAndAverageRatings;
}> = ({ dish }) => {
  return (
    <Link href={`/dishes/${dish.id}`} className="block cursor-pointer">
      <div className="bg-white pb-2 rounded shadow-md my-4 flex flex-col h-[480px]">
        <div className="relative rounded-t-lg overflow-hidden shadow-lg h-4/6 w-full">
          <Image
            src={dish.image}
            alt={dish.name}
            className="w-full h-auto object-cover"
            width={512}
            height={512}
            blurDataURL="/public/assets/placeholder-dishinsight.png"
            placeholder="blur"
            loading="lazy"
          />
          {Boolean(dish.averageScore) && (
            <div className="flex items-center justify-center absolute top-0 right-0 bg-yellow-500 text-black rounded-[50%] m-4 w-[70px] h-[70px] text-2xl">
              {dish.averageScore}
            </div>
          )}
        </div>
        <div className="px-2">
          <h2 className="text-lg m-2 text-gray-600 font-extrabold">
            {dish.name}
          </h2>
          <p className="text-gray-600 m-2">{dish.description}</p>
        </div>
      </div>
    </Link>
  );
};
