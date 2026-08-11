import { useState } from "react";
import {
  FaTruck,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaPlusCircle,
  FaRoute,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setMobileMenuOpen(false);
    navigate("/profile");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <div
        className="navbar-left"
        onClick={() => navigate("/dashboard")}
      >
        <div className="navbar-logo">
          <FaTruck />
          <div>
            <h2>SMARTMAP</h2>
            <p>Smart Delivery Management</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/deliveries"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Deliveries
        </NavLink>

        <NavLink
          to="/deliveries/add"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add Delivery
        </NavLink>

        <NavLink
          to="/optimize"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Optimize Route
        </NavLink>

      </nav>

      {/* Desktop Profile */}
      <div className="desktop-profile">
        <button
          className="navbar-profile"
          onClick={handleProfile}
        >
          <FaUserCircle className="profile-icon" />

          <div className="driver-info">
            <h4>{user?.name || "Surya"}</h4>
            <span>Driver</span>
          </div>
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">

          <NavLink
            to="/dashboard"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/deliveries"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <FaBox />
            <span>My Deliveries</span>
          </NavLink>

          <NavLink
            to="/deliveries/add"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <FaPlusCircle />
            <span>Add Delivery</span>
          </NavLink>

          <NavLink
            to="/optimize"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <FaRoute />
            <span>Optimize Route</span>
          </NavLink>

          <button
            className="mobile-nav-link mobile-profile"
            onClick={handleProfile}
          >
            <FaUserCircle />
            <span>Profile</span>
          </button>

          <div className="mobile-menu-divider"></div>

          <button
            className="mobile-nav-link mobile-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>
      )}

    </header>
  );
}

export default Navbar;