"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "@/app/components/Nav";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";

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
      <Nav />
      <h1>Welcome to TrailTales</h1>
      <div
        ref={mapRef}
        style={{
          position: "relative",
          height: "400px",
          backgroundColor: !isMapReady ? "#f0f0f0" : "transparent", // Placeholder medan kartan laddas
        }}
      >
        {isMapReady && <Map position={[51.505, -0.09]} zoom={13} />}
      </div>

      <Footer />
    </div>
  );
}
