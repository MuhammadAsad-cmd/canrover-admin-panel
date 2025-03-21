import React from "react";
import { FaStar } from "react-icons/fa";

interface Review {
  _id: string;
  review?: string | null;
  rating?: number | null;
  createdAt?: string | null;
}

interface UserReviewsProps {
  reviews: Review[];
}

const UserReviews: React.FC<UserReviewsProps> = ({ reviews }) => {
  if (!reviews.length)
    return <p className="text-gray-500 mt-8">No reviews available.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white p-4 rounded-lg shadow-md border"
        >
          {/* Review Text Fallback */}
          <p className="text-gray-700 font-semibold">
            "{review.review || "No review text provided"}"
          </p>

          {/* Star Rating Fallback */}
          <div className="flex items-center gap-1 my-2">
            {[
              ...Array(review.rating && review.rating > 0 ? review.rating : 0),
            ].map((_, index) => (
              <span key={index} className="text-yellow-500 text-lg">
                <FaStar />
              </span>
            ))}
            {(!review.rating || review.rating <= 0) && (
              <span className="text-gray-400 text-sm">No rating</span>
            )}
          </div>

          {/* Date Fallback */}
          <p className="text-xs text-gray-400">
            {review.createdAt
              ? new Date(review.createdAt).toLocaleString()
              : "Date not available"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
