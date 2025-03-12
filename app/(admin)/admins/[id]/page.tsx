"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import api from "@/utils/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
}

const AdminDetailPage: React.FC = () => {
  const { id } = useParams(); // No need for generic type
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = useCallback(async () => {
    try {
      const response = await api.get(`/api/admin/fetch`, { params: { id } });
      const adminData = response.data?.data?.[0];

      if (adminData) {
        setAdmin(adminData);
      } else {
        setAdmin(null);
      }
    } catch (err) {
      setAdmin(null); // No need for separate error state
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchAdmin();
  }, [id, fetchAdmin]);

  if (loading) return <LoadingSpinner message="Loading admin details..." />;
  if (!admin)
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-500">
        User not found!
      </div>
    );

  return (
    <div className="p-6 animate-fadeIn">
      <div className="overflow-hidden bg-base-bg border border-border-default rounded-lg shadow-sm">
        <div className="pt-20 px-6 pb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-semibold text-heading">
              {admin.name}
            </h1>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-success text-white">
              Online
            </span>
          </div>

          <p className="mt-4 text-lg text-gray-600">{admin.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPage;
