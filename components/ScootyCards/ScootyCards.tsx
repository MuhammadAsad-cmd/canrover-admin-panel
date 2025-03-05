"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Scooty = {
  id: string;
  name: string;
  image: string;
  status: "Online" | "Offline";
  location: string;
  battery: number;
  imei: string;
  model: string;
  latitude: number;
  longitude: number;
};

export default function ScootyCards() {
  const router = useRouter();
  const [scooties, setScooties] = useState<Scooty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchScooties = async () => {
      try {
        const response = await api.get("/api/scooter/fetch"); // Fetch scooters
        const data = response.data.data;

        // Transform the API data into the Scooty type
        const formattedScooties = data.map((scooter: any) => ({
          id: scooter._id,
          name: scooter.name,
          image: "/images/sccoty.jpg", // Default image (you can customize this)
          status: scooter.online ? "Online" : "Offline",
          location: `${scooter.latitude},${scooter.longitude}`,
          battery: scooter.battery,
          imei: scooter.imei,
          model: scooter.model,
          latitude: scooter.latitude,
          longitude: scooter.longitude,
        }));

        setScooties(formattedScooties);
      } catch (err) {
        setError("Failed to fetch scooters");
      } finally {
        setLoading(false);
      }
    };

    fetchScooties();
  }, []);

  const handleViewDetails = (imei: string) => {
    router.push(`/scooters/${imei}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading scooties..." />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6 text-center text-heading">
          Available Scooties
        </h2>
        <Link
          href="/scooters/new"
          className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md"
        >
          Add New Scooter
        </Link>
      </div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scooties.map(
          ({
            id,
            name,
            image,
            status,
            battery,
            imei,
            model,
            latitude,
            longitude,
          }) => (
            <div
              key={id}
              className="shadow-lg rounded-xl overflow-hidden border border-border-default bg-base-bg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="relative">
                <Image
                  src={image}
                  alt={name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-white text-sm font-semibold rounded-full ${
                    status === "Online" ? "bg-success" : "bg-paragraph"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-darkGray">{name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Model:</strong> {model}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>IMEI:</strong> {imei}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Battery:</strong> {battery}%
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {latitude.toFixed(4)},{" "}
                  {longitude.toFixed(4)}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg"
                    onClick={() => handleViewDetails(imei)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
