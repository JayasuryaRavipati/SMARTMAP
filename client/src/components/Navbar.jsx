import { useState } from "react";
import {
    FaTruck,
    FaBars,
    FaHome,
    FaBox,
    FaPlusCircle,
    FaRoute,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate("/login");
    };

    const handleProfile = () => {
        setIsMobileMenuOpen(false);
        navigate("/profile");
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="navbar">

            {/* LEFT SIDE */}
            <div
                className="navbar-left"
                onClick={() => navigate("/dashboard")}
            >
                <div className="navbar-logo">
                    <FaTruck className="truck-icon" />

                    <div className="logo-text">
                        <h2>SMARTMAP</h2>
                        <p>Smart Delivery Management</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="navbar-right">

                {/* DESKTOP NAVIGATION */}
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

                {/* DESKTOP PROFILE */}
                <button
                    className="navbar-profile"
                    onClick={handleProfile}
                    type="button"
                >
                    <FaUser className="profile-icon" />

                    <div className="driver-info">
                        <h4>{user?.name || "Surya"}</h4>
                        <span>Driver</span>
                    </div>
                </button>

                {/* DESKTOP LOGOUT */}
                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                    type="button"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

            {/* MOBILE MENU BUTTON */}
            <button
                className="mobile-menu-btn"
                onClick={() =>
                    setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                type="button"
                aria-label="Open menu"
            >
                <FaBars />
            </button>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                        onClick={closeMobileMenu}
                    >
                        <FaHome />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/deliveries"
                        className={({ isActive }) =>
                            isActive
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                        onClick={closeMobileMenu}
                    >
                        <FaBox />
                        <span>My Deliveries</span>
                    </NavLink>

                    <NavLink
                        to="/deliveries/add"
                        className={({ isActive }) =>
                            isActive
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                        onClick={closeMobileMenu}
                    >
                        <FaPlusCircle />
                        <span>Add Delivery</span>
                    </NavLink>

                    <NavLink
                        to="/optimize"
                        className={({ isActive }) =>
                            isActive
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                        onClick={closeMobileMenu}
                    >
                        <FaRoute />
                        <span>Optimize Route</span>
                    </NavLink>

                    <button
                        className="mobile-nav-link mobile-profile"
                        onClick={handleProfile}
                        type="button"
                    >
                        <FaUser />
                        <span>Profile</span>
                    </button>

                    <div className="mobile-menu-divider"></div>

                    <button
                        className="mobile-nav-link mobile-logout"
                        onClick={handleLogout}
                        type="button"
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