import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../services/api";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMotorcycle,
  FaTruck,
  FaSave,
} from "react-icons/fa";

import "../styles/Profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleNumber: "",
    vehicleType: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        vehicleNumber: data.user.vehicleNumber || "",
        vehicleType: data.user.vehicleType || "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(profile);

      alert("Profile Updated Successfully");

      loadProfile();
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h2>Driver Profile</h2>
            <p>Manage your personal information</p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="profile-grid">

            <div className="input-box">

              <label>
                <FaUser />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />

            </div>

            <div className="input-box">

              <label>
                <FaEnvelope />
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
              />

            </div>

            <div className="input-box">

              <label>
                <FaPhone />
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
              />

            </div>

            <div className="input-box">

              <label>
                <FaTruck />
                Vehicle Number
              </label>

              <input
                type="text"
                name="vehicleNumber"
                value={profile.vehicleNumber}
                onChange={handleChange}
                placeholder="AP39AB1234"
              />

            </div>

            <div className="input-box">

              <label>
                <FaMotorcycle />
                Vehicle Type
              </label>

              <select
                name="vehicleType"
                value={profile.vehicleType}
                onChange={handleChange}
              >
                <option value="">Select Vehicle</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
              </select>

            </div>

          </div>

          <button
            type="submit"
            className="update-btn"
          >
            <FaSave />
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;