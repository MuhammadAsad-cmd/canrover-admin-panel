"use client";
import { Provider } from "react-redux";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      setToken(storedToken);
    }
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <div className="flex w-full min-h-screen">
          <div className="md:w-1/5">
            <Sidebar />
          </div>
          <main className="w-full md:w-4/5">{children}</main>
        </div>
      </Provider>
    </>
  );
}
