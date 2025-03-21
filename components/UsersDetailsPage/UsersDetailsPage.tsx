"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import api from "@/utils/api";
import { useParams } from "next/navigation";
import { User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import UserRides from "./UserRides";
import UserReviews from "./UserReviews";
import Pagination from "../Ui/Pagination";

const ITEMS_PER_PAGE = 10;

const UsersDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [rides, setRides] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [ridesPage, setRidesPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [userRes, ridesRes, reviewsRes] = await Promise.all([
          api.get(`/api/user/fetch`, { params: { id } }),
          api.get(`/api/ride/fetch?uId=${id}`),
          api.get(`/api/ride/review/fetch?uId=${id}`),
        ]);

        if (userRes.data?.data?.length > 0) {
          setUser(userRes.data.data[0]);
        } else {
          setError("User not found.");
        }

        setRides(ridesRes.data?.data || []);
        setReviews(reviewsRes.data?.data || []);
      } catch (err) {
        setError("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading details..." />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        User not found!
      </div>
    );

  // Pagination logic for rides
  const totalRides = rides.length;
  const totalRidesPages = Math.ceil(totalRides / ITEMS_PER_PAGE);
  const ridesStartIndex = (ridesPage - 1) * ITEMS_PER_PAGE;
  const ridesPaginated = rides.slice(
    ridesStartIndex,
    ridesStartIndex + ITEMS_PER_PAGE
  );

  // Pagination logic for reviews
  const totalReviews = reviews.length;
  const totalReviewsPages = Math.ceil(totalReviews / ITEMS_PER_PAGE);
  const reviewsStartIndex = (reviewsPage - 1) * ITEMS_PER_PAGE;
  const reviewsPaginated = reviews.slice(
    reviewsStartIndex,
    reviewsStartIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 animate-fadeIn">
      <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4 text-heading">
          User Details
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="w-20 h-20 border-2 rounded-full border-primary-light overflow-hidden">
            <Image
              width={80}
              height={80}
              src={user.image || "/images/dummy.jpg"}
              alt={user.name || "User Image"}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-heading">{user.name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <Link
              href={`mailto:${user.email}`}
              className="font-medium text-primary hover:underline"
            >
              {user.email || "No Email"}
            </Link>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <Link
              href={`tel:${user.phone}`}
              className="font-medium text-primary hover:underline"
            >
              {user.phone || "N/A"}
            </Link>
          </div>
        </div>
      </section>

      {/* User Rides with Conditional Pagination */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Rides</h2>
        <UserRides rides={ridesPaginated} />
        {totalRides > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={ridesPage}
            totalPages={totalRidesPages}
            onPageChange={setRidesPage}
          />
        )}
      </div>

      {/* User Reviews with Conditional Pagination */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
        <UserReviews reviews={reviewsPaginated} />
        {totalReviews > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={reviewsPage}
            totalPages={totalReviewsPages}
            onPageChange={setReviewsPage}
          />
        )}
      </div>
    </div>
  );
};

export default UsersDetailsPage;
