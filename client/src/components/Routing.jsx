import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ driverPosition, deliveries }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (
      !driverPosition ||
      deliveries.length === 0
    )
      return;

    const waypoints = [
      L.latLng(driverPosition[0], driverPosition[1]),
      ...deliveries
        .filter(
          (d) =>
            !isNaN(Number(d.latitude)) &&
            !isNaN(Number(d.longitude))
        )
        .map((d) =>
          L.latLng(
            Number(d.latitude),
            Number(d.longitude)
          )
        ),
    ];

    // Create routing control only once
    if (!routingRef.current) {
      routingRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
      }).addTo(map);
    } else {
      // Update existing route
      routingRef.current.setWaypoints(waypoints);
    }

    return () => {};
  }, [driverPosition, deliveries, map]);

  return null;
}

export default Routing;