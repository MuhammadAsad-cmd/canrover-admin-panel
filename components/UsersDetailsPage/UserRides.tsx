import React from "react";

interface Ride {
  _id: string;
  scooter: string;
  status: string;
  pick: { lat: number; long: number };
  drop: { lat: number; long: number };
  pickAt: string;
  dropAt: string;
}

interface UserRidesProps {
  rides: Ride[];
}

const UserRides: React.FC<UserRidesProps> = ({ rides }) => {
  if (!rides.length)
    return <p className="text-gray-500 mt-8">No ride details available.</p>;

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
                {ride.pick.lat}, {ride.pick.long}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {ride.drop.lat}, {ride.drop.long}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {new Date(ride.pickAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {new Date(ride.dropAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRides;
