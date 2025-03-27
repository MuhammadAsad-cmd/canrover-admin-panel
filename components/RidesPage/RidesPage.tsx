"use client";
import React, { useEffect, useState } from "react";

import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Review } from "@/types/types";
import ReviewCard from "../ReviewsPage/ReviewRow";

const RidesPage: React.FC = () => {
  const reviewsPerPage = 10;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get<{ data: Review[] }>("/api/ride/fetch");
        setReviews(response.data.data);
      } catch (err) {
        setError("Failed to fetch rides");
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

  if (loading) return <LoadingSpinner message="Loading rides..." />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Total Rides </h1>
        <p className="text-gray-600 mt-2">
          Showing {reviews.length} total rides
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

export default RidesPage;
