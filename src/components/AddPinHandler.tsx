import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import React, { useEffect } from "react";
import { customMarker } from "./CustomMarker";

type AddPinProps = {
  isAddingPin: boolean;
  setIsAddingPin: (value: boolean) => void;
};

const AddPinHandler: React.FC<AddPinProps> = ({
  isAddingPin,
  setIsAddingPin,
}) => {
  const map = useMap();

  const addMarker = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    const marker = L.marker([lat, lng], { icon: customMarker }).addTo(map);

    marker.bindPopup("Pin Info Form").openPopup();

    setIsAddingPin(false);
  };

  useEffect(() => {
    if (isAddingPin) {
      map.on("click", addMarker);
    }

    return () => {
      map.off("click", addMarker);
    };
  }, [map, isAddingPin]);

  return null;
};

export default AddPinHandler;
