"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api";

import { AdminFormData, adminSchema } from "../Schemas/adminSchema";
import InputField from "../AddNewScooty/InputFeild";
import { AdminFormError } from "@/utils/AdminFormError";

const AddNewAdmin: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit: SubmitHandler<AdminFormData> = async (data) => {
    setLoading(true);
    setApiError("");
    try {
      const response = await api.post("/api/admin/register", data);
      if (response.status === 200 || response.status === 201) {
        router.push("/admins");
      }
    } catch (err: any) {
      AdminFormError(err, setError, setApiError);
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
          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField<AdminFormData>
                label="Username"
                name="name"
                placeholder="canrover"
                register={register}
                error={errors.name?.message}
              />
              <InputField<AdminFormData>
                label="Email"
                name="email"
                placeholder="canrover@gmail.com"
                register={register}
                error={errors.email?.message}
              />
              <InputField<AdminFormData>
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white text-lg rounded-lg hover:bg-primary-hover"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;
