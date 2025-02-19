"use client";
import Image from "next/image";

type Scooty = {
  id: number;
  name: string;
  image: string;
  status: "Online" | "Offline";
  location: string;
};

const scooties: Scooty[] = [
  {
    id: 1,
    name: "Scooty A",
    image: "/images/sccoty.jpg",
    status: "Online",
    location: "28.7041,77.1025",
  },
  {
    id: 2,
    name: "Scooty B",
    image: "/images/sccoty.jpg",
    status: "Offline",
    location: "28.5355,77.3910",
  },
  {
    id: 3,
    name: "Scooty C",
    image: "/images/sccoty.jpg",
    status: "Online",
    location: "19.0760,72.8777",
  },
  {
    id: 4,
    name: "Scooty D",
    image: "/images/sccoty.jpg",
    status: "Offline",
    location: "13.0827,80.2707",
  },
];

export default function ScootyCards() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-heading">
        Available Scooties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scooties.map(({ id, name, image, status, location }) => (
          <div
            key={id}
            className="shadow-lg rounded-xl overflow-hidden border border-border-default bg-base-bg"
          >
            <Image
              src={image}
              alt={name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-darkGray">{name}</h3>
              <span
                className={`mt-2 inline-block px-3 py-1 text-white text-sm font-semibold rounded-full ${
                  status === "Online" ? "bg-success" : "bg-paragraph"
                }`}
              >
                {status}
              </span>
              <button
                className="mt-4 w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${location}`,
                    "_blank"
                  )
                }
              >
                View Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
