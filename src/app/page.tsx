"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
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
      <div
        ref={mapRef}
        style={{
          position: "relative",
          height: "400px",
        }}
      >
        {isMapReady && <Map position={[30.505, -0.09]} zoom={1} />}
      </div>
    </div>
  );
}
