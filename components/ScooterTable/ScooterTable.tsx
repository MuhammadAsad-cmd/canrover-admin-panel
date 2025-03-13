"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MapComponent from "../MapComponent/MapComponent";
import ScootiesRows from "./ScootiesRows";
import ScooterDetailModal from "./ScooterDetailModal";
import ScooterHeader from "./ScooterHeader";
import { ScooterData } from "@/types/types";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

      console.log("API Response /scooter/fetch:", headerResponse.data);

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

  // API call to perform lock, unlock, and alarm actions
  const handleAction = async (action: "lock" | "unlock" | "alarm") => {
    if (!scooterDetails) return;

    try {
      setActionLoading(true);
      await api.post("/api/scooter/settings", {
        imei: scooterDetails.imei,
        action,
      });
      setSuccessMessage(`Scooter ${action}ed successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      await fetchData(); // Refresh the data after action
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    } finally {
      setActionLoading(false);
    }
  };

  const displayedScooters = useMemo(() => {
    const start = (currentPage - 1) * scootersPerPage;
    return scooters.slice(start, start + scootersPerPage);
  }, [currentPage, scooters, scootersPerPage]);

  const handleViewDetails = useCallback((scooter: ScooterData) => {
    setSelectedScooter(scooter);
  }, []);

  if (loading) return <LoadingSpinner message="Loading scooter details..." />;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!scooters.length)
    return <div className="text-center py-8">No data found.</div>;

  // Success message UI

  return (
    <div className="container mx-auto px-4 py-8">
      <ScooterHeader
        scooterDetails={scooterDetails}
        onAction={handleAction}
        actionLoading={actionLoading}
        successMessage={successMessage}
        onViewLocation={() => setShowMap(true)}
      />

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
