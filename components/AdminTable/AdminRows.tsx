"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AdminRowsProps {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
}

const AdminRows: React.FC<AdminRowsProps> = ({
  id,
  name,
  username,
  email,
  image,
}) => {
  return (
    <tr className="border-b border-border-default hover:bg-table-row-hover transition-colors">
      <td className="px-4 py-3">
        <div className="flex w-10 h-10 border-2 rounded-full border-primary-light items-center">
          <Image
            width={40}
            height={40}
            src={image}
            alt={name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </td>
      <td className="px-4 py-3 text-paragraph font-medium">{name}</td>
      <td className="px-4 py-3 text-paragraph">{username}</td>
      <td className="px-4 py-3 text-paragraph">{email}</td>
      <td className="px-4 py-3 text-center">
        <Link
          href={`/admins/${id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default AdminRows;
