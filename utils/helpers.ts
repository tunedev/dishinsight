import { Review } from "@prisma/client";

function roundUpToOneDecimals(num: number): number {
  return Math.ceil(num * 10) / 10;
}

export const getReviewScore = (review: Review): number =>
  roundUpToOneDecimals(review.posProb * 10 - review.negProb * 5);

export const getDishAvgScore = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }

  // Calculate average score from reviews
  const totalScore = reviews.reduce((acc, review) => {
    // The positive probability is used as the base score
    // and adjusting it based on negative.
    const score = getReviewScore(review);
    return acc + score;
  }, 0);

  const averageScore = roundUpToOneDecimals(totalScore / reviews.length);

  return averageScore;
};

export const getReviewTagColor = (score: number) => {
  if (score <= 5) return "bg-black text-white";
  if (score <= 6.9) return "bg-yellow-500 text-black";
  return "bg-green-500 text-white";
};

export const getReviewTagText = (score: number) => {
  let label = "Not Recommended";
  if (score >= 6.0 && score < 7.0) {
    label = "IT's Fine";
  } else if (score >= 7.0 && score < 8.0) {
    label = "Pretty Good";
  } else if (score >= 8.0 && score < 9.0) {
    label = "Truly Excellent";
  } else if (score >= 9.0) {
    label = "Best of the Best";
  }
  return label;
};
