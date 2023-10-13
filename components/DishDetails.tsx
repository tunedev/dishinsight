"use client";

import { useState } from "react";
import RatingsForm from "./RatingsForm";
import { Reviews } from "./Reviews";
import Image from "next/image";
import {
  getDishAvgScore,
  getReviewTagBgColor,
  getReviewTagText,
} from "@/utils/helpers";
import { IDishWithReviewsAndAverageRatings } from "@/interface";
import { Dish, Review } from "@prisma/client";

export const DishDetails: React.FC<{
  dish: Omit<IDishWithReviewsAndAverageRatings, "averageScore">;
}> = ({ dish }) => {
  const [currentDish, setCurrentDish] = useState<Dish & { reviews: Review[] }>(
    dish
  );
  const reviewScore = getDishAvgScore(currentDish.reviews);

  return (
    <div className="px-4 pt-2">
      <div className="shadow w-full h-[60%] bg-white grid grid-rows-3 max-h-[400px] grid-cols-2 grid-flow-col gap-4 overflow-hidden mt-10 rounded-lg">
        <div className="row-span-3 col-span-1 w-full mx-auto">
          <Image
            src={currentDish.image}
            alt={currentDish.name}
            className="w-full p-auto object-cover"
            width={514}
            height={60}
            blurDataURL="/public/assets/placeholder-dishinsight.png"
            placeholder="blur"
            loading="lazy"
          />
        </div>
        <div className="row-span-3 col-span-1 relative mt-6 mr-4">
          <h1 className="text-lg mt-[50px] md:text-4xl font-bold md:mb-4 md:mt-[75px]">
            {currentDish.name}
          </h1>
          <div
            className={`font-bold rounded-full uppercase ratings-card absolute top-0 right-0 py-2 px-4 text-xs md:text-lg md:px-6 mb-4 md:w-[150px] md:h-[40px] ${getReviewTagBgColor(
              reviewScore
            )}`}
          >
            <span className={`inline-block`}>
              {`${reviewScore} - ${
                currentDish.reviews.length > 0
                  ? getReviewTagText(reviewScore)
                  : "N/A"
              }`}
            </span>
          </div>
          <p className="secondary-text-color row-span-2 col-span-2 md:text-2xl">
            {currentDish.description}
          </p>
        </div>
      </div>
      <div className="w">
        <div className="flex justify-center items-center row-span-3"></div>
        <div className=" col-span-2"></div>
      </div>
      <div>
        <RatingsForm dishId={currentDish.id} setCurrentDish={setCurrentDish} />
        <div>
          {currentDish.reviews.length === 0 && (
            <p>
              No reviews yet.{" "}
              <a
                href="#reviewTextarea"
                className="text-blue-500 underline cursor-pointer"
              >
                Leave a review
              </a>{" "}
              and share your thoughts!
            </p>
          )}

          <Reviews reviews={currentDish.reviews} />
        </div>
      </div>
    </div>
  );
};
