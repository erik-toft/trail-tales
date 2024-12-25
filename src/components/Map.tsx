import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import styles from "@/components/Map.module.css";
import Dashboard from "@/components/Dashboard";
import AddPinHandler from "@/components/AddPinHandler";
import PinForm from "./PinForm";
import usePins from "@/hooks/usePins";
import { customMarker } from "./CustomMarker";
import useAuth from "@/hooks/useAuth";
import PinLibrary from "@/components/PinLibrary";
import { Pin } from "@/types/Pin.types";
import { ClockLoader } from "react-spinners";

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
  const [searchedPinCoords, setSearchedPinCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pinFormOpen, setPinFormOpen] = useState(false);

  const { currentUser } = useAuth();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const {
    data: pins,
    loading,
    error,
  } = usePins(currentUser ? currentUser.uid : "");

  const handlePinAdd = (lat: number, lng: number) => {
    setPinCoords({ lat, lng });
    setPinFormOpen(true);
  };

  const handlePlaceSelected = (lat: number, lng: number) => {
    setSearchedPinCoords({ lat, lng });
    handlePinAdd(lat, lng);
    setIsAddingPin(false);
  };

  const closeSidebar = () => {
    setPinCoords(null);
    setSearchedPinCoords(null);
    setPinFormOpen(false);
    setSelectedPin(null);
  };

  const handleMarkerClick = (pin: Pin) => {
    setSelectedPin(null);
    setPinFormOpen(false);

    setSelectedPin(pin);
  };

  if (loading) {
    return (
      <div className="spinner">
        <ClockLoader color="yellow" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Dashboard
        onPlaceSelected={handlePlaceSelected}
        setIsAddingPin={setIsAddingPin}
        isAddingPin={isAddingPin}
      />

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
        maxBoundsViscosity={1.0}
        worldCopyJump={false}
      >
        <AddPinHandler
          isAddingPin={isAddingPin}
          setIsAddingPin={setIsAddingPin}
          onPinAdd={handlePinAdd}
          searchedPinCoords={searchedPinCoords}
        />

        {pins &&
          pins.map((pin) => (
            <Marker
              key={pin._id}
              position={{ lat: pin.lat, lng: pin.lng }}
              icon={customMarker}
              eventHandlers={{
                click: () => handleMarkerClick(pin),
              }}
            >
              <Popup></Popup>
            </Marker>
          ))}
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          minZoom={1}
          maxZoom={19}
        />
      </MapContainer>
      {pinCoords && pinFormOpen && (
        <PinForm
          lat={pinCoords.lat}
          lng={pinCoords.lng}
          closeSidebar={closeSidebar}
          pinFormOpen={pinFormOpen}
        />
      )}
      {selectedPin && (
        <PinLibrary closeSidebar={closeSidebar} pin={selectedPin} />
      )}
    </>
  );
};

export default Map;
