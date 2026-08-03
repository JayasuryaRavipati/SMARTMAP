import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRoute } from "react-icons/fa";

import "../styles/Splash.css";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");

      if (token) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>

      <div className="splash-card">

        <div className="logo-circle">
          <FaRoute />
        </div>

        <h1>SMARTMAP</h1>

        <p>
          Intelligent Route Optimization
          <br />
          for Delivery Drivers
        </p>

        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
}

export default Splash;