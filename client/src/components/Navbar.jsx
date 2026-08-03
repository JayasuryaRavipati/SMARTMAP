import { FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-left">
        <h2>SMARTMAP</h2>
        <p>Driver Route Optimization System</p>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="driver-profile">

          <div className="driver-info">
            <h4>Surya</h4>
            <span>Delivery Driver</span>
          </div>

          <FaUserCircle className="profile-icon"/>

        </div>

      </div>

    </header>
  );
}

export default Navbar;