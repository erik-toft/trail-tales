import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import React, { useEffect, useCallback } from "react";
import { customMarker } from "./CustomMarker";
import PinForm from "@/components/PinForm";
import { createRoot } from "react-dom/client";
import { Pin } from "@/types/Pin.types";
import useUploadPin from "@/hooks/useUploadPin";

type AddPinProps = {
  isAddingPin: boolean;
  setIsAddingPin: (value: boolean) => void;
};

const AddPinHandler: React.FC<AddPinProps> = ({
  isAddingPin,
  setIsAddingPin,
}) => {
  const map = useMap();
  const { uploadPin } = useUploadPin();

  const addMarker = useCallback(
    (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const marker = L.marker([lat, lng], { icon: customMarker }).addTo(map);

      const container = document.createElement("div");
      const root = createRoot(container);

      root.render(
        <PinForm
          lat={lat}
          lng={lng}
          onSubmit={(data: Pin) => {
            uploadPin({
              ...data,
              lat,
              lng,
            });

            marker
              .bindPopup(`<b>${data.title}</b><br/>${data.description}`)
              .openPopup();
            root.unmount();
          }}
          onClose={() => {
            map.closePopup();
            root.unmount();
          }}
        />
      );

      marker.bindPopup(container);

      setTimeout(() => {
        marker.getPopup()?.update();
        marker.openPopup();
      }, 100);

      setIsAddingPin(false);
    },
    [map, setIsAddingPin, uploadPin]
  );

  useEffect(() => {
    if (isAddingPin) {
      map.on("click", addMarker);
    }

    return () => {
      map.off("click", addMarker);
    };
  }, [map, isAddingPin, addMarker]);

  return null;
};

export default AddPinHandler;
