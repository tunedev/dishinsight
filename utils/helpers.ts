import { Review } from "@prisma/client";

function roundUpToOneDecimals(num: number): number {
  return Math.ceil(num * 10) / 10;
}

export const getReviewScore = (review: Review): number => {
  const weightedAvg = review.posProb * 10 - review.negProb * 10;
  return roundUpToOneDecimals((weightedAvg + 10) / 2);
};

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
  if (score <= 6.5) return "bad-review-text";
  if (score <= 8.0) return "text-yellow";
  return "text-green";
};

export const getReviewTagBgColor = (score: number) => {
  if (score <= 6.5) return "bad-review-bg bad-review-text";
  if (score <= 8.0) return "bg-yellow text-yellow";
  return "bg-green text-green";
};

export const getReviewTagText = (score: number) => {
  let label = "Bad";
  if (score >= 5.0 && score < 6.5) {
    label = "Fair";
  } else if (score >= 6.5 && score < 8.0) {
    label = "Good";
  } else if (score >= 8.0 && score < 10.0) {
    label = "Excellent";
  }
  return label;
};
