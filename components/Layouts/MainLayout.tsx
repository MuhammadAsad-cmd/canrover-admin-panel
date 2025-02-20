"use client";
import { Provider } from "react-redux";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [admin, setAdmin] = useState<{ name?: string; email: string } | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await api.get(`/admin/profile`);
        setAdmin(res.data.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        router.push("/login");
      }
    };

    fetchAdminProfile();
  }, [router]);

  return (
    <Provider store={store}>
      <Navbar admin={admin} />
      <div className="flex w-full min-h-screen">
        <div className="md:w-1/5">
          <Sidebar />
        </div>
        <main className="w-full md:w-4/5">{children}</main>
      </div>
    </Provider>
  );
}
