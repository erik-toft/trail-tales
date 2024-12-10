import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import React, { useEffect, useCallback, useState } from "react";
import { customMarker } from "./CustomMarker";

type AddPinHandlerProps = {
  isAddingPin: boolean;
  setIsAddingPin: (value: boolean) => void;
  onPinAdd: (lat: number, lng: number) => void;
};

const AddPinHandler: React.FC<AddPinHandlerProps> = ({
  isAddingPin,
  setIsAddingPin,
  onPinAdd,
}) => {
  const map = useMap();
  const [activeMarker, setActiveMarker] = useState<L.Marker | null>(null); // För att hålla reda på aktuell markör

  const handleMapClick = useCallback(
    (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const marker = L.marker([lat, lng], { icon: customMarker }).addTo(map);
      setActiveMarker(marker); // Spara markören i state

      onPinAdd(lat, lng);
      setIsAddingPin(false);
    },
    [map, onPinAdd, setIsAddingPin]
  );

  useEffect(() => {
    if (isAddingPin) {
      map.on("click", handleMapClick);
    }
    return () => {
      map.off("click", handleMapClick);

      // Om en markör är skapad och användaren avbryter, ta bort markören
      if (activeMarker) {
        activeMarker.remove();
        setActiveMarker(null);
      }
    };
  }, [map, isAddingPin, handleMapClick, activeMarker]);

  return null;
};

export default AddPinHandler;
