"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";
import api from "@/utils/api";
import { useCookies } from "next-client-cookies";
import Image from "next/image";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface Admin {
  email: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  admin: Admin;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [error, setError] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");

    try {
      const response = await api.post<LoginResponse>("/api/admin/login", data);

      if (response?.data?.token) {
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("adminInfo", JSON.stringify(response.data.admin), {
          path: "/",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        // Server responded with a status code outside 2xx
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "No response from the server. Please check your connection.";
      } else {
        // Something else went wrong
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
    }
  };

  // const onSubmit = async (data: LoginFormValues) => {
  //   setError("");

  //   try {
  //     const response = await api.post<LoginResponse>("/api/admin/login", data);

  //     if (response?.data?.token) {
  //       cookies.set("token", response.data.token, { path: "/" });
  //       cookies.set("adminInfo", JSON.stringify(response.data.admin), {
  //         path: "/",
  //       });
  //       router.push("/");
  //       router.refresh();
  //     }
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message || "Login failed. Please try again.";
  //     setError(errorMessage);
  //   }
  // };

  return (
    <div className="min-h-screen bg-sidebar-bg flex items-center justify-center">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-base-bg rounded-2xl shadow-lg pb-6 px-6 border border-border-default">
          <div className="flex justify-center items-center w-full mx-auto max-w-[200px] mb-2">
            <Image
              width={140}
              height={80}
              src="/images/logo.png"
              alt="Logo"
              className="h-full w-full mx-auto"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-heading">
              Welcome Back
            </h1>
            <p className="text-paragraph mt-2">Please sign in to continue</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-heading"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-border-default bg-base-bg 
                          text-heading placeholder-paragraph/60 
                          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                          transition-colors duration-200"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-heading"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-border-default bg-base-bg 
                          text-heading placeholder-paragraph/60 
                          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                          transition-colors duration-200"
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 
                        rounded-lg flex items-center justify-center gap-2 transform transition-all 
                        duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                <>
                  <IoMdLogIn />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
