import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaRoute,
} from "react-icons/fa";

import "../styles/StatsCards.css";

function StatsCards() {
  const stats = [
    {
      title: "Total Deliveries",
      value: 18,
      icon: <FaBox />,
      color: "#2563eb",
    },
    {
      title: "Pending",
      value: 6,
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "Completed",
      value: 12,
      icon: <FaCheckCircle />,
      color: "#10b981",
    },
    {
      title: "Optimized Stops",
      value: 8,
      icon: <FaRoute />,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((card, index) => (
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