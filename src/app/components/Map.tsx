"use client";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { customMarker } from "@/app/components/CustomMarker";
interface MapProps {
  position: LatLngExpression;
  zoom: number;
}

export default function MyMap({ position, zoom }: MapProps) {
  return (
    <>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
