import { useState } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import styles from "@/components/Map.module.css";
import Dashboard from "@/components/Dashboard";
import AddPinHandler from "@/components/AddPinHandler";
import PinForm from "./PinForm";
import usePins from "@/hooks/usePins";
import { customMarker } from "./CustomMarker";
import useAuth from "@/hooks/useAuth";

interface MapProps {
  position: LatLngExpression;
  zoom: number;
}

const Map = ({ position, zoom }: MapProps) => {
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [pinCoords, setPinCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pinFormOpen, setPinFormOpen] = useState(false);
  const { currentUser } = useAuth();

  const {
    data: pins,
    loading,
    error,
  } = usePins(currentUser ? currentUser.uid : "");

  const handlePinAdd = (lat: number, lng: number) => {
    setPinCoords({ lat, lng });
    setPinFormOpen(true);
  };

  const closeSidebar = () => {
    setPinCoords(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(pins);

  return (
    <>
      <Dashboard setIsAddingPin={setIsAddingPin} />
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
      >
        <AddPinHandler
          isAddingPin={isAddingPin}
          setIsAddingPin={setIsAddingPin}
          onPinAdd={handlePinAdd}
        />
        {pinCoords && (
          <PinForm
            lat={pinCoords.lat}
            lng={pinCoords.lng}
            closeSidebar={closeSidebar}
            pinFormOpen={pinFormOpen}
          />
        )}
        {pins &&
          pins.map((pin) => (
            <Marker
              key={pin._id}
              position={{ lat: pin.lat, lng: pin.lng }}
              icon={customMarker}
            />
          ))}

        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          minZoom={1}
          maxZoom={19}
        />
      </MapContainer>
    </>
  );
};

export default Map;
