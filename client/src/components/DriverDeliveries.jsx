import { useEffect, useState } from "react";
import API from "../services/api";

function DriverDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await API.get("/deliveries/my-deliveries");
        setDeliveries(res.data.deliveries);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDeliveries();
  }, []);

  const updateStatus = async (id, currentStatus) => {
  let newStatus = currentStatus;

  if (currentStatus === "Pending") {
    newStatus = "Out for Delivery";
  } else if (currentStatus === "Out for Delivery") {
    newStatus = "Delivered";
  } else {
    return;
  }

  try {
    await API.put(`/deliveries/status/${id}`, {
      status: newStatus,
    });

    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery._id === id
          ? {
              ...delivery,
              status: newStatus,
            }
          : delivery
      )
    );

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="driver-deliveries">
      <h2>My Deliveries</h2>

      {deliveries.length === 0 ? (
        <p>No deliveries assigned.</p>
      ) : (
        deliveries.map((delivery) => (
          <div
            key={delivery._id}
            className="delivery-card"
          >
            <h3>{delivery.customerName}</h3>

            <p>{delivery.phone}</p>

            <p>{delivery.address}</p>

            <p>Status: {delivery.status}</p>

            <button
  onClick={() =>
    updateStatus(
      delivery._id,
      delivery.status
    )
  }
>
  {delivery.status === "Pending"
    ? "Start Delivery"
    : delivery.status === "Out for Delivery"
    ? "Mark Delivered"
    : "Completed"}
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default DriverDeliveries;