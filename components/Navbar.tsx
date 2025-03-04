"use client";
import { toggleSidebar } from "@/redux/Slices/sidebarSlice";
import React from "react";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch } from "react-redux";
import Image from "next/image";

interface NavbarProps {
  admin: { name?: string; email: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ admin }) => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-primary flex items-center justify-between text-white p-4">
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleSidebar())} className="md:hidden">
          <FaBars className="text-2xl" />
        </button>

        <h1 className="ml-4 text-xl">Canrover Admin</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-2xl duration-300 ease-in-out cursor-pointer size-10 flex items-center justify-center rounded-full hover:bg-primary-hover">
          <IoIosNotifications />
        </div>

        {admin && (
          <div className="hidden md:flex px-3 py-2 rounded-full cursor-pointer hover:bg-primary-hover duration-300 ease-in-out items-center gap-2">
            <FaRegUserCircle className="text-xl" />
            <span className="text-base">
              Welcome, {admin.name || admin.email}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
