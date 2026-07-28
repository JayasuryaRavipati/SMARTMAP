import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await API.get("/deliveries");
      setDeliveries(res.data.deliveries);
    } catch (err) {
      toast.error("Failed to load deliveries");
    }
  };

  const deleteDelivery = async (id) => {
    if (!window.confirm("Delete this delivery?")) return;

    try {
      await API.delete(`/deliveries/${id}`);

      toast.success("Delivery Deleted");

      fetchDeliveries();

    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="page">

      <h2>Delivery Management</h2>

      <table className="delivery-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {deliveries.map((delivery) => (

            <tr key={delivery._id}>

              <td>{delivery.customerName}</td>

              <td>{delivery.phone}</td>

              <td>{delivery.address}</td>

              <td>{delivery.status}</td>

              <td>
                {delivery.assignedDriver
                  ? delivery.assignedDriver.name
                  : "Not Assigned"}
              </td>

              <td>

                <button>
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteDelivery(delivery._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Deliveries;