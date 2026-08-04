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

import { getDeliveries } from "../services/api";
import "../styles/MapView.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import Routing from "./Routing";

// Fix Leaflet Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ deliveries: propDeliveries }) {

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {

    // If deliveries are passed from parent, use them
    if (propDeliveries) {
      setDeliveries(propDeliveries);
      return;
    }

    // Otherwise fetch normally
    loadDeliveries();

  }, [propDeliveries]);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data.deliveries);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={11}
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
      {deliveries.length > 1 && (
        <Routing deliveries={deliveries} />
      )}

      {deliveries.map((delivery) => {


        if (!delivery.latitude || !delivery.longitude) return null;

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

              {delivery.priority}
            </Popup>
          </Marker>
        );

      })}
    </MapContainer>
  );
}

export default MapView;