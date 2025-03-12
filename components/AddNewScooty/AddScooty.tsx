"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/api";
import { scootySchema, ScootyFormData } from "../Schemas/scootySchema";
import InputField from "./InputFeild";
import { ScootyFormError } from "@/utils/ScootyFormError";

const AddScooty: React.FC = () => {
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
      if (response.status === 201) router.push("/scooters");
    } catch (err: any) {
      ScootyFormError(err, setError, setApiError);
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
              <InputField<ScootyFormData>
                label="IMEI"
                name="imei"
                placeholder="868020030655822"
                register={register}
                error={errors.imei?.message}
              />
              <InputField<ScootyFormData>
                label="Model"
                name="model"
                placeholder="YIMI"
                register={register}
                error={errors.model?.message}
              />
              <InputField<ScootyFormData>
                label="Name"
                name="name"
                placeholder="Scooter"
                register={register}
                error={errors.name?.message}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-lg rounded-lg hover:bg-primary-hover"
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
