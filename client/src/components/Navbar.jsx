import { useState, useEffect, useRef } from "react";
import {
    FaUserCircle,
    FaSignOutAlt,
    FaTruck,
    FaChevronDown
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
        navigate("/login");
    };

    const closeProfile = () => {
        setProfileOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="navbar">

            {/* Logo */}

            <div className="navbar-left">

                <div
                    className="navbar-logo"
                    onClick={() => navigate("/dashboard")}
                >
                    <FaTruck />

                    <div>
                        <h2>SMARTMAP</h2>
                        <p>Smart Delivery Management</p>
                    </div>
                </div>

            </div>


            {/* Navigation */}

            <nav className="desktop-nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/deliveries"
                    className={({ isActive }) =>
                        isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Deliveries
                </NavLink>

                <NavLink
                    to="/deliveries/add"
                    className={({ isActive }) =>
                        isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Add Delivery
                </NavLink>

                <NavLink
                    to="/optimize"
                    className={({ isActive }) =>
                        isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Optimize Route
                </NavLink>

            </nav>


            {/* Profile */}

            <div
                className="navbar-profile-wrapper"
                ref={profileRef}
            >

                <button
                    className="navbar-profile"
                    onClick={() =>
                        setProfileOpen(!profileOpen)
                    }
                >

                    <FaUserCircle className="profile-icon" />

                    <div className="driver-info">
                        <h4>
                            {user?.name || "Surya"}
                        </h4>

                        <span>
                            Driver
                        </span>
                    </div>

                    <FaChevronDown
                        className={
                            profileOpen
                                ? "profile-arrow rotate"
                                : "profile-arrow"
                        }
                    />

                </button>


                {/* Profile Dropdown */}

                {profileOpen && (

                    <div className="profile-dropdown">

                        <div className="profile-dropdown-header">

                            <FaUserCircle />

                            <div>
                                <strong>
                                    {user?.name || "Surya"}
                                </strong>

                                <span>
                                    Driver
                                </span>
                            </div>

                        </div>


                        <div className="profile-dropdown-divider" />


                        <button
                            onClick={() => {
                                navigate("/profile");
                                closeProfile();
                            }}
                        >
                            View Profile
                        </button>


                        <button
                            onClick={() => {
                                navigate("/settings");
                                closeProfile();
                            }}
                        >
                            Settings
                        </button>


                        <div className="profile-dropdown-divider" />


                        <button
                            className="profile-logout"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>

                    </div>

                )}

            </div>

        </header>
    );
}

export default Navbar;