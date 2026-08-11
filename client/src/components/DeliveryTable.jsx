import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import {
  getDeliveries,
  deleteDelivery,
} from "../services/api";
import "../styles/DeliveryTable.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function DeliveryTable() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data.deliveries);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    (delivery.customerName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this delivery?")) return;

    try {
      await deleteDelivery(id);
      fetchDeliveries();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (loading) {
    return <h2>Loading deliveries...</h2>;
  }

  return (
    <div className="delivery-container">

      <div className="delivery-header">
        <h2>Today's Deliveries</h2>

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

   <div className="delivery-table-wrapper">
  <div className="delivery-table-scroll">

    <table className="delivery-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => (
            <tr key={delivery._id}>

              <td>{delivery.customerName}</td>

              <td>{delivery.phone}</td>

              <td>{delivery.address}</td>

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

              <td className="actions">

                <Link
                  to={`/deliveries/${delivery._id}`}
                  className="icon-btn view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                  to={`/deliveries/edit/${delivery._id}`}
                  className="icon-btn edit-btn"
                >
                  <FaEdit />
                </Link>

                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDelete(delivery._id)}
                >
                  <FaTrash />
                </button>

              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-deliveries">
              No deliveries found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

  </div>
</div>

    </div>
  );
}

export default DeliveryTable;