"use client";
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
interface MapProps {
  position: LatLngExpression;
  zoom: number;
}

export default function MyMap({ position, zoom }: MapProps) {
  return (
    <>
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
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          minZoom={1}
          maxZoom={19}
        />
        <Marker position={position} icon={customMarker}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
