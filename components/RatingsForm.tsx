"use client";

import { useState } from "react";

export const RatingsForm = ({ dishId }) => {
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const handleReviewSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishId,
          content: reviewText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFeedback("Thanks for your review!");
        setReviewText(""); // Clear the textarea
      } else {
        setFeedback("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFeedback("Error submitting review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewChange = (e) => {
    const text = e.target.value;
    if (text.length > 800) {
      setError("Review should not exceed 800 characters.");
    } else {
      setError(null);
    }
    setReviewText(text);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Add Your Review:</h2>
      <textarea
        value={reviewText}
        onChange={(e) => handleReviewChange(e)}
        className="w-full p-2 border rounded mb-4"
        id="reviewTextarea"
        rows={4}
        placeholder="Share your thoughts about this dish..."
      ></textarea>
      <div className="text-sm text-gray-500">{reviewText.length}/800</div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        onClick={handleReviewSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={submitting || Boolean(error)}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
      {feedback && <div className="mt-4">{feedback}</div>}
    </div>
  );
};

export default RatingsForm;
