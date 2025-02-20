"use client";
import { toggleSidebar } from "@/redux/Slices/sidebarSlice";
import React from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface NavbarProps {
  admin: { name?: string; email: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ admin }) => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="bg-primary flex items-center justify-between text-white p-4">
        {/* Visible only on small screens */}
        <button onClick={() => dispatch(toggleSidebar())} className="md:hidden">
          <FaBars className="text-2xl" />
        </button>
        <h1 className="ml-4 text-xl">My App</h1>
        <div>
          {admin ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Welcome, {admin.name || admin.email}
              </span>
            </div>
          ) : (
            <span className="text-sm">Not logged in</span>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
