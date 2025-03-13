import type { Metadata } from "next";
import MainLayout from "@/components/Layouts/MainLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Panel for managing the system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainLayout>{children}</MainLayout>;
}
