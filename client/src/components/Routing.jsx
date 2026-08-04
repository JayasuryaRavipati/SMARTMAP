import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ deliveries }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!deliveries || deliveries.length < 2) return;

    const waypoints = deliveries
      .filter(
        (delivery) =>
          delivery.latitude != null &&
          delivery.longitude != null
      )
      .map((delivery) =>
        L.latLng(
          Number(delivery.latitude),
          Number(delivery.longitude)
        )
      );

    if (waypoints.length < 2) return;

    // Remove previous route if it exists
    if (routingRef.current) {
      try {
        map.removeControl(routingRef.current);
      } catch (err) {
        console.log("Previous route already removed");
      }
      routingRef.current = null;
    }

    // Create new route
    routingRef.current = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [
          {
            color: "#2563eb",
            weight: 6,
            opacity: 0.8,
          },
        ],
      },
    }).addTo(map);

    return () => {
      if (routingRef.current) {
        try {
          map.removeControl(routingRef.current);
        } catch (err) {
          console.log("Route cleanup skipped");
        }
        routingRef.current = null;
      }
    };
  }, [deliveries, map]);

  return null;
}

export default Routing;