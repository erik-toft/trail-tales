"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const { currentUser } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <div className={"spinner"}>
            <ClockLoader color="blue" />
          </div>
        ),
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
        router.push("/welcome");
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
        }}
      >
        {isMapReady && <Map position={[30.505, -0.09]} zoom={1} />}
      </div>
    </div>
  );
}
