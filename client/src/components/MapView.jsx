import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getDeliveries } from "../services/api";

import "../styles/MapView.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data.deliveries);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {deliveries.map((delivery) => {
        if (!delivery.latitude || !delivery.longitude) return null;

        return (
          <Marker
            key={delivery._id}
            position={[
              delivery.latitude,
              delivery.longitude,
            ]}
          >
            <Popup>
              <strong>{delivery.customerName}</strong>

              <br />

              {delivery.address}

              <br />

              Priority:
              {" "}
              {delivery.priority}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;