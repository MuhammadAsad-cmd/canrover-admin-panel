"use client";
import { toggleSidebar } from "@/redux/Slices/sidebarSlice";
import React from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="bg-primary text-white p-4 flex items-center">
        {/* Visible only on small screens */}
        <button onClick={() => dispatch(toggleSidebar())} className="md:hidden">
          <FaBars className="text-2xl" />
        </button>
        <h1 className="ml-4 text-xl">My App</h1>
      </nav>
    </>
  );
};

export default Navbar;
