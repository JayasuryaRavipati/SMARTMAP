import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  getDeliveries,
  deleteDelivery,
} from "../services/api";

import { optimizeRoute } from "../utils/routeOptimizer";

import "../styles/MyDeliveries.css";

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
      setDeliveries(data.deliveries || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this delivery?")) return;

    try {
      await deleteDelivery(id);
      loadDeliveries();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptimize = () => {
    const sorted = optimizeRoute(deliveries);
    setDeliveries(sorted);
    setOptimized(true);
  };

  const filtered = deliveries.filter((delivery) => {
    const searchMatch = delivery.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const priorityMatch =
      priority === "All" || delivery.priority === priority;

    const statusMatch =
      status === "All" || delivery.status === status;

    return searchMatch && priorityMatch && statusMatch;
  });

  return (
    <div className="deliveries-page">

      {/* Header */}

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

      {/* Optimize Button */}

      <div className="delivery-actions">

        <button
          className="optimize-btn"
          onClick={handleOptimize}
        >
          🚀 Optimize Route
        </button>

        {optimized && (
          <p className="optimized-text">
            ✅ Route optimized!
          </p>
        )}

      </div>

      {/* Empty State */}

      {filtered.length === 0 ? (

        <div className="empty-state">

          <h2>No Deliveries Found</h2>

          <p>
            Add a new delivery to get started.
          </p>

        </div>

      ) : (

        <div className="delivery-table-wrapper">

          <div className="delivery-table-scroll">

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
                      <span
                        className={`priority ${delivery.priority.toLowerCase()}`}
                      >
                        {delivery.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${delivery.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
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
      )}

    </div>
  );
}

export default MyDeliveries;