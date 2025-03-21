import React from "react";
import { FaStar } from "react-icons/fa";

interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
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
          <p className="text-gray-700 font-semibold">"{review.review}"</p>
          {/* Star Rating */}
          <div className="flex items-center gap-1 my-2">
            {[...Array(review.rating)].map((_, index) => (
              <span key={index} className="text-yellow-500 text-lg">
                <FaStar />
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
