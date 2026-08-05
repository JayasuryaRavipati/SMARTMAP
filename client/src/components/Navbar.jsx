import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
 console.log("Navbar User:", user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="navbar-left">
        <h2>SMARTMAP</h2>
        <p>Smart Delivery Management</p>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="driver-profile">

          <FaUserCircle className="profile-icon" />

          <div className="driver-info">
            <h4>{user?.name}</h4>
            <span>Delivery Driver</span>
          </div>

        </div>

        <button
          className="navbar-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;