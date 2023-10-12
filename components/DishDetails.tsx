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

export const DishDetails = ({ dish }) => {
  const reviewScore = getDishAvgScore(dish.reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 text-gray-700">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{dish.name}</h1>
        <div className="ratings-card float-right">
          <span
            className={`inline-block py-2 px-6 mb-4 rounded-full uppercase ${getReviewTagColor(
              reviewScore
            )}`}
          >
            {`${reviewScore} - ${
              dish.reviews.length > 0
                ? getReviewTagText(reviewScore)
                : "No ratings yet"
            }`}
          </span>
        </div>
      </div>
      <Image
        src={dish.image}
        alt={dish.name}
        className="w-full object-cover"
        width={512}
        height={240}
      />
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
