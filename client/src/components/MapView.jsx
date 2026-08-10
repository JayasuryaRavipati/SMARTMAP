import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

import { getDeliveries } from "../services/api";
import Routing from "./Routing";
import "../styles/MapView.css";

// -----------------------------
// Fix Leaflet Marker Icons
// -----------------------------
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// -----------------------------
// Driver Icon
// -----------------------------
const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

// -----------------------------
// Auto Center Map
// -----------------------------
function ChangeMapCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
}

function MapView({ deliveries: propDeliveries }) {
  const [deliveries, setDeliveries] = useState([]);
  const [driverLocation, setDriverLocation] = useState(null);

  // -----------------------------
  // Driver Live Location
  // -----------------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setDriverLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // -----------------------------
  // Load Deliveries
  // -----------------------------
  useEffect(() => {
  if (propDeliveries) {
    setDeliveries(
      propDeliveries.filter(
        (delivery) =>
          delivery.status?.toLowerCase() !== "delivered"
      )
    );
  } else {
    loadDeliveries();
  }
}, [propDeliveries]);

 const loadDeliveries = async () => {
  try {
    const data = await getDeliveries();

    const activeDeliveries = (data.deliveries || []).filter(
      (delivery) =>
        delivery.status?.toLowerCase() !== "delivered"
    );

    setDeliveries(activeDeliveries);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <MapContainer
      center={
        driverLocation
          ? [driverLocation.lat, driverLocation.lng]
          : [17.385, 78.4867]
      }
      zoom={13}
      style={{
        height: "450px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Auto Move Map */}
      {driverLocation && (
        <ChangeMapCenter
          position={[
            driverLocation.lat,
            driverLocation.lng,
          ]}
        />
      )}

      {/* Driver Marker */}
      {driverLocation && (
        <Marker
          position={[
            driverLocation.lat,
            driverLocation.lng,
          ]}
          icon={driverIcon}
        >
          <Popup>
            <b>Your Current Location</b>
          </Popup>
        </Marker>
      )}

      {/* Route */}
      {driverLocation && deliveries.length > 0 && (
        <Routing
          deliveries={deliveries}
          driverLocation={driverLocation}
        />
      )}

      {/* Delivery Markers */}
      {deliveries
  .filter(
    (delivery) =>
      delivery.status?.toLowerCase() !== "delivered"
  )
  .map((delivery) => {
        if (
          delivery.latitude == null ||
          delivery.longitude == null
        ) {
          return null;
        }

        return (
          <Marker
            key={delivery._id}
            position={[
              Number(delivery.latitude),
              Number(delivery.longitude),
            ]}
          >
            <Popup>
              <b>{delivery.customerName}</b>

              <br />

              {delivery.address}

              <br />

              Priority: {delivery.priority}

              <br />

              Status: {delivery.status}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;