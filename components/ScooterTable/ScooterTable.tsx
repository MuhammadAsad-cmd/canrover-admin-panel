"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MapComponent from "../MapComponent/MapComponent";
import ScootiesRows from "./ScootiesRows";
import ScooterDetailModal from "./ScooterDetailModal";

export interface ScooterData {
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
  online?: "Online" | "Offline";
}

const ScooterTable: React.FC = () => {
  const { imei } = useParams() as { imei: string };
  const scootersPerPage = 15;

  const [scooters, setScooters] = useState<ScooterData[]>([]);
  const [scooterDetails, setScooterDetails] = useState<ScooterData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState<ScooterData | null>(
    null
  );

  const fetchData = useCallback(async () => {
    try {
      if (!imei) {
        setError("Invalid IMEI parameter.");
        return;
      }

      // Fetch both header and table data concurrently
      const [headerResponse, tableResponse] = await Promise.all([
        api.get("/api/scooter/fetch", { params: { imei } }),
        api.get<{ data: ScooterData[] }>("/api/scooter/data", {
          params: { imei },
        }),
      ]);

      const headerData = headerResponse.data?.data;
      if (headerData && headerData.length > 0) {
        const scooter = headerData[0];
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
          online: scooter.online ? "Online" : "Offline",
        };
        setScooterDetails(formattedScooter);
      } else {
        setError("No header data available.");
      }

      setScooters(tableResponse.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch scooter details.");
    } finally {
      setLoading(false);
    }
  }, [imei]);

  useEffect(() => {
    fetchData();
  }, [imei, fetchData]);

  // Memoize total pages and displayed scooters for performance
  const totalPages = useMemo(
    () => Math.ceil(scooters.length / scootersPerPage),
    [scooters.length]
  );
  const displayedScooters = useMemo(() => {
    const start = (currentPage - 1) * scootersPerPage;
    return scooters.slice(start, start + scootersPerPage);
  }, [currentPage, scooters, scootersPerPage]);

  const handleViewLocation = useCallback(() => {
    if (scooterDetails && scooterDetails.latitude && scooterDetails.longitude) {
      setShowMap(true);
    }
  }, [scooterDetails]);

  const handleViewDetails = useCallback((scooter: ScooterData) => {
    setSelectedScooter(scooter);
  }, []);

  if (loading) return <LoadingSpinner message="Loading scooter details..." />;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!scooters.length)
    return <div className="text-center py-8">No data found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="bg-base-bg rounded-lg shadow-lg p-6 mb-6">
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
              {scooterDetails &&
              scooterDetails.latitude &&
              scooterDetails.longitude
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
            !scooterDetails.latitude ||
            !scooterDetails.longitude
          }
        >
          View Location on Map
        </button>
      </section>

      {/* Map Section */}
      {showMap && scooterDetails && (
        <section className="mb-6 flex justify-center">
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
        </section>
      )}

      {/* Table Section */}
      <section className="overflow-x-auto">
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
            {displayedScooters.map((scooter) => (
              <ScootiesRows
                key={scooter._id}
                data={scooter}
                onView={handleViewDetails}
              />
            ))}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal for Scooter Details */}
      {selectedScooter && (
        <ScooterDetailModal
          scooter={selectedScooter}
          headerDetails={scooterDetails}
          onClose={() => setSelectedScooter(null)}
        />
      )}
    </div>
  );
};

export default ScooterTable;
