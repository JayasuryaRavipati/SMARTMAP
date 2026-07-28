import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Routing from "./Routing";
import API from "../services/api";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);

  return null;
}

function MapView() {
  const [position, setPosition] = useState([17.385, 78.4867]);

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      setPosition([
        location.coords.latitude,
        location.coords.longitude,
      ]);
    },
    (error) => {
      console.error(error);
    }
  );

  const fetchDeliveries = async () => {
    try {
      const res = await API.get("/deliveries");

      console.log("Deliveries:", res.data.deliveries);
      console.log(res.data.deliveries);

      setDeliveries(res.data.deliveries);
    } catch (error) {
      console.log(error);
    }
  };

  fetchDeliveries();
}, []);
const [deliveries, setDeliveries] = useState([]);
const validDeliveries = deliveries.filter(
  (delivery) =>
    !isNaN(Number(delivery.latitude)) &&
    !isNaN(Number(delivery.longitude))
);
  return (
    
    <MapContainer
      center={position}
      zoom={15}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ChangeView center={position} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Popup>
          🚚 You are here
        </Popup>
      </Marker>
     <Routing
  driverPosition={position}
  deliveries={validDeliveries}
/>
     {deliveries
  .filter(
    (delivery) =>
      delivery.latitude != null &&
      delivery.longitude != null
  )
  .map((delivery) => (
    <Marker
      key={delivery._id}
      position={[
        Number(delivery.latitude),
        Number(delivery.longitude),
      ]}
    >
      <Popup>
        <strong>{delivery.customerName}</strong>

        <br />

        📍 {delivery.address}

        <br />

        📦 {delivery.status}
      </Popup>
    </Marker>
))}
    </MapContainer>
  );
}

export default MapView;