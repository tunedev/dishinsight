import {
  getReviewScore,
  getReviewTagColor,
  getReviewTagText,
} from "@/utils/helpers";
import { Review } from "@prisma/client";

export const Reviews: React.FC<{
  reviews: Review[];
}> = ({ reviews }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Reviews:</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to share your thoughts!</p>
      ) : (
        reviews.map((review) => {
          const reviewScore = getReviewScore(review);
          return (
            <div key={review.id} className="mb-4">
              <p className="secondary-text-color">{review.content}</p>
              <span
                className={`inline-block p-2 mt-2 rounded ${getReviewTagColor(
                  reviewScore
                )}`}
              >
                {`${reviewScore} - ${getReviewTagText(reviewScore)}`}
              </span>

              <hr className="my-2" />
            </div>
          );
        })
      )}
    </div>
  );
};
