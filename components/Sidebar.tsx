"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SideLink from "./SideLink";
import { RootState } from "@/redux/store";
import { closeSidebar } from "@/redux/Slices/sidebarSlice";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { RxDashboard } from "react-icons/rx";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsScooter } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

interface NavbarProps {
  admin: { name?: string; email: string } | null;
}

const Sidebar: React.FC<NavbarProps> = ({ admin }) => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const Cookies = useCookies();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/", icon: <RxDashboard /> },
    { name: "Users", href: "/users", icon: <FaUsers /> },
    { name: "Admins", href: "/admins", icon: <MdOutlineAdminPanelSettings /> },
    { name: "Scooties", href: "/scooties", icon: <BsScooter /> },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(closeSidebar());
    router.push("/login");
  };

  return (
    <>
      {/* Sidebar panel */}
      <div
        className={`
          bg-sidebar-bg shadow-xl max-md:w-[280px] fixed top-0 md:static h-full z-50 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>

          <nav className="space-y-2">
            {admin && (
              <div className="md:hidden flex px-3 py-2 rounded cursor-pointer hover:font-semibold hover:bg-primary-hover hover:text-white duration-300 ease-in-out items-center gap-2">
                <FaRegUserCircle className="text-xl" />
                <span className="text-base">
                  Welcome, {admin.name || admin.email}
                </span>
              </div>
            )}
            {links.map((link) => (
              <SideLink
                key={link.name}
                href={link.href}
                name={link.name}
                icon={link.icon}
                onClick={() => dispatch(closeSidebar())}
              />
            ))}
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-600 text-white w-full rounded"
            >
              <IoMdLogOut className="text-xl" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay (only on small screens when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => dispatch(closeSidebar())}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
