import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getDelivery,
  updateDelivery,
} from "../services/api";

import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaFlag,
  FaTruck,
} from "react-icons/fa";

import "../styles/DeliveryDetails.css";

function DeliveryDetails() {
  const { id } = useParams();

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDelivery();
  }, []);

  const loadDelivery = async () => {
    try {
      const data = await getDelivery(id);
      setDelivery(data.delivery);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDelivery = async () => {
    try {
      await updateDelivery(id, {
        status: "On Route",
      });

      loadDelivery();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkDelivered = async () => {
    try {
      await updateDelivery(id, {
        status: "Delivered",
      });

      loadDelivery();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="details-card">
          <h2>Loading Delivery...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">

      <div className="details-card">

        <h1>Delivery Details</h1>

        <p className="details-subtitle">
          View customer information and update delivery status.
        </p>

        <div className="detail-item">
          <FaUser className="detail-icon" />

          <div>
            <strong>Customer</strong>
            <p>{delivery.customerName}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaPhone className="detail-icon" />

          <div>
            <strong>Phone</strong>
            <p>{delivery.phone}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaMapMarkerAlt className="detail-icon" />

          <div>
            <strong>Address</strong>
            <p>{delivery.address}</p>
          </div>
        </div>

        <div className="detail-item">
          <FaFlag className="detail-icon" />

          <div>
            <strong>Priority</strong>

            <span
              className={`priority ${delivery.priority.toLowerCase()}`}
            >
              {delivery.priority}
            </span>
          </div>
        </div>

        <div className="detail-item">
          <FaTruck className="detail-icon" />

          <div>
            <strong>Status</strong>

            <span
              className={`status ${delivery.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {delivery.status}
            </span>
          </div>
        </div>

        <div className="button-group">

          <button
            className="start-btn"
            onClick={handleStartDelivery}
            disabled={delivery.status !== "Pending"}
          >
            🚚 Start Delivery
          </button>

          <button
            className="complete-btn"
            onClick={handleMarkDelivered}
            disabled={delivery.status !== "On Route"}
          >
            ✅ Mark Delivered
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeliveryDetails;