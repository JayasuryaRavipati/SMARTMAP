import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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

function RouteOptimizer() {

    const [deliveries, setDeliveries] = useState([]);
    const [optimizedRoute, setOptimizedRoute] = useState([]);

    useEffect(() => {
        loadDeliveries();
    }, []);

    const loadDeliveries = async () => {
        try {
            const data = await getDeliveries();

            setDeliveries(data.deliveries);

            setOptimizedRoute(optimizeRoute(data.deliveries));

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar />

                <div className="dashboard-content">

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
                                onClick={() => setOptimizedRoute(optimizeRoute(deliveries))}
                            >
                                Optimize Now
                            </button>

                        </div>

                        {/* Summary Cards */}

                        <div className="summary-cards">

                            <div className="summary-card">
                                <FaTruck className="summary-icon" />
                                <h2>{deliveries.length}</h2>
                                <p>Total Deliveries</p>
                            </div>

                            <div className="summary-card">
                                <FaRoad className="summary-icon" />
                                <h2>42 km</h2>
                                <p>Total Distance</p>
                            </div>

                            <div className="summary-card">
                                <FaClock className="summary-icon" />
                                <h2>2h 15m</h2>
                                <p>Estimated Time</p>
                            </div>

                            <div className="summary-card">
                                <FaGasPump className="summary-icon" />
                                <h2>1.8 L</h2>
                                <p>Fuel Saved</p>
                            </div>

                        </div>

                        {/* Map */}

                        <div className="route-map">

                            <div className="route-map-header">

                                <h2>Optimized Route Map</h2>

                                <span>
                                    Live Route Preview
                                </span>

                            </div>

                            <MapView deliveries={optimizedRoute} />

                        </div>

                        {/* Bottom Section */}

                        <div className="route-bottom">

                            <div className="route-stats">

                                <h2>Route Statistics</h2>

                                <div className="stat-row">
                                    <span>Original Distance</span>
                                    <strong>56 km</strong>
                                </div>

                                <div className="stat-row">
                                    <span>Optimized Distance</span>
                                    <strong>42 km</strong>
                                </div>

                                <div className="stat-row">
                                    <span>Estimated Time</span>
                                    <strong>2h 15m</strong>
                                </div>

                                <div className="stat-row">
                                    <span>Fuel Saved</span>
                                    <strong>1.8 Litres</strong>
                                </div>

                            </div>

                            <div className="optimized-stops">

                                <h2>Optimized Delivery Sequence</h2>

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

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RouteOptimizer;