import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";

function Profile() {

  const [profile, setProfile] = useState({
    name: "Surya",
    email: "surya@example.com",
    phone: "9876543210",
    vehicleNumber: "",
    vehicleType: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Profile Updated Successfully");
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="profile-page">

          <div className="profile-card">

            <div className="profile-header">

              <div className="profile-avatar">
                {profile.name.charAt(0)}
              </div>

              <div>
                <h2>Driver Profile</h2>
                <p>Manage your account information</p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="profile-grid">

                <div className="input-box">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-box">
                  <label>Vehicle Number</label>

                  <input
                    type="text"
                    name="vehicleNumber"
                    value={profile.vehicleNumber}
                    onChange={handleChange}
                    placeholder="AP39AB1234"
                  />
                </div>

                <div className="input-box">
                  <label>Vehicle Type</label>

                  <select
                    name="vehicleType"
                    value={profile.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="">Select Vehicle</option>
                    <option>Bike</option>
                    <option>Scooter</option>
                    <option>Van</option>
                    <option>Truck</option>
                  </select>

                </div>

              </div>

              <button className="update-btn">
                Update Profile
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;