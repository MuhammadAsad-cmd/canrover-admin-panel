"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api"; // Ensure this utility handles API requests

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/admin/register", formData);
      router.push("/admins"); // Redirect back to the admin list
    } catch (err) {
      setError("Failed to create admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-4xl mx-auto bg-base-bg rounded-lg border border-border-default shadow-sm">
        <div className="p-6 border-b border-border-default">
          <h1 className="text-2xl text-heading text-center font-bold">
            Add New Admin
          </h1>
        </div>
        <div className="p-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  placeholder="canrover"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="canrover@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white text-lg rounded-lg hover:bg-primary-hover"
              disabled={loading}
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
