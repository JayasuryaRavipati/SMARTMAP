// import {
//   FaHome,
//   FaRoute,
//   FaBox,
//   FaTruck,
//   FaChartBar,
//   FaCog,
//   FaUser,
//   FaSignOutAlt,
// } from "react-icons/fa";

// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import "./Sidebar.css";

// function Sidebar() {
//     const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };
//   return (
//     <div className="sidebar">
//       <div className="logo">
//         🚚 <span>RouteIQ</span>
//       </div>

//       <ul className="menu">
//        <NavLink to="/dashboard" className="menu-link">
//   <li>
//     <FaHome />
//     <span>Dashboard</span>
//   </li>
// </NavLink>
// <NavLink to="/profile" className="menu-link">
//   <li>
//     <FaUser />
//     <span>Profile</span>
//   </li>
// </NavLink>

//         <li>
//           <FaRoute />
//           <span>Routes</span>
//         </li>

//         <li>
//   <NavLink to="/deliveries" className="menu-link">
//   <li>
//     <FaBox />
//     <span>Deliveries</span>
//   </li>
// </NavLink>

// <NavLink to="/deliveries/add" className="menu-link">
//   <li>
//     <FaBox />
//     <span>Add Delivery</span>
//   </li>
// </NavLink>

//         <li>
//           <FaTruck />
//           <span>Drivers</span>
//         </li>

//         <li>
//           <FaChartBar />
//           <span>Analytics</span>
//         </li>

//         <li>
//           <FaCog />
//           <span>Settings</span>
//         </li>
        

//         <li className="logout" onClick={handleLogout}>
//       <FaSignOutAlt />
//       <span>Logout</span>
//     </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
import {
  FaHome,
  FaRoute,
  FaBox,
  FaTruck,
  FaChartBar,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {
    const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="logo">
        🚚 <span>RouteIQ</span>
      </div>

     <ul className="menu">

  <li>
    <NavLink to="/dashboard" className="menu-link">
      <FaHome />
      <span>Dashboard</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/profile" className="menu-link">
      <FaUser />
      <span>Profile</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/routes" className="menu-link">
      <FaRoute />
      <span>Routes</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/deliveries" className="menu-link">
      <FaBox />
      <span>Deliveries</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/deliveries/add" className="menu-link">
      <FaBox />
      <span>Add Delivery</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/drivers" className="menu-link">
      <FaTruck />
      <span>Drivers</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/analytics" className="menu-link">
      <FaChartBar />
      <span>Analytics</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/settings" className="menu-link">
      <FaCog />
      <span>Settings</span>
    </NavLink>
  </li>

  <li className="logout" onClick={handleLogout}>
    <FaSignOutAlt />
    <span>Logout</span>
  </li>

</ul>
    </div>
  );
}

export default Sidebar;