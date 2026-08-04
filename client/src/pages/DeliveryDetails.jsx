import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  getDelivery,
  updateDelivery,
} from "../services/api";
import "../styles/DeliveryDetails.css";

function DeliveryDetails() {
  const { id } = useParams();

  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    loadDelivery();
  }, []);

  const loadDelivery = async () => {
    try {
      const data = await getDelivery(id);
      setDelivery(data.delivery);
    } catch (err) {
      console.log(err);
    }
  };
  const handleStartDelivery = async () => {
  console.log("Start Delivery clicked");

  try {
    const data = await updateDelivery(id, {
      status: "On Route",
    });

    console.log(data);

    loadDelivery();
  } catch (err) {
    console.log(err);
  }
};

  const handleMarkDelivered = async () => {
  try {
    const data = await updateDelivery(id, {
      status: "Delivered",
    });

    console.log(data);

    loadDelivery();

  } catch (err) {
    console.log(err);
  }
};
  if (!delivery) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="details-page">

          <div className="details-card">

            <h1>Delivery Details</h1>

            <div className="detail-item">
              <strong>Customer</strong>
              <p>{delivery.customerName}</p>
            </div>

            <div className="detail-item">
              <strong>Phone</strong>
              <p>{delivery.phone}</p>
            </div>

            <div className="detail-item">
              <strong>Address</strong>
              <p>{delivery.address}</p>
            </div>

            <div className="detail-item">
              <strong>Priority</strong>
              <p>{delivery.priority}</p>
            </div>

            <div className="detail-item">
              <strong>Status</strong>
              <p>{delivery.status}</p>
            </div>

            <div className="button-group">

              <button
                className="start-btn"
                onClick={handleStartDelivery}
                disabled={delivery.status !== "Pending"}
              >
                Start Delivery
              </button>

              <button
                className="complete-btn"
                onClick={handleMarkDelivered}
                disabled={delivery.status !== "On Route"}
              >
                Mark Delivered
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DeliveryDetails;