import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";

function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      onLocationSelect(lat, lng);
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
}

export default LocationPicker;