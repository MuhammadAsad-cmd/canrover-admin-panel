"use client";
import React from "react";
import {
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaBatteryHalf,
  FaMotorcycle,
  FaUser,
  FaLock,
  FaUnlock,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { format, formatDistanceToNow } from "date-fns";
import { ReviewCardProps } from "@/types/types";

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, scooter, ride, rating, review: reviewText, createdAt } = review;

  const formatLocalDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy h:mm a");
    } catch {
      return "N/A";
    }
  };

  const BatteryIndicator = ({ percentage }: { percentage: number }) => (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1.5 bg-gray-100 rounded-full">
        <div
          className={`h-full rounded-full ${
            percentage <= 20
              ? "bg-red-400"
              : percentage <= 50
              ? "bg-yellow-400"
              : "bg-green-400"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{percentage}%</span>
    </div>
  );

  const getStatusBadge = (status: string) => (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        status === "completed"
          ? "bg-green-100 text-green-700"
          : status === "ongoing"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );

  const LockIndicator = ({ locked }: { locked: boolean }) => (
    <span className="text-xs">
      {locked ? (
        <FaLock className="text-green-500" />
      ) : (
        <FaUnlock className="text-red-500" />
      )}
    </span>
  );

  const OnlineIndicator = ({ online }: { online: boolean }) => (
    <span className="flex items-center gap-1 text-xs">
      {online ? (
        <>
          <FaCheckCircle className="text-green-500" />
          <span>Online</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-red-500" />
          <span>Offline</span>
        </>
      )}
    </span>
  );

  return (
    <div className="group bg-white rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-all shadow-sm hover:shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              {user?.name?.[0]?.toUpperCase() || <FaUser className="w-4 h-4" />}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {user?.name || "Anonymous User"}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex text-amber-400 text-xs">
                {[...Array(5)].map((_, i) =>
                  i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </div>
              <span className="text-xs text-gray-500">
                {formatLocalDateTime(createdAt)}
              </span>
            </div>
          </div>
        </div>
        {getStatusBadge(ride?.status || "")}
      </div>

      {/* User Contact Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate">{user?.email || "No email"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <FaPhone className="w-3.5 h-3.5 text-gray-400" />
          <span>{user?.phone || "No phone"}</span>
        </div>
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">
          {reviewText}
        </p>
      )}

      {/* Scooter Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <FaMotorcycle className="w-3.5 h-3.5 text-gray-400" />
          <div>
            <div className="text-[11px] text-gray-400">Model</div>
            <div>{scooter?.model || "Unknown"}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-600">
          <FaBatteryHalf className="w-3.5 h-3.5 text-gray-400" />
          <div>
            <div className="text-[11px] text-gray-400">Battery</div>
            <BatteryIndicator percentage={scooter?.battery || 0} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-600">
          <div>
            <div className="text-[11px] text-gray-400">Status</div>
            <OnlineIndicator online={scooter?.online} />
          </div>
        </div>
      </div>

      {/* Scooter Locks */}
      {scooter && (
        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <div>
              <div className="text-[11px] text-gray-400">Helmet Lock</div>
              <div className="flex items-center gap-1">
                <LockIndicator locked={scooter?.helmetLock} />
                <span className="text-xs">
                  {scooter?.helmetLock ? "Locked" : "Unlocked"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <div>
              <div className="text-[11px] text-gray-400">Battery Lock</div>
              <div className="flex items-center gap-1">
                <LockIndicator locked={scooter?.batteryLock} />
                <span className="text-xs">
                  {scooter?.batteryLock ? "Locked" : "Unlocked"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <div>
              <div className="text-[11px] text-gray-400">Cable Lock</div>
              <div className="flex items-center gap-1">
                <LockIndicator locked={scooter?.cableLock} />
                <span className="text-xs">
                  {scooter?.cableLock ? "Locked" : "Unlocked"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ride Details - Only show if ride data exists */}
      {ride && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Pickup Details - Only show if pick data exists */}
          {ride.pick && (
            <div className="bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium">Pickup</span>
              </div>
              <div className="pl-5 space-y-1">
                <div>
                  <span className="text-gray-400 text-[11px]">Location: </span>
                  <span>
                    {`${parseFloat(ride.pick.lat).toFixed(4)}, ${parseFloat(
                      ride.pick.long
                    ).toFixed(4)}`}
                  </span>
                </div>
                {ride.pickAt && (
                  <div>
                    <span className="text-gray-400 text-[11px]">Time: </span>
                    <span>{formatLocalDateTime(ride.pickAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dropoff Details - Only show if drop data exists */}
          {ride.drop && (
            <div className="bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-green-400" />
                <span className="font-medium">Dropoff</span>
              </div>
              <div className="pl-5 space-y-1">
                <div>
                  <span className="text-gray-400 text-[11px]">Location: </span>
                  <span>
                    {`${parseFloat(ride.drop.lat).toFixed(4)}, ${parseFloat(
                      ride.drop.long
                    ).toFixed(4)}`}
                  </span>
                </div>
                {ride.dropAt && (
                  <div>
                    <span className="text-gray-400 text-[11px]">Time: </span>
                    <span>{formatLocalDateTime(ride.dropAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>IMEI: {scooter?.imei || "N/A"}</span>
        <span>Reviewed {formatDistanceToNow(new Date(createdAt))} ago</span>
      </div>
    </div>
  );
};

export default ReviewCard;

// "use client";
// import { Review } from "@/types/types";
// import Image from "next/image";
// import React from "react";
// import { FaStar, FaRegStar } from "react-icons/fa";

// interface ReviewRowProps {
//   review: Review;
// }

// const ReviewRow: React.FC<ReviewRowProps> = ({ review }) => {
//   const { user, scooter, ride, review: reviewText, rating } = review;

//   // Render star rating
//   const renderStars = (stars: number) =>
//     [...Array(5)].map((_, i) =>
//       i < stars ? (
//         <FaStar key={i} className="text-yellow-500 inline-block mr-0.5" />
//       ) : (
//         <FaRegStar key={i} className="text-gray-400 inline-block mr-0.5" />
//       )
//     );

//   // Determine ride status color
//   const getStatusClasses = (status?: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500";
//       case "ongoing":
//         return "bg-yellow-500";
//       default:
//         return "bg-red-500";
//     }
//   };

//   return (
//     <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//       <td className="px-4 py-3">
//         <div className="flex w-10 h-10 border-2 rounded-full border-primary-light items-center overflow-hidden">
//           <Image
//             width={40}
//             height={40}
//             src={user?.image || "/images/dummy.jpg"}
//             alt={user?.name || "User Image"}
//             className="rounded-full w-full h-full object-cover"
//           />
//         </div>
//       </td>

//       {/* User Name */}
//       <td className="px-4 py-3 font-medium">{user?.name || "Unknown"}</td>

//       {/* Email */}
//       <td className="px-4 py-3">{user?.email || "No Email"}</td>

//       {/* Scooter Model */}
//       <td className="px-4 py-3">{scooter?.model || "N/A"}</td>

//       {/* Battery */}
//       <td className="px-4 py-3">
//         {scooter?.battery != null ? `${scooter.battery}%` : "N/A"}
//       </td>

//       {/* Ride Status */}
//       <td className="px-4 py-3">
//         <span
//           className={`px-2 py-1 rounded text-white text-sm ${getStatusClasses(
//             ride?.status
//           )}`}
//         >
//           {ride?.status || "N/A"}
//         </span>
//       </td>

//       {/* Pickup */}
//       <td className="px-4 py-3">
//         {ride?.pick ? `${ride.pick.lat}, ${ride.pick.long}` : "N/A"}
//       </td>

//       {/* Drop */}
//       <td className="px-4 py-3">
//         {ride?.drop ? `${ride.drop.lat}, ${ride.drop.long}` : "N/A"}
//       </td>

//       {/* Rating (Stars) */}
//       <td className="px-4 py-3 whitespace-nowrap">{renderStars(rating)}</td>

//       {/* Review Text */}
//       <td className="px-4 py-3 ">{reviewText || "No Review"}</td>
//     </tr>
//   );
// };

// export default ReviewRow;
