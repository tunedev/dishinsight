import { Dish, Review } from "@prisma/client";

export type IDishWithReviewsAndAverageRatings = Dish & {
  reviews: Review[];
  averageScore: number;
};
