// "use client";

import L from "leaflet";

export const customMarker = L.icon({
  iconUrl: "/leaflet-icons/marker-icon.png",
  shadowUrl: "/leaflet-icons/marker-shadow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});
