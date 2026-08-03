import { FaPlusCircle, FaRoute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../styles/QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  const handleOptimize = () => {
    // We'll implement this later
    alert("Route Optimization will be available soon!");
  };

  return (
    <div className="quick-actions">

      <div className="quick-header">
        <h2>Quick Actions</h2>
        <p>Manage deliveries with a single click.</p>
      </div>

      <div className="action-buttons">

        <button
          className="action-btn add-btn"
          onClick={() => navigate("/deliveries/add")}
        >
          <FaPlusCircle />
          <span>Add Delivery</span>
        </button>

        <button
          className="action-btn optimize-btn"
          onClick={handleOptimize}
        >
          <FaRoute />
          <span>Optimize Route</span>
        </button>

      </div>

    </div>
  );
}

export default QuickActions;