"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import api from "@/utils/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  accountType: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is typed
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await api.get(`/user/fetch`);
        const response = await api.get(`/user/fetch`, { params: { id } });

        if (response.data?.data?.length > 0) {
          setUser(response.data.data[0]); // Extract first user object
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading user details..." />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-500">
        User not found!
      </div>
    );

  return (
    <div className="p-6 animate-fadeIn">
      <div className="overflow-hidden bg-base-bg border border-border-default rounded-lg shadow-sm">
        <div className="pt-20 px-6 pb-6 w-full">
          <div className="flex mx-auto justify-center rounded-full border border-gray-300 shadow-sm w-32 h-32">
            <Image
              width={120}
              height={120}
              src={user.image || "/images/dummy.jpg"}
              alt={user.name}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-heading mb-1">
                {user?.name || "Unknown"}
              </h1>
              <p className="text-gray-500">Account Type: {user.accountType}</p>
            </div>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-success text-white">
              Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <p>Email: {user?.email || "No Email"}</p>

              <p>Phone: {user?.phone ? user.phone : "N/A"}</p>
              <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
