import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getDelivery,
  updateDelivery,
} from "../services/api";

import "../styles/AddDelivery.css";

function EditDelivery() {

  const { id } = useParams();

  const navigate = useNavigate();

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

    try {

      await updateDelivery(id, form);

      alert("Delivery Updated Successfully");

      navigate("/deliveries");

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="add-delivery-page">

          <div className="delivery-card">

            <h1>Edit Delivery</h1>

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <textarea
                  rows="4"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
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

              <button className="save-btn">

                Update Delivery

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}

export default EditDelivery;