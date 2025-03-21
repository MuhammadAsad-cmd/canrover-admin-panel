import React from "react";
import ScootiesRows from "./ScootiesRows";
import { ScooterData } from "@/types/types";

interface ScooterDataProps {
  scooters: ScooterData[];
  handleViewDetails: (scooter: ScooterData) => void;
}

const ScooterTableData: React.FC<ScooterDataProps> = ({
  scooters,
  handleViewDetails,
}) => {
  return (
    <table className="w-full bg-white shadow-md rounded-lg">
      <thead className="bg-table-header-bg text-left text-heading">
        <tr>
          <th className="px-4 py-2">Code</th>
          <th className="px-4 py-2">Battery</th>
          <th className="px-4 py-2">IMEI</th>
          <th className="px-4 py-2">Longitude</th>
          <th className="px-4 py-2">Latitude</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {scooters.map((scooter) => (
          <ScootiesRows
            key={scooter._id}
            data={scooter}
            onView={handleViewDetails}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ScooterTableData;
