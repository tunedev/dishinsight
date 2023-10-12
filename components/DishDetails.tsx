"use client";

import { useState } from "react";
import RatingsForm from "./RatingsForm";
import { ReviewsModal } from "./ReviewsModal";
import Image from "next/image";
import {
  getDishAvgScore,
  getReviewTagColor,
  getReviewTagText,
} from "@/utils/helpers";
import { IDishWithReviewsAndAverageRatings } from "@/interface";

export const DishDetails: React.FC<{
  dish: Omit<IDishWithReviewsAndAverageRatings, "averageScore">;
}> = ({ dish }) => {
  const reviewScore = getDishAvgScore(dish.reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 text-gray-700">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl md:text-4xl font-bold md:mb-4">{dish.name}</h1>
        <div
          className={`font-bold rounded-full uppercase ratings-card float-right py-2 px-4 text-xs md:text-2xl md:px-6 mb-4 ${getReviewTagColor(
            reviewScore
          )}`}
        >
          <span className={`inline-block`}>
            {`${reviewScore} - ${
              dish.reviews.length > 0
                ? getReviewTagText(reviewScore)
                : "No ratings yet"
            }`}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center w-[100%] mx-auto mb-4 lg:h-[60vh] overflow-hidden rounded-t-3xl">
        <Image
          src={dish.image}
          alt={dish.name}
          className="w-full h-auto"
          width={512}
          height={240}
          blurDataURL="/public/assets/placeholder-dishinsight.png"
          placeholder="blur"
          loading="lazy"
        />
      </div>
      <p>{dish.description}</p>
      <div>
        <RatingsForm dishId={dish.id} />
        <div>
          {dish.reviews.length > 0 ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 underline"
            >
              View all reviews
            </button>
          ) : (
            <p className="text-gray-500">
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
          {isModalOpen && (
            <ReviewsModal
              reviews={dish.reviews}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
