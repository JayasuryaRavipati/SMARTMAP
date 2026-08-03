import {
  FaHome,
  FaBox,
  FaPlusCircle,
  FaRoute,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import Profile from "./pages/Profile";
import "../styles/Sidebar.css";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
   {
  name: "My Deliveries",
  path: "/deliveries",
},
    {
      name: "Add Delivery",
      icon: <FaPlusCircle />,
      path: "/deliveries/add",
    },
    {
      name: "Optimize Route",
      icon: <FaRoute />,
      path: "/optimize",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-circle">
          🚚
        </div>

        <div>
          <h2>SMARTMAP</h2>
          <p>Driver Panel</p>
        </div>
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;