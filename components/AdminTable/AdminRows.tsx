"use client";
import React from "react";
import Link from "next/link";

const AdminRows = ({ admin }: { admin: any }) => {
  return (
    <tr className="border-b border-border-default hover:bg-table-row-hover transition-colors">
      <td className="px-4 py-3 text-paragraph font-medium">
        {" "}
        {admin?.name || "Unknown"}
      </td>
      <td className="px-4 py-3 text-paragraph">{admin?.email || "no email"}</td>
      <td className="px-4 py-3">
        <Link
          href={`/admins/${admin?._id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default AdminRows;
