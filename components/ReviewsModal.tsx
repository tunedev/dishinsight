import {
  getReviewScore,
  getReviewTagColor,
  getReviewTagText,
} from "@/utils/helpers";

export const ReviewsModal = ({ reviews, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-3/4 h-3/4 overflow-y-auto">
        <button onClick={onClose} className="float-right hover:text-red-500">
          close
        </button>
        <h2 className="text-xl font-bold mb-4">Reviews:</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to share your thoughts!
          </p>
        ) : (
          reviews.map((review) => {
            const reviewScore = getReviewScore(review);
            return (
              <div key={review.id} className="mb-4">
                <p>{review.content}</p>
                <span
                  className={`inline-block p-4 mt-2 rounded ${getReviewTagColor(
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
    </div>
  );
};
