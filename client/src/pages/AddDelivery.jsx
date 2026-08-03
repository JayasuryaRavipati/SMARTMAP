import { createDelivery } from "../services/api";
import { toast,ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaFlag,
  FaSave,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { geocodeAddress } from "../utils/geocoding";

import "../styles/AddDelivery.css";

function AddDelivery() {
  const navigate = useNavigate();

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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(form);

//     alert("Delivery Saved Successfully");

//     navigate("/deliveries");
//   };


const handleSubmit = async (e) => {
  e.preventDefault();
  const coordinates = await geocodeAddress(form.address);

if (!coordinates) {
  alert("Unable to locate this address.");
  return;
}


  try {
    await createDelivery(form);

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
      error.response?.data?.message || "Failed to add delivery"
    );
  }
};
  return (
    <>
     <ToastContainer />
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="add-delivery-page">

          <div className="delivery-card">

            <h1>Add New Delivery</h1>

            <p>
              Enter customer delivery details below.
            </p>

            <form onSubmit={handleSubmit}>

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

              <div className="input-group">

                <FaMapMarkerAlt />

                <textarea
                  placeholder="Complete Delivery Address"
                  rows="4"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="priority-box">

                <label>

                  <input
                    type="radio"
                    value="Normal"
                    name="priority"
                    checked={form.priority === "Normal"}
                    onChange={handleChange}
                  />

                  Normal

                </label>

                <label>

                  <input
                    type="radio"
                    value="High"
                    name="priority"
                    checked={form.priority === "High"}
                    onChange={handleChange}
                  />

                  High

                </label>

                <label>

                  <input
                    type="radio"
                    value="Super"
                    name="priority"
                    checked={form.priority === "Super"}
                    onChange={handleChange}
                  />

                  Super (5 Min)

                </label>

              </div>

              <button className="save-btn">

                <FaSave />

                Save Delivery

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
    </>
  );
}

export default AddDelivery;