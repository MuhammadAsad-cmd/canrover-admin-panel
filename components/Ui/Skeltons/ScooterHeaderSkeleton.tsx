import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ScooterHeaderSkeleton = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Scooter Details for IMEI: <Skeleton width={180} />
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Name</p>
          <Skeleton width={100} height={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Model</p>
          <Skeleton width={80} height={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <Skeleton width={60} height={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <Skeleton width={150} height={20} />
        </div>
      </div>

      {/* Locks Section */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">Cable Lock</p>
          <Skeleton width={80} height={20} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">Helmet Lock</p>
          <Skeleton width={80} height={20} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">Battery Lock</p>
          <Skeleton width={80} height={20} />
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={40} />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={40} />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={40} />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={40} />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton height={40} />
        </div>
      </div>
    </div>
  );
};

export default ScooterHeaderSkeleton;
