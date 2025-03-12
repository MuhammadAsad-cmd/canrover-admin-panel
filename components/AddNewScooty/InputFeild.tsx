// InputField.tsx
import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
}: InputFieldProps<T>) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">{label}</label>
    <input
      id={label}
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="w-full h-10 px-3 py-2 rounded-lg border"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;
