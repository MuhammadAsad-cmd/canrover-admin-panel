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
        const res = await api.get(`/api/admin/profile`);
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
      <div className="flex w-full h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <div className="md:w-[320px] sticky left-0 top-[72px] h-full overflow-y-auto custom-scrollbar">
          <Sidebar admin={admin} />
        </div>

        {/* Main Content */}
        <main className="w-full px-4 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </Provider>
  );
}
