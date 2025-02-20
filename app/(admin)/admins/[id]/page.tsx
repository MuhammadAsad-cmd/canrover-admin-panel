"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import api from "@/utils/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";

interface Admin {
  id: string;
  name: string;
  email: string;
}

const AdminDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is typed
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get(`/admin/fetch`, { params: { id } });

        if (response.data?.data?.length > 0) {
          setAdmin(response.data.data[0]); // Extract the first admin object
        } else {
          setError("Admin not found.");
        }
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAdmin();
    }
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading admin detail..." />;
  if (error) return <p className="text-red-500">{error}</p>;
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
            <div>
              <h1 className="text-2xl font-semibold text-heading mb-1">
                {admin.name}
              </h1>
            </div>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-success text-white">
              Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              {admin?.email}
              {/* <InfoRow icon={<MdEmail />} label="Email" value={admin.email} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPage;
