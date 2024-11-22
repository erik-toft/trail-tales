"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    []
  );

  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      setIsMapReady(true);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to TrailTales</h1>
      <div
        ref={mapRef}
        style={{
          position: "relative",
          height: "500px",
          backgroundColor: !isMapReady ? "#f0f0f0" : "transparent", // Placeholder medan kartan laddas
        }}
      >
        {isMapReady && <Map position={[51.505, -0.09]} zoom={13} />}
      </div>

      <h1>FOOT</h1>
    </div>
  );
}
