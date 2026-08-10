import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ deliveries, driverLocation }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !driverLocation || !deliveries?.length) {
      return;
    }

    const activeDeliveries = deliveries.filter(
      (delivery) =>
        delivery.status?.toLowerCase() !== "delivered" &&
        delivery.latitude != null &&
        delivery.longitude != null
    );

    // Remove old route if there are no active deliveries
    if (activeDeliveries.length === 0) {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
      return;
    }

    // Driver -> A -> B -> C -> D
    const waypoints = [
      L.latLng(
        Number(driverLocation.lat),
        Number(driverLocation.lng)
      ),

      ...activeDeliveries.map((delivery) =>
        L.latLng(
          Number(delivery.latitude),
          Number(delivery.longitude)
        )
      ),
    ];

    // Remove previous route
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // Create new route
    const routingControl = L.Routing.control({
      waypoints,

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),

      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,

      fitSelectedRoutes: false,

      show: false,

      createMarker: () => null,

      lineOptions: {
        styles: [
          {
            color: "#2563eb",
            weight: 6,
            opacity: 0.85,
          },
        ],
      },
    });

    routingControl.addTo(map);

    routingRef.current = routingControl;

    return () => {
      if (routingRef.current) {
        try {
          map.removeControl(routingRef.current);
        } catch (error) {
          console.log("Route cleanup:", error);
        }

        routingRef.current = null;
      }
    };
  }, [map, driverLocation, deliveries]);

  return null;
}

export default Routing;