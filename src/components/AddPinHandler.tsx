import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import React, { useEffect, useCallback, useState } from "react";
import { customMarker } from "./CustomMarker";

type AddPinHandlerProps = {
  isAddingPin: boolean;
  setIsAddingPin: (value: boolean) => void;
  onPinAdd: (lat: number, lng: number) => void;
  searchedPinCoords: { lat: number; lng: number } | null;
};

const AddPinHandler: React.FC<AddPinHandlerProps> = ({
  isAddingPin,
  setIsAddingPin,
  onPinAdd,
  searchedPinCoords,
}) => {
  const map = useMap();
  const [activeMarker, setActiveMarker] = useState<L.Marker | null>(null);

  const handleMapClick = useCallback(
    (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const marker = L.marker([lat, lng], { icon: customMarker }).addTo(map);
      setActiveMarker(marker);

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

      if (activeMarker) {
        activeMarker.remove();
        setActiveMarker(null);
      }
    };
  }, [map, isAddingPin, handleMapClick, activeMarker]);

  useEffect(() => {
    if (searchedPinCoords) {
      const marker = L.marker([searchedPinCoords.lat, searchedPinCoords.lng], {
        icon: customMarker,
      }).addTo(map);
      setActiveMarker(marker);

      return () => {
        marker.remove();
        setActiveMarker(null);
      };
    }
  }, [searchedPinCoords, map]);

  return null;
};

export default AddPinHandler;
