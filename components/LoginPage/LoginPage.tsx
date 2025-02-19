"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
import { useCookies } from "next-client-cookies";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const Cookies = useCookies();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // console.log("Login Success:", response.data);

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        // console.log("Stored Token:", Cookies.get("token"));

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 100);
      } else {
        setError("Invalid login credentials");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-sidebar-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-base-bg rounded-2xl shadow-lg p-8 border border-border-default">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <img
              src="/placeholder.svg"
              alt="Logo"
              className="h-12 w-auto transform transition-transform hover:scale-105"
            />
          </div>
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-heading">
              Welcome Back
            </h1>
            <p className="text-paragraph mt-2">Please sign in to continue</p>
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}
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
            >
              <IoMdLogIn />
              Sign In
            </button>
          </form>
          {/* Additional Links */}
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
