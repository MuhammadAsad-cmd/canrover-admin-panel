"use client";
import React from "react";
import { ScooterData } from "./ScooterTable";
import {
  MdClose,
  MdLocationOn,
  MdMemory,
  MdBatteryFull,
  MdSignalCellularAlt,
  MdCalendarToday,
  MdCode,
  MdPhoneIphone,
} from "react-icons/md";
import { BsScooter } from "react-icons/bs";

interface ScooterDetailModalProps {
  scooter: ScooterData;
  headerDetails: ScooterData | null;
  onClose: () => void;
}

const ScooterDetailModal: React.FC<ScooterDetailModalProps> = ({
  scooter,
  onClose,
  headerDetails,
}) => {
  const getStatusColor = (status: string) => {
    return status.toLowerCase() === "online"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const batteryColor =
    scooter.battery >= 50
      ? "bg-green-500"
      : scooter.battery >= 20
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-[65%] max-h-[90vh] overflow-y-auto relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MdClose className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-6 space-y-6">
          <div className="border-b pb-4">
            {headerDetails && (
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BsScooter className="w-8 h-8 text-primary" />
                {headerDetails.name || "Unnamed Scooter"}
                <span
                  className={`ml-3 px-3 py-1 rounded-full text-sm ${getStatusColor(
                    headerDetails.online || "offline"
                  )}`}
                >
                  {headerDetails.online}
                </span>
              </h2>
            )}
            {headerDetails && (
              <p className="text-gray-500 mt-1">
                {headerDetails.model || "No model specified"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdMemory className="w-6 h-6 text-gray-400" />
                <h3 className="font-semibold text-gray-700">
                  Technical Details
                </h3>
              </div>
              <DetailItem label="IMEI" value={scooter.imei} />
              <DetailItem label="Code" value={scooter.code || "N/A"} />
              <DetailItem label="Raw Data" value={scooter.raw || "N/A"} />
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdLocationOn className="w-6 h-6 text-gray-400" />
                <h3 className="font-semibold text-gray-700">Location</h3>
              </div>
              <DetailItem
                label="Latitude"
                value={
                  scooter.latitude !== undefined
                    ? scooter.latitude.toFixed(4)
                    : "N/A"
                }
                // {scooter.latitude ? scooter.latitude.toFixed(6) : "N/A"}
              />
              <DetailItem
                label="Longitude"
                // value={scooter.longitude ? scooter.longitude.toFixed(6) : "N/A"}
                value={
                  scooter.longitude !== undefined
                    ? scooter.longitude.toFixed(4)
                    : "N/A"
                }
              />
              <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                <p className="text-sm text-gray-500">Map Preview (Static)</p>
              </div>
            </div>

            {/* Status Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdSignalCellularAlt className="w-6 h-6 text-gray-400" />
                <h3 className="font-semibold text-gray-700">Status</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Battery Level</span>
                  <span className="text-sm font-medium">
                    {scooter.battery}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${batteryColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${scooter.battery}%` }}
                  />
                </div>
              </div>
              {/* <DetailItem
                label="Last Update"
                value={new Date(scooter.updatedAt).toLocaleString()}
              /> */}
            </div>

            {/* System Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdCode className="w-6 h-6 text-gray-400" />
                <h3 className="font-semibold text-gray-700">System Info</h3>
              </div>
              <DetailItem
                label="Created At"
                value={new Date(scooter.createdAt).toLocaleString()}
              />
              <DetailItem
                label="Last Check-in"
                value={new Date(scooter.updatedAt).toLocaleTimeString()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-500">{label}:</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default ScooterDetailModal;
