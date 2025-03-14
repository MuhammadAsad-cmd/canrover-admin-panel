"use client";
import { ScooterData } from "@/types/types";
import React from "react";

interface ScootiesRowsProps {
  data: ScooterData;
  onView: (scooter: ScooterData) => void;
}

const ScootiesRows: React.FC<ScootiesRowsProps> = ({ data, onView }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <tr className="border-b border-border-default hover:bg-table-row-hover transition-colors">
      <td className="px-4 py-3 font-medium">{data.code || "N/A"}</td>
      <td className="px-4 py-3">{data.battery}%</td>
      <td className="px-4 py-3">{data.imei || "N/A"}</td>
      <td className="px-4 py-3">
        {data.longitude !== undefined ? data.longitude.toFixed(4) : "N/A"}
      </td>
      <td className="px-4 py-3">
        {data.latitude !== undefined ? data.latitude.toFixed(4) : "N/A"}
      </td>
      <td className="px-4 py-3">
        {" "}
        {new Date(data.createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onView(data)}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-hover"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default ScootiesRows;
