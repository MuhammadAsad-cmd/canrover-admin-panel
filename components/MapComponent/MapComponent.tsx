"use client";
import React, { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface MapComponentProps {
  center: { lat: number; lng: number };
  path: { lat: number; lng: number }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, path }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  if (loadError) {
    return (
      <div className="text-red-500">
        Error loading Google Maps. Please check your API key, DNS, or network
        connection.
      </div>
    );
  }

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      onLoad={() => setMapLoaded(true)}
      onError={() => setLoadError(true)}
    >
      <div style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
        >
          {mapLoaded && (
            <Marker
              position={center}
              title="Scooter Location"
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;

// "use client";
// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// interface MapComponentProps {
//   center: { lat: number; lng: number };
//   path: { lat: number; lng: number }[];
// }

// const MapComponent: React.FC<MapComponentProps> = ({ center, path }) => {
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [loadError, setLoadError] = useState(false);

//   // Helper to safely access the Marker icon using the Google Maps API
//   const getMarkerIcon = () => {
//     if (
//       typeof window !== "undefined" &&
//       window.google &&
//       window.google.maps &&
//       window.google.maps.SymbolPath
//     ) {
//       return {
//         path: window.google.maps.SymbolPath.CIRCLE,
//         scale: 8,
//         fillColor: "#4285F4",
//         fillOpacity: 1,
//         strokeWeight: 2,
//       };
//     }
//     return undefined;
//   };

//   if (loadError) {
//     return (
//       <div className="text-red-500">
//         Error loading Google Maps. Please check your API key, DNS, or network
//         connection.
//       </div>
//     );
//   }

//   return (
//     <LoadScript
//       googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
//       libraries={["geometry"]}
//       loadingElement={<div>Loading Maps...</div>}
//       onError={(error) => {
//         console.error("Google Maps loading error:", error);
//         setLoadError(true);
//       }}
//     >
//       <GoogleMap
//         mapContainerStyle={{
//           height: "400px",
//           width: "100%",
//           borderRadius: "8px",
//         }}
//         center={center}
//         zoom={15}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: false,
//         }}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {mapLoaded && (
//           <Marker
//             position={center}
//             title="Scooter Location"
//             icon={getMarkerIcon()}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
