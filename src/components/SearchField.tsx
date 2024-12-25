"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchField.module.css";

interface SearchFieldProps {
  onPlaceSelected: (lat: number, lng: number) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (window.google && inputRef.current) {
      const places = window.google.maps.places;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      const googlePlaces = new places.Autocomplete(inputRef.current, options);

      googlePlaces.addListener("place_changed", () => {
        const place = googlePlaces.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          onPlaceSelected(lat, lng);

          setInputValue(place.name || "Unknown place");
        }
      });
    } else {
      console.error("Google Maps API is not loaded.");
    }
  }, [onPlaceSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a city"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.search}
      />
    </div>
  );
};

export default SearchField;
