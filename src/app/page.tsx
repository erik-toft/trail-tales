"use clent";
import { useMemo } from "react";
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

  return (
    <div>
      <h1>Welcome to TrailTales</h1>
      <Map position={[51.505, -0.09]} zoom={13} />
    </div>
  );
}
