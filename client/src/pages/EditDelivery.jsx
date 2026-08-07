import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDelivery,
  updateDelivery,
} from "../services/api";

import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";

import "../styles/AddDelivery.css";

function EditDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    priority: "Normal",
  });

  useEffect(() => {
    loadDelivery();
  }, []);

  const loadDelivery = async () => {
    try {
      const data = await getDelivery(id);

      setForm({
        customerName: data.delivery.customerName,
        phone: data.delivery.phone,
        address: data.delivery.address,
        priority: data.delivery.priority,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      await updateDelivery(id, form);

      alert("Delivery Updated Successfully");

      navigate("/deliveries");
    } catch (err) {
      console.log(err);
      alert("Failed to update delivery.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-delivery-page">

      <div className="delivery-card">

        <h1>Edit Delivery</h1>

        <p>
          Update customer delivery information below.
        </p>

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
              rows="5"
              placeholder="Complete Delivery Address"
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

            {loading ? "Updating..." : "Update Delivery"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditDelivery;