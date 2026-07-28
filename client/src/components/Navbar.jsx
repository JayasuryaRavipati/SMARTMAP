import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="navbar">

      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search deliveries, drivers..."
        />
      </div>

      <div className="nav-right">

        <div className="notification">
          <FaBell />
        </div>

        <div className="profile">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>{user?.name || "Guest"}</h4>
            <p>{user?.role || "User"}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;