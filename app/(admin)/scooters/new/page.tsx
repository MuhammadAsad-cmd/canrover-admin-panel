"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/utils/api";

// Define schema for form validation
const scootySchema = z.object({
  imei: z.string().min(1, "IMEI is required"),
  model: z.string().min(1, "Model is required"),
  name: z.string().min(1, "Name is required"),
});

type ScootyFormData = z.infer<typeof scootySchema>;

const AddScooty = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ScootyFormData>({
    resolver: zodResolver(scootySchema),
  });

  const onSubmit: SubmitHandler<ScootyFormData> = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const response = await api.post("/api/scooter/create", data);

      if (response.status === 201) {
        router.push("/scooters");
      }
    } catch (err: any) {
      if (err.response) {
        const { status, data } = err.response;

        if (status === 409) {
          setError("imei", {
            type: "manual",
            message: "IMEI already exists. Please use a different IMEI.",
          });
        } else if (status === 400 && data?.errors) {
          Object.entries(data.errors).forEach(([key, value]) => {
            setError(key as keyof ScootyFormData, {
              type: "manual",
              message: value as string,
            });
          });
        } else {
          setApiError(
            data?.message || "Failed to add scooty. Please try again."
          );
        }
      } else if (err.request) {
        setApiError("Network error. Please check your internet connection.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-4xl mx-auto bg-base-bg rounded-lg border border-border-default shadow-sm">
        <div className="p-6 border-b border-border-default">
          <h1 className="text-2xl text-heading text-center font-bold">
            Add New Scooty
          </h1>
        </div>
        <div className="p-6">
          {apiError && (
            <p className="text-red-500 py-2 text-center">{apiError}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">IMEI</label>
                <input
                  type="text"
                  placeholder="868020030655822"
                  {...register("imei")}
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                />
                {errors.imei && (
                  <p className="text-red-500 text-sm">{errors.imei.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Model</label>
                <input
                  type="text"
                  placeholder="YIMI"
                  {...register("model")}
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm">{errors.model.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Scooter"
                  {...register("name")}
                  className="w-full h-10 px-3 py-2 rounded-lg border"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            </div>

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

export default AddScooty;
