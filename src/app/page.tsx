"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { currentUser } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!currentUser) {
        router.push("/login");
      } else {
        if (mapRef.current) {
          setIsMapReady(true);
        }
      }
    }
  }, [currentUser, isClient, router]);

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
