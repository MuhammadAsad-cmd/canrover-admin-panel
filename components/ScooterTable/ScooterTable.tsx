"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Pagination from "../Ui/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MapComponent from "../MapComponent/MapComponent";
import ScooterDetailModal from "./ScooterDetailModal";
import ScooterHeader from "./ScooterHeader";
import ScooterHeaderSkeleton from "../Ui/Skeltons/ScooterHeaderSkeleton";
import ScooterTableSkeleton from "../Ui/Skeltons/ScooterTableSkeleton";
import UserRides from "../UsersDetailsPage/UserRides";
import UserReviews from "../UsersDetailsPage/UserReviews";
import { ScooterData } from "@/types/types";
import ScooterTableData from "./ScooterTableData";

const ITEMS_PER_PAGE = 10;
const SCOOTERS_PER_PAGE = 15;

const ScooterTable: React.FC = () => {
  const { imei } = useParams() as { imei: string };

  // State declarations
  const [scooters, setScooters] = useState<ScooterData[]>([]);
  const [scooterDetails, setScooterDetails] = useState<ScooterData | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(1);
  const [rides, setRides] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState<ScooterData | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<
    "lock" | "unlock" | "alarm" | null
  >(null);
  const [lastAction, setLastAction] = useState<
    "lock" | "unlock" | "alarm" | null
  >(null);

  // Pagination states for rides and reviews sections
  const [ridesPage, setRidesPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);

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

      // First, fetch header data and table data concurrently
      const [headerResponse, tableResponse] = await Promise.all([
        api.get("/api/scooter/fetch", { params: { imei } }),
        api.get<{
          data: ScooterData[];
          pagination: { totalPages: number; currentPage: number };
        }>("/api/scooter/data", {
          params: { imei, page: currentPage, limit: SCOOTERS_PER_PAGE },
        }),
      ]);

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
          setScooterDetails(formattedScooter);

          const sId = formattedScooter._id;
          // Now fetch rides and reviews concurrently using the scooter ID (sId)
          const [ridesResponse, reviewsResponse] = await Promise.all([
            api.get("/api/ride/fetch", { params: { sId } }),
            api.get("/api/ride/review/fetch", {
              params: { sId },
            }),
          ]);
          setRides(ridesResponse.data.data || []);
          setReviews(reviewsResponse.data.data || []);
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
  }, [imei, currentPage]);

  const handleAction = async (action: "lock" | "unlock" | "alarm") => {
    if (!scooterDetails) return;
    try {
      setButtonLoading(action);
      setLastAction(action);
      await api.post("/api/scooter/settings", {
        imei: scooterDetails.imei,
        action,
      });
      setSuccessMessage(`Scooter ${action}ed successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
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

  // Pagination logic for rides
  const totalRides = rides.length;
  const totalRidesPages = Math.ceil(totalRides / ITEMS_PER_PAGE);
  const ridesStartIndex = (ridesPage - 1) * ITEMS_PER_PAGE;
  const ridesPaginated = rides.slice(
    ridesStartIndex,
    ridesStartIndex + ITEMS_PER_PAGE
  );

  // Pagination logic for reviews
  const totalReviews = reviews.length;
  const totalReviewsPages = Math.ceil(totalReviews / ITEMS_PER_PAGE);
  const reviewsStartIndex = (reviewsPage - 1) * ITEMS_PER_PAGE;
  const reviewsPaginated = reviews.slice(
    reviewsStartIndex,
    reviewsStartIndex + ITEMS_PER_PAGE
  );

  // Conditional rendering for loading, error, and no-data states
  if (loading && !scooterDetails) {
    return <LoadingSpinner message="Loading scooter details..." />;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

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

      {/* Scooter Table Section */}
      {tableLoading ? (
        <ScooterTableSkeleton />
      ) : (
        <section className="overflow-x-auto">
          <ScooterTableData
            scooters={scooters}
            handleViewDetails={handleViewDetails}
          />
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Scooter Rides Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Scooter Rides</h2>
        <UserRides rides={ridesPaginated} />
        {totalRides > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={ridesPage}
            totalPages={totalRidesPages}
            onPageChange={setRidesPage}
          />
        )}
      </section>

      {/* Scooter Reviews Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Scooter Reviews</h2>
        <UserReviews reviews={reviewsPaginated} />
        {totalReviews > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={reviewsPage}
            totalPages={totalReviewsPages}
            onPageChange={setReviewsPage}
          />
        )}
      </section>

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
