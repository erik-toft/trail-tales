"use client";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { customMarker } from "@/components/CustomMarker";
import styles from "@/components/Map.module.css";
import DashboardButton from "@/components/Dashboard";
import AddPinHandler from "@/components/AddPinHandler";

interface MapProps {
  position: LatLngExpression;
  zoom: number;
}

const Map = ({ position, zoom }: MapProps) => {
  const [pins] = useState<{ lat: number; lng: number }[]>([]);
  const [isAddingPin, setIsAddingPin] = useState(false);

  console.log(isAddingPin);

  return (
    <>
      <DashboardButton setIsAddingPin={setIsAddingPin} />
      <MapContainer
        className={styles.mapContainer}
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <AddPinHandler
          isAddingPin={isAddingPin}
          setIsAddingPin={setIsAddingPin}
        />

        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          minZoom={1}
          maxZoom={19}
        />
        {pins.map((pin, index) => (
          <Marker key={index} position={[pin.lat, pin.lng]} icon={customMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
