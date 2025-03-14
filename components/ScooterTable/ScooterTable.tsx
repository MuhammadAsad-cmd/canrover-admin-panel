"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MapComponent from "../MapComponent/MapComponent";
import ScootiesRows from "./ScootiesRows";
import ScooterDetailModal from "./ScooterDetailModal";
import ScooterHeader from "./ScooterHeader";
import { ScooterData } from "@/types/types";
import ScooterHeaderSkeleton from "../Ui/Skeltons/ScooterHeaderSkeleton";
import ScooterTableSkeleton from "../Ui/Skeltons/ScooterTableSkeleton";

const ScooterTable: React.FC = () => {
  const { imei } = useParams() as { imei: string };
  const scootersPerPage = 15;
  const [scooters, setScooters] = useState<ScooterData[]>([]);
  const [scooterDetails, setScooterDetails] = useState<ScooterData | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(1);
  // "loading" now only represents a full-page load (initial load)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState<ScooterData | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // "refreshing" for header skeleton on refresh action
  const [refreshing, setRefreshing] = useState(false);
  // "tableLoading" for table skeleton on pagination or refresh
  const [tableLoading, setTableLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<
    "lock" | "unlock" | "alarm" | null
  >(null);
  const [lastAction, setLastAction] = useState<
    "lock" | "unlock" | "alarm" | null
  >(null);

  const fetchData = async (options?: { headerSkeleton?: boolean }) => {
    try {
      if (currentPage === 1 && !scooterDetails && !options?.headerSkeleton) {
        setLoading(true);
      } else {
        if (options?.headerSkeleton) {
          setRefreshing(true);
        }
        setTableLoading(true);
      }

      const [headerResponse, tableResponse] = await Promise.all([
        api.get("/api/scooter/fetch", { params: { imei } }),
        api.get<{
          data: ScooterData[];
          pagination: { totalPages: number; currentPage: number };
        }>("/api/scooter/data", {
          params: { imei, page: currentPage, limit: 15 },
        }),
      ]);

      // Process header data (only on initial load)
      if (headerResponse.status === 200) {
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
            helmetLock: scooter.helmetLock,
            cableLock: scooter.cableLock,
            batteryLock: scooter.batteryLock,
          };
          console.log(formattedScooter);
          setScooterDetails(formattedScooter);
        } else {
          setError("No header data available.");
        }
        setScooters(tableResponse.data.data);
        setTotalPages(tableResponse.data.pagination.totalPages);
      }
    } catch (err) {
      setError("Failed to fetch scooter details.");
    } finally {
      setLoading(false);
      setTableLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [imei]);

  // API call to perform lock, unlock, and alarm actions
  const handleAction = async (action: "lock" | "unlock" | "alarm") => {
    if (!scooterDetails) return;

    try {
      setButtonLoading(action);
      setLastAction(action);
      // Call the action API first
      await api.post("/api/scooter/settings", {
        imei: scooterDetails.imei,
        action,
      });
      setSuccessMessage(`Scooter ${action}ed successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
      // Now refresh the data with header skeleton enabled
      await fetchData({ headerSkeleton: true });
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    } finally {
      setButtonLoading(null);
    }
  };

  const handleViewDetails = (scooter: ScooterData) => {
    setSelectedScooter(scooter);
  };

  // Show the full-page spinner only when there's no header data yet
  if (loading && !scooterDetails) {
    return <LoadingSpinner message="Loading scooter details..." />;
  }
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!scooters.length)
    return <div className="text-center py-8">No data found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {refreshing ? (
        <ScooterHeaderSkeleton />
      ) : (
        <ScooterHeader
          scooterDetails={scooterDetails}
          onAction={handleAction}
          actionLoading={actionLoading}
          successMessage={successMessage}
          onViewLocation={() => setShowMap(true)}
          handleRefresh={() => fetchData({ headerSkeleton: true })}
          refreshing={refreshing}
          buttonLoading={buttonLoading}
          lastAction={lastAction}
        />
      )}

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
      {tableLoading ? (
        <ScooterTableSkeleton />
      ) : (
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
              {scooters.map((scooter) => (
                <ScootiesRows
                  key={scooter._id}
                  data={scooter}
                  onView={handleViewDetails}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
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
