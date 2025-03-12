import { ScootyFormData } from "@/components/Schemas/scootySchema";

type SetErrorType = (
  field: keyof ScootyFormData,
  error: { type: string; message: string }
) => void;
type SetApiErrorType = (message: string) => void;

export const ScootyFormError = (
  err: any,
  setError: SetErrorType,
  setApiError: SetApiErrorType
) => {
  if (err.response) {
    const { status, data } = err.response;
    if (status === 409) {
      setError("imei", {
        type: "manual",
        message: "IMEI already exists. Please use a different IMEI.",
      });
    } else if (status === 400 && data?.errors) {
      Object.entries(data.errors).forEach(([key, value]) =>
        setError(key as keyof ScootyFormData, {
          type: "manual",
          message: value as string,
        })
      );
    } else {
      setApiError(data?.message || "Failed to add scooty. Please try again.");
    }
  } else if (err.request) {
    setApiError("Network error. Please check your internet connection.");
  } else {
    setApiError("An unexpected error occurred. Please try again.");
  }
};
