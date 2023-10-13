"use client";

import Link from "next/link";
import Image from "next/image";
import { IDishWithReviewsAndAverageRatings } from "@/interface";

export const DishCard: React.FC<{
  dish: IDishWithReviewsAndAverageRatings;
}> = ({ dish }) => {
  return (
    <Link href={`/dishes/${dish.id}`} className="block cursor-pointer">
      <div className="relative group cursor-pointer">
        <div className="bg-white pb-2 rounded-xl shadow-md my-4 flex flex-col h-[480px]">
          <div className="relative rounded-t-xl overflow-hidden shadow-lg h-4/6 w-full">
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
              <div className="flex items-center justify-center absolute top-0 right-0 bg-yellow-500 rounded-[50%] m-4 w-[50px] h-[50px] text-xl md:w-[70px] md:h-[70px] md:text-2xl">
                {dish.averageScore}
              </div>
            )}
          </div>
          <div className="px-2">
            <h2 className="text-lg m-2 font-extrabold">{dish.name}</h2>
            <p className="m-2 secondary-text-color">{dish.description}</p>
          </div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <span className="text-white text-lg">View More</span>
        </div>
      </div>
    </Link>
  );
};
