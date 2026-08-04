import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getDeliveries, deleteDelivery } from "../services/api";
import "../styles/MyDeliveries.css";
import { Link } from "react-router-dom";
import { optimizeRoute } from "../utils/routeOptimizer";
function MyDeliveries() {

  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data.deliveries);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this delivery?")) return;

    await deleteDelivery(id);

    loadDeliveries();
  };

  const filtered = deliveries.filter((d) => {

    const searchMatch =
      d.customerName.toLowerCase().includes(search.toLowerCase());

    const priorityMatch =
      priority === "All" || d.priority === priority;

    const statusMatch =
      status === "All" || d.status === status;

    return searchMatch && priorityMatch && statusMatch;
  });
  const handleOptimize = () => {
    const sorted = optimizeRoute(deliveries);

    setDeliveries(sorted);

    setOptimized(true);
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="deliveries-page">

          <div className="deliveries-header">

            <h1>My Deliveries</h1>

            <div className="filters">

              <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>All</option>
                <option>Super</option>
                <option>High</option>
                <option>Normal</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>On Route</option>
                <option>Delivered</option>
              </select>

            </div>

          </div>
          <div className="delivery-actions">

            <button
              className="optimize-btn"
              onClick={handleOptimize}
            >
              🚀 Optimize Route
            </button>
            {optimized && (
              <p
                style={{
                  color: "#16a34a",
                  marginBottom: "15px",
                  fontWeight: "600",
                }}
              >
                ✅ Route optimized!
              </p>
            )}

          </div>

          <table className="delivery-table">

            <thead>

              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((delivery) => (

                <tr key={delivery._id}>

                  <td>{delivery.customerName}</td>

                  <td>{delivery.phone}</td>

                  <td>
                    <span className={`priority ${delivery.priority.toLowerCase()}`}>
                      {delivery.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`status ${delivery.status.toLowerCase().replace(" ", "-")}`}>
                      {delivery.status}
                    </span>
                  </td>

                  <td>
                    <div className="actions">
                      <Link
                        to={`/deliveries/${delivery._id}`}
                        className="action-btn view-btn"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/deliveries/edit/${delivery._id}`}
                        className="action-btn edit-btn"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(delivery._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MyDeliveries;