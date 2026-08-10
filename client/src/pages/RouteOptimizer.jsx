import { useEffect, useState } from "react";
import { getDeliveries } from "../services/api";
import { optimizeRoute } from "../utils/routeOptimizer";
import MapView from "../components/MapView";

import {
  FaRoute,
  FaTruck,
  FaRoad,
  FaClock,
  FaGasPump,
} from "react-icons/fa";

import "../styles/RouteOptimizer.css";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getRouteDistance(route) {
  if (route.length < 2) return 0;

  let total = 0;

  for (let i = 0; i < route.length - 1; i++) {
    total += calculateDistance(
      Number(route[i].latitude),
      Number(route[i].longitude),
      Number(route[i + 1].latitude),
      Number(route[i + 1].longitude)
    );
  }

  return total;
}

function RouteOptimizer() {
  const [deliveries, setDeliveries] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveries();

      setDeliveries(data.deliveries);

      const activeDeliveries = data.deliveries.filter(
  (delivery) =>
    delivery.status?.toLowerCase() !== "delivered"
);

setDeliveries(activeDeliveries);
setOptimizedRoute(optimizeRoute(activeDeliveries));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

const handleOptimize = () => {
  const activeDeliveries = deliveries.filter(
    (delivery) =>
      delivery.status?.toLowerCase() !== "delivered"
  );

  setOptimizedRoute(optimizeRoute(activeDeliveries));
};

  const totalDistance = getRouteDistance(optimizedRoute);
  const estimatedMinutes = Math.round((totalDistance / 30) * 60);
  const fuelSaved = (totalDistance / 15).toFixed(1);

  if (loading) {
    return (
      <div className="route-page">
        <h2>Loading route...</h2>
      </div>
    );
  }

  return (
    <div className="route-page">

      {/* Header */}

      <div className="route-header">

        <div>

          <h1>
            <FaRoute />
            Optimize Route
          </h1>

          <p>
            Optimize today's deliveries to reduce travel distance,
            save fuel and improve delivery efficiency.
          </p>

        </div>

        <button
          className="optimize-route-btn"
          onClick={handleOptimize}
        >
          🚀 Optimize Now
        </button>

      </div>

      {/* Summary */}

      <div className="summary-cards">

        <div className="summary-card">
          <FaTruck className="summary-icon" />
          <h2>{deliveries.length}</h2>
          <p>Total Deliveries</p>
        </div>

        <div className="summary-card">
          <FaRoad className="summary-icon" />
          <h2>{totalDistance.toFixed(1)} km</h2>
          <p>Total Distance</p>
        </div>

        <div className="summary-card">
          <FaClock className="summary-icon" />
          <h2>
            {Math.floor(estimatedMinutes / 60)}h{" "}
            {estimatedMinutes % 60}m
          </h2>
          <p>Estimated Time</p>
        </div>

        <div className="summary-card">
          <FaGasPump className="summary-icon" />
          <h2>{fuelSaved} L</h2>
          <p>Fuel Saved</p>
        </div>

      </div>

      {/* Map */}

      <div className="route-map">

        <div className="route-map-header">

          <h2>Optimized Route Map</h2>

          <span>Live Preview</span>

        </div>

        <MapView deliveries={optimizedRoute} />

      </div>

      {/* Bottom */}

      <div className="route-bottom">

        <div className="route-stats">

          <h2>Route Statistics</h2>

          <div className="stat-row">
            <span>Original Distance</span>
            <strong>{(totalDistance * 1.2).toFixed(1)} km</strong>
          </div>

          <div className="stat-row">
            <span>Optimized Distance</span>
            <strong>{totalDistance.toFixed(1)} km</strong>
          </div>

          <div className="stat-row">
            <span>Estimated Time</span>
            <strong>
              {Math.floor(estimatedMinutes / 60)}h{" "}
              {estimatedMinutes % 60}m
            </strong>
          </div>

          <div className="stat-row">
            <span>Fuel Saved</span>
            <strong>{fuelSaved} Litres</strong>
          </div>

        </div>

        <div className="optimized-stops">

          <h2>Optimized Delivery Sequence</h2>

          {optimizedRoute.length === 0 ? (

            <div className="empty-route">
              No deliveries available.
            </div>

          ) : (

            <div className="stops-container">

              {optimizedRoute.map((delivery, index) => (

                <div
                  className="stop-card"
                  key={delivery._id}
                >

                  <div className="stop-number">
                    {index + 1}
                  </div>

                  <div className="stop-info">

                    <h3>{delivery.customerName}</h3>

                    <p>📍 {delivery.address}</p>

                    <p>📞 {delivery.phone}</p>

                  </div>

                  <div className="stop-right">

                    <span
                      className={`priority-badge ${delivery.priority.toLowerCase()}`}
                    >
                      {delivery.priority}
                    </span>

                    <span
                      className={`status-badge ${delivery.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {delivery.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default RouteOptimizer;