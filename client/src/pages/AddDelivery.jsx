import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationPicker from "../components/LocationPicker";

function AddDelivery() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    assignedDriver: "",
  });

  // Fetch all drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await API.get("/users/drivers");

        console.log("Drivers API Response:", res.data);

        setDrivers(res.data.drivers || []);
      } catch (error) {
        console.error("Driver API Error:", error);

        toast.error("Unable to load drivers");
      }
    };

    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationSelect = (lat, lng) => {
    setForm((prev) => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      toast.error("Please select a location on the map.");
      return;
    }

    try {
      const deliveryData = {
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };

      if (form.assignedDriver !== "") {
        deliveryData.assignedDriver = form.assignedDriver;
      }

      console.log("Sending Delivery:", deliveryData);

      const res = await API.post("/deliveries", deliveryData);

      console.log(res.data);

      toast.success("Delivery Added Successfully!");

      setTimeout(() => {
        navigate("/deliveries");
      }, 1200);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to add delivery"
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login-page">
        <div className="login-card">
          <h2>Add Delivery</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="latitude"
              value={form.latitude}
              placeholder="Latitude"
              readOnly
            />

            <input
              type="text"
              name="longitude"
              value={form.longitude}
              placeholder="Longitude"
              readOnly
            />

            <h3>Select Delivery Location</h3>

            <MapContainer
              center={[17.385, 78.486]}
              zoom={13}
              style={{
                height: "300px",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <LocationPicker
                onLocationSelect={handleLocationSelect}
              />
            </MapContainer>

            <label>Assign Driver</label>

            <select
              name="assignedDriver"
              value={form.assignedDriver}
              onChange={handleChange}
            >
              <option value="">Select Driver</option>

              {drivers.map((driver) => (
                <option
                  key={driver._id}
                  value={driver._id}
                >
                  {driver.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="login-btn"
            >
              Save Delivery
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDelivery;