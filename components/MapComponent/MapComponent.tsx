"use client";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  center: { lat: number; lng: number };
  path: { lat: number; lng: number }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, path }) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.SymbolPath
      ) {
        setGoogleLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
        >
          {googleLoaded && (
            <Marker
              position={center}
              title="Scooter Location"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE, // Ensures API is loaded
                scale: 12,
                fillColor: "#99CA3C",
                fillOpacity: 6,
                strokeWeight: 1,
              }}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
