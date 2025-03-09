"use client";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  center: { lat: number; lng: number };
  path: { lat: number; lng: number }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, path }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleAvailable, setGoogleAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setGoogleAvailable(true);
        setMapLoaded(true);
        clearInterval(interval); // Stop checking once Google Maps is available
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Function to get marker icon safely
  const getMarkerIcon = () => {
    if (googleAvailable) {
      return {
        url: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
        scaledSize: new window.google.maps.Size(40, 40), // Only use when Google Maps is ready
      };
    }
    return undefined;
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        >
          {mapLoaded && googleAvailable && (
            <Marker
              position={center}
              title="Scooter Location"
              icon={getMarkerIcon()}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
