"use client";
import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import Pagination from "../Ui/Pagination";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UsersPage: React.FC = () => {
  const usersPerPage = 10;
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const Cookies = useCookies();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("token"); // Retrieve token from cookies

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/user/fetch`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-table-header-bg text-heading">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Account Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <UserRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersPage;
