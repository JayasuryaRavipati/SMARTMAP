import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createDelivery } from "../services/api";
import { geocodeAddress } from "../utils/geocoding";

import { toast, ToastContainer } from "react-toastify";

import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";

import "../styles/AddDelivery.css";

function AddDelivery() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    priority: "Normal",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const coordinates = await geocodeAddress(form.address);

      if (!coordinates) {
        toast.error("Unable to locate this address.");
        setLoading(false);
        return;
      }

      const deliveryData = {
        ...form,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      };

      await createDelivery(deliveryData);

      setForm({
        customerName: "",
        phone: "",
        address: "",
        priority: "Normal",
      });

      toast.success("Delivery Added Successfully");

      setTimeout(() => {
        navigate("/deliveries");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to add delivery"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="add-delivery-page">

        <div className="delivery-card">

          <h1>Add New Delivery</h1>

          <p>Enter customer delivery details below.</p>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="input-group">
                <FaUser />

                <input
                  type="text"
                  placeholder="Customer Name"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaPhone />

                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="input-group address-box">

              <FaMapMarkerAlt />

              <textarea
                placeholder="Complete Delivery Address"
                rows="5"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />

            </div>

            <div className="priority-box">

              <label
                className={
                  form.priority === "Normal"
                    ? "priority active normal"
                    : "priority normal"
                }
              >
                <input
                  type="radio"
                  name="priority"
                  value="Normal"
                  checked={form.priority === "Normal"}
                  onChange={handleChange}
                />
                Normal
              </label>

              <label
                className={
                  form.priority === "High"
                    ? "priority active high"
                    : "priority high"
                }
              >
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={form.priority === "High"}
                  onChange={handleChange}
                />
                High
              </label>

              <label
                className={
                  form.priority === "Super"
                    ? "priority active super"
                    : "priority super"
                }
              >
                <input
                  type="radio"
                  name="priority"
                  value="Super"
                  checked={form.priority === "Super"}
                  onChange={handleChange}
                />
                Super
              </label>

            </div>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              <FaSave />

              {loading ? "Saving..." : "Save Delivery"}

            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddDelivery;