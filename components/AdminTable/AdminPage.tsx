"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../Ui/Pagination";
import AdminRows from "./AdminRows";
import api from "@/utils/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AdminsPage: React.FC = () => {
  const adminsPerPage = 10;
  const [admins, setAdmins] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get(`/api/admin/fetch`);
        setAdmins(response.data.data);
      } catch (err) {
        setError("Failed to fetch admins");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [currentPage]);

  const totalPages = Math.ceil(admins.length / adminsPerPage);
  const displayedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  if (loading) return <LoadingSpinner message="Loading admins..." />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-heading font-bold">Admins</h1>
        <Link
          href="/admins/new"
          className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md"
        >
          Create New Admin
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-table-header-bg text-left text-heading">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {displayedAdmins.map((admin) => (
              <AdminRows key={admin._id} admin={admin} />
            ))}
          </tbody>
        </table>
      </div>
      {admins.length > adminsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminsPage;
