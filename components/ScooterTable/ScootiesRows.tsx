import Link from "next/link";
import React from "react";

const ScootiesRows = ({ data }: { data: any }) => {
  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  return (
    <tr className="border-b border-border-default hover:bg-table-row-hover transition-colors">
      <td className="px-4 py-3 text-paragraph font-medium">
        {data?.code || "N/A"}
      </td>
      <td className="px-4 py-3 text-paragraph">{data?.battery}%</td>
      <td className="px-4 py-3 text-paragraph">{data?.imei || "N/A"}</td>
      <td className="px-4 py-3 text-paragraph">
        {data?.longitude !== undefined ? data.longitude.toFixed(4) : "N/A"}
      </td>
      <td className="px-4 py-3 text-paragraph">
        {data?.latitude !== undefined ? data.latitude.toFixed(4) : "N/A"}
      </td>
      {/* <td className="px-4 py-3 text-paragraph max-w-[150px] truncate">
        {data?.raw || "N/A"}
      </td> */}
      <td className="px-4 py-3 text-paragraph">
        {formatDate(data?.createdAt)}
      </td>
    </tr>
  );
};

export default ScootiesRows;
