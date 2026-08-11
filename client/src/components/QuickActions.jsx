import { FaPlus, FaRoute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/QuickActions.css";

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="quick-actions">
            <div className="quick-header">
                <h2>Quick Actions</h2>
                <p>Manage deliveries with a single click.</p>
            </div>

            <div className="action-buttons">

                <button
                    type="button"
                    className="action-btn add-btn"
                    onClick={() => navigate("/deliveries/add")}
                >
                    <FaPlus className="action-icon" />
                    <span>Add Delivery</span>
                </button>

                <button
                    type="button"
                    className="action-btn optimize-btn"
                    onClick={() => navigate("/optimize")}
                >
                    <FaRoute className="action-icon" />
                    <span>Optimize Route</span>
                </button>

            </div>
        </div>
    );
}

export default QuickActions;