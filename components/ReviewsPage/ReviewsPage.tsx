"use client";
import React, { useEffect, useState } from "react";

import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ReviewCard from "./ReviewRow";
import { Review } from "@/types/types";

const ReviewsPage: React.FC = () => {
  const reviewsPerPage = 10;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get<{ data: Review[] }>(
          "/api/ride/review/fetch"
        );
        setReviews(response.data.data);
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  if (loading) return <LoadingSpinner message="Loading reviews..." />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600 mt-2">
          Showing {reviews.length} total reviews
        </p>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {reviews.length > reviewsPerPage && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import api from "@/utils/api";
// import Pagination from "../Ui/Pagination";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import ReviewRow from "./ReviewRow";
// import { Review } from "@/types/types";

// const ReviewsPage: React.FC = () => {
//   const reviewsPerPage = 10;
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await api.get<{ data: Review[] }>(
//           "/api/ride/review/fetch"
//         );
//         setReviews(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch reviews");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [currentPage]);

//   const totalPages = Math.ceil(reviews.length / reviewsPerPage);
//   const displayedReviews = reviews.slice(
//     (currentPage - 1) * reviewsPerPage,
//     currentPage * reviewsPerPage
//   );

//   if (loading) return <LoadingSpinner message="Loading reviews..." />;
//   if (error)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-heading mb-4">User Reviews</h1>

//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">User</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Scooter</th>
//               <th className="px-4 py-2">Battery</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Pickup</th>
//               <th className="px-4 py-2">Drop</th>
//               <th className="px-4 py-2">Rating</th>
//               <th className="px-4 py-2">Review</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedReviews.map((review) => (
//               <ReviewRow key={review._id} review={review} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {reviews.length > reviewsPerPage && (
//         <div className="mt-4">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewsPage;
