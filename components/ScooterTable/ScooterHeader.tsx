import { useEffect, useState } from "react";
import { ScooterData } from "@/types/types";

interface ScooterHeaderProps {
  scooterDetails: ScooterData | null;
  onAction: (action: "lock" | "unlock" | "alarm") => void;
  actionLoading: boolean;
  successMessage: string;
  onViewLocation: () => void;
}

const ScooterHeader: React.FC<ScooterHeaderProps> = ({
  scooterDetails,
  onAction,
  actionLoading,
  successMessage,
  onViewLocation,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success message smoothly and hide after 3 seconds
  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (!scooterDetails) return <div>No scooter details available.</div>;

  return (
    <section className="bg-base-bg rounded-lg shadow-lg p-6 mb-6 relative">
      {/* Success Message with Smooth Slide Down and Hide Effect */}
      {showSuccess && (
        <div
          className={`fixed left-1/2 top-0 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-md 
      transition-all duration-500 ease-in-out ${
        showSuccess
          ? "translate-y-[78px] opacity-100"
          : "translate-y-0 opacity-0"
      }`}
        >
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-heading">
        Scooter Details for IMEI: {scooterDetails.imei}
      </h2>

      <div className="space-y-6">
        {/* First Row - Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-heading">{scooterDetails.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Model</p>
            <p className="font-medium text-heading">{scooterDetails.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p
              className={`font-medium ${
                scooterDetails.online === "Online"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {scooterDetails.online}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium text-heading">
              {scooterDetails.latitude && scooterDetails.longitude
                ? `${scooterDetails.latitude.toFixed(
                    4
                  )}, ${scooterDetails.longitude.toFixed(4)}`
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Second Row - Locks Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: "cableLock", label: "Cable Lock" },
            { key: "helmetLock", label: "Helmet Lock" },
            { key: "batteryLock", label: "Battery Lock" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <p className="text-sm text-gray-600">{label}:</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  scooterDetails?.[key as keyof ScooterData]
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {scooterDetails?.[key as keyof ScooterData]
                  ? "Locked"
                  : "Unlocked"}
              </span>
            </div>
          ))}
        </div>

        {/* Third Row - Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={onViewLocation}
            className="bg-primary cursor-pointer hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg"
            disabled={!scooterDetails.latitude || !scooterDetails.longitude}
          >
            View Location on Map
          </button>
          <button
            disabled={actionLoading}
            onClick={() => onAction("lock")}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg"
          >
            Lock
          </button>
          <button
            disabled={actionLoading}
            onClick={() => onAction("unlock")}
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg"
          >
            Unlock
          </button>
          <button
            disabled={actionLoading}
            onClick={() => onAction("alarm")}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg"
          >
            Alarm
          </button>
          {/* <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg">
            Refresh
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default ScooterHeader;
