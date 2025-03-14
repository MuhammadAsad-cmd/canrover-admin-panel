import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ScooterTableSkeleton = () => {
  return (
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
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">
                <Skeleton width={40} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={50} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={120} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={80} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={80} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={150} />
              </td>
              <td className="px-4 py-3">
                <Skeleton width={60} height={30} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ScooterTableSkeleton;
