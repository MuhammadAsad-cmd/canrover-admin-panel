"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";
import api from "@/utils/api";
import { useCookies } from "next-client-cookies";
import Image from "next/image";

// Define the expected structure of API response
interface Admin {
  email: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  admin: Admin;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const cookies = useCookies();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/admin/login", {
        email,
        password,
      });

      if (response?.data?.token) {
        // ✅ Store token without expiration
        cookies.set("token", response.data.token, { path: "/" });

        // ✅ Store admin info (non-sensitive data)
        cookies.set("adminInfo", JSON.stringify(response.data.admin), {
          path: "/",
        });

        // ✅ Redirect to dashboard
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setError("Incorrect email or password. Please try again.");
        } else if (status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(
            error.response.data?.message || "Login failed. Please try again."
          );
        }
      } else if (error.request) {
        setError(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sidebar-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-base-bg rounded-2xl shadow-lg p-8 border border-border-default">
          <div className="flex justify-center mb-8">
            <Image
              width={140}
              height={80}
              src="/images/images.png"
              alt="Logo"
              className="h-12 w-auto transform transition-transform hover:scale-105"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-heading">
              Welcome Back
            </h1>
            <p className="text-paragraph mt-2">Please sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-heading"
              >
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-default bg-base-bg 
                          text-heading placeholder-paragraph/60 
                          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                          transition-colors duration-200"
                placeholder="Enter your email or username"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-heading"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-default bg-base-bg 
                          text-heading placeholder-paragraph/60 
                          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                          transition-colors duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 
                        rounded-lg flex items-center justify-center gap-2 transform transition-all 
                        duration-200 hover:shadow-lg active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                <>
                  <IoMdLogIn />
                  Sign In
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-paragraph hover:text-primary transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
