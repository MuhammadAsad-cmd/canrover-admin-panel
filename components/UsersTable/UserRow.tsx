import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserRow = ({ user }: { user: any }) => {
  if (!user) return null;

  return (
    <tr className="border-b border-border-default hover:bg-table-row-hover transition-colors">
      {/* User Image */}
      <td className="px-4 py-3">
        <div className="flex w-10 h-10 border-2 rounded-full border-primary-light items-center overflow-hidden">
          <Image
            width={40}
            height={40}
            src={user?.image || "/images/dummy.jpg"}
            alt={user?.name || "User Image"}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </td>

      {/* User Name */}
      <td className="px-4 py-3 text-paragraph font-medium">
        {user?.name || "Unknown"}
      </td>

      {/* User Email */}
      <td className="px-4 py-3 text-paragraph">{user?.email || "No Email"}</td>

      {/* User Phone */}
      <td className="px-4 py-3 text-paragraph">
        {user?.phone ? user.phone : "N/A"}
      </td>

      {/* User Account Type */}
      <td className="px-4 py-3 text-paragraph">
        {user?.accountType ? user.accountType : "N/A"}
      </td>

      {/* View Profile Button */}
      <td className="px-4 py-3 text-center">
        <Link
          // href={`/users/${user?._id || "#"}`}
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;
