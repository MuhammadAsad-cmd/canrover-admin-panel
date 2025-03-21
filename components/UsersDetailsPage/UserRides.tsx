import React from "react";

interface Ride {
  _id: string;
  scooter: string;
  status: string;
  pick?: { lat: number; long: number } | null;
  drop?: { lat: number; long: number } | null;
  pickAt: string;
  dropAt: string;
}

interface UserRidesProps {
  rides: Ride[];
}

const UserRides: React.FC<UserRidesProps> = ({ rides }) => {
  if (!rides.length) {
    return <p className="text-gray-500 mt-8">No ride details available.</p>;
  }

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Pick Location</th>
            <th className="px-4 py-2">Drop Location</th>
            <th className="px-4 py-2">Pick Time</th>
            <th className="px-4 py-2">Drop Time</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{ride.status}</td>
              <td className="px-4 whitespace-nowrap py-3">
                {ride.pick ? `${ride.pick.lat}, ${ride.pick.long}` : "N/A"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {ride.drop ? `${ride.drop.lat}, ${ride.drop.long}` : "N/A"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {ride.pickAt ? new Date(ride.pickAt).toLocaleString() : "N/A"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {ride.dropAt ? new Date(ride.dropAt).toLocaleString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRides;
