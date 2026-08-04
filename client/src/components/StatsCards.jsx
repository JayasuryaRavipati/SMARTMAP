import { useEffect, useState } from "react";
import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaRoute,
} from "react-icons/fa";

import { getDeliveries } from "../services/api";

import "../styles/StatsCards.css";

function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    optimized: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDeliveries();

      const deliveries = data.deliveries;

      const total = deliveries.length;

      const pending = deliveries.filter(
        (d) => d.status === "Pending"
      ).length;

      const completed = deliveries.filter(
        (d) => d.status === "Delivered"
      ).length;

      const optimized = deliveries.filter(
        (d) =>
          d.latitude != null &&
          d.longitude != null
      ).length;

      setStats({
        total,
        pending,
        completed,
        optimized,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Deliveries",
      value: stats.total,
      icon: <FaBox />,
      color: "#2563eb",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <FaCheckCircle />,
      color: "#10b981",
    },
    {
      title: "Optimized Stops",
      value: stats.optimized,
      icon: <FaRoute />,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div className="stats-card" key={index}>
          <div
            className="stats-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;