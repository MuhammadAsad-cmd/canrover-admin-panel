"use client";
import React, { useState } from "react";
import Link from "next/link";
import { admins } from "@/data/user";
import UserRow from "../UsersTable/UserRow";
import Pagination from "../Ui/Pagination";
import AdminRows from "./AdminRows";

const AdminsPage: React.FC = () => {
  const adminsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  const displayedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-heading font-bold">Admins</h1>
        <Link
          href="/admins/new"
          className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md"
        >
          Create New Admin
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-table-header-bg text-heading">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedAdmins.map((admin: any) => (
              <AdminRows key={admin.id} {...admin} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminsPage;
