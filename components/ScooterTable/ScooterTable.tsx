"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import ScootiesRows from "./ScootiesRows";
import MapComponent from "../MapComponent/MapComponent";

interface ScooterData {
  _id: string;
  imei: string;
  code: string;
  raw: string;
  battery: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  model?: string;
  online?: "Online" | "Offline"; // Corrected status type
}

const ScooterTable: React.FC = () => {
  const scootiessPerPage = 15;
  const params = useParams();
  const imei = params.imei as string;

  const [scooty, setScooty] = useState<ScooterData[]>([]);
  const [scooterDetails, setScooterDetails] = useState<ScooterData | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMap, setShowMap] = useState<boolean>(false);

  useEffect(() => {
    const fetchHeaderData = async (): Promise<void> => {
      try {
        const response = await api.get<{ data: any }>("/api/scooter/fetch", {
          params: { imei },
        });

        if (response.data && response.data.data) {
          // Access the first element of the data array
          const scooter = response.data.data[0]; // [!code ++]

          // Convert API response to match ScooterData interface
          const formattedScooter: ScooterData = {
            _id: scooter._id,
            imei: scooter.imei,
            code: scooter.code || "N/A",
            raw: scooter.raw || "N/A",
            battery: scooter.battery || 0,
            latitude: scooter.latitude || 0,
            longitude: scooter.longitude || 0,
            createdAt: scooter.createdAt,
            updatedAt: scooter.updatedAt,
            name: scooter.name || "N/A",
            model: scooter.model || "N/A",
            online: scooter.online ? "Online" : "Offline", // Correct status conversion
          };

          setScooterDetails(formattedScooter);
          // In your ScooterTable component
          console.log(
            "Map coordinates:",
            scooterDetails?.latitude,
            scooterDetails?.longitude
          );
        } else {
          setError("No header data available.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch scooter header details.");
      }
    };

    const fetchTableData = async (): Promise<void> => {
      try {
        const response = await api.get<{ data: ScooterData[] }>(
          "/api/scooter/data",
          {
            params: { imei },
          }
        );
        setScooty(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch scooter table details.");
      }
    };

    Promise.all([fetchHeaderData(), fetchTableData()]).finally(() =>
      setLoading(false)
    );
  }, [imei]);

  const totalPages: number = Math.ceil(scooty.length / scootiessPerPage);
  const displayedScooties: ScooterData[] = scooty.slice(
    (currentPage - 1) * scootiessPerPage,
    currentPage * scootiessPerPage
  );

  const handleViewLocation = (): void => {
    if (
      scooterDetails &&
      scooterDetails.latitude !== 0 &&
      scooterDetails.longitude !== 0
    ) {
      setShowMap(true);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading scooter details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!scooty || scooty.length === 0) {
    return <div className="text-center py-8">No data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-base-bg rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-heading">
          Scooter Details for IMEI: {imei}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-heading">{scooterDetails?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Model</p>
            <p className="font-medium text-heading">{scooterDetails?.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p
              className={`font-medium ${
                scooterDetails?.online === "Online"
                  ? "text-success"
                  : "text-paragraph"
              }`}
            >
              {scooterDetails?.online}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium text-heading">
              {scooterDetails?.latitude && scooterDetails?.longitude
                ? `${scooterDetails.latitude.toFixed(
                    4
                  )}, ${scooterDetails.longitude.toFixed(4)}`
                : "N/A"}
            </p>
          </div>
        </div>
        <button
          onClick={handleViewLocation}
          className="mt-4 bg-primary cursor-pointer hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg"
          disabled={
            !scooterDetails ||
            scooterDetails.latitude === 0 ||
            scooterDetails.longitude === 0
          }
        >
          View Location on Map
        </button>
      </div>

      {showMap && scooterDetails && (
        <div className="mb-6 flex justify-center">
          {scooterDetails.latitude && scooterDetails.longitude ? (
            <MapComponent
              center={{
                lat: scooterDetails.latitude,
                lng: scooterDetails.longitude,
              }}
              path={[]}
            />
          ) : (
            <div className="text-red-500">Invalid coordinates</div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-table-header-bg text-left text-heading">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Battery</th>
              <th className="px-4 py-2">IMEI</th>
              <th className="px-4 py-2">Longitude</th>
              <th className="px-4 py-2">Latitude</th>
              {/* <th className="px-4 py-2">Raw Data</th> */}
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {displayedScooties.map((data) => (
              <ScootiesRows key={data._id} data={data} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ScooterTable;
