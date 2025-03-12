import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const AdminFormError = <T extends FieldValues>(
  err: any,
  setError: UseFormSetError<T>,
  setApiError: (msg: string) => void
) => {
  if (err.response) {
    if (err.response.data?.errors) {
      Object.entries(err.response.data.errors).forEach(([key, message]) => {
        setError(key as Path<T>, {
          type: "manual",
          message: message as string,
        });
      });
    } else {
      setApiError(err.response.data?.message || "An error occurred.");
    }
  } else {
    setApiError("An unexpected error occurred. Please try again.");
  }
};
