import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ deliveries, driverLocation }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    // Wait until we have driver's location
    if (!driverLocation) return;

    // Wait until deliveries are loaded
    if (!deliveries || deliveries.length === 0) return;

    // Create waypoints
    const waypoints = [
      L.latLng(driverLocation.lat, driverLocation.lng),

      ...deliveries
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
        ),
    ];

    // Need at least driver + one delivery
    if (waypoints.length < 2) return;

    // Remove previous route
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // Create routing
    routingRef.current = L.Routing.control({
      waypoints,

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),

      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,

      createMarker: () => null,

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
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [deliveries, driverLocation, map]);

  return null;
}

export default Routing;