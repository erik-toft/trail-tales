"use client";

import L from "leaflet";

export const customMarker = L.icon({
  iconUrl: "/leaflet-icons/marker-icon.png", // Sökvägen till din marker-icon
  shadowUrl: "/leaflet-icons/marker-shadow.png", // Sökvägen till marker-shadow
  iconSize: [32, 32], // Storleken på ikonen
  iconAnchor: [16, 32], // Var ikonen ska "sitta" på markören
  shadowSize: [41, 41], // Skuggans storlek
  shadowAnchor: [12, 41], // Skuggans position
});
