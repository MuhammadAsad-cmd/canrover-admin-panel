import { useEffect } from "react";
import { ScooterData } from "@/types/types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ScooterHeaderProps {
  scooterDetails: ScooterData | null;
  onAction: (action: "lock" | "unlock" | "alarm") => void;
  actionLoading: boolean;
  buttonLoading: "lock" | "unlock" | "alarm" | null;
  successMessage: string;
  lastAction?: "lock" | "unlock" | "alarm" | null;
  onViewLocation: () => void;
  handleRefresh: () => void;
  refreshing: boolean;
}

const ScooterHeader: React.FC<ScooterHeaderProps> = ({
  scooterDetails,
  onAction,
  buttonLoading,
  successMessage,
  lastAction,
  onViewLocation,
  handleRefresh,
  refreshing,
}) => {
  useEffect(() => {
    if (successMessage) {
      // Determine background color based on lastAction:
      const toastBgColor =
        lastAction === "lock"
          ? "#22c55e" // Tailwind bg-green-500 (approx)
          : lastAction === "unlock"
          ? "#facc15" // Tailwind bg-yellow-500 (approx)
          : lastAction === "alarm"
          ? "#ef4444" // Tailwind bg-red-500 (approx)
          : "#22c55e";

      toast.success(successMessage, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        draggable: true,
        style: { background: "#99CA3C", color: "white" },
      });
    }
  }, [successMessage, lastAction]);

  if (!scooterDetails) return <div>No scooter details available.</div>;

  return (
    <section className="bg-base-bg rounded-lg shadow-lg p-6 mb-6 relative">
      {/* Include ToastContainer (can be placed globally as well) */}
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-heading">
        Scooter Details for IMEI: {scooterDetails.imei}
      </h2>

      <div className="space-y-6">
        {/* First Row - Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-heading">{scooterDetails.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Model</p>
            <p className="font-medium text-heading">{scooterDetails.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Battery</p>
            <p className={`font-medium `}> {scooterDetails.battery}%</p>
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
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {scooterDetails?.helmetLock ? "Locked" : "Unlocked"}
              </span>
            </div>
          ))}
        </div>

        {/* Third Row - Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={onViewLocation}
            className="bg-primary cursor-pointer hover:bg-primary-hover text-white font-medium py-2 px-2 rounded-lg"
            disabled={!scooterDetails.latitude || !scooterDetails.longitude}
          >
            View Location on Map
          </button>
          {["lock", "unlock", "alarm"].map((action) => (
            <button
              key={action}
              onClick={() => onAction(action as "lock" | "unlock" | "alarm")}
              className={`w-full py-2 px-3 ${
                action === "lock"
                  ? "bg-green-500"
                  : action === "unlock"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              } text-white rounded-lg flex items-center justify-center`}
            >
              {buttonLoading === action ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                action.charAt(0).toUpperCase() + action.slice(1)
              )}
            </button>
          ))}

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="w-full py-2 px-3 bg-blue-500 text-white rounded-lg flex items-center justify-center"
          >
            {refreshing ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScooterHeader;
