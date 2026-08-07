import {
  FaTruck,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* Logo */}

        <div className="footer-logo">

          <FaTruck className="footer-truck" />

          <h2>SMARTMAP</h2>

        </div>

        <p className="footer-tagline">
          Smart Delivery & Route Optimization Platform
        </p>

        {/* Footer Sections */}

        <div className="footer-grid">

          {/* Platform */}

          <div className="footer-column">

            <h3>Platform</h3>

            <a href="/dashboard">Dashboard</a>

            <a href="/deliveries">My Deliveries</a>

            <a href="/deliveries/add">Add Delivery</a>

            <a href="/optimize">Optimize Route</a>

            <a href="/profile">Profile</a>

          </div>

          {/* Resources */}

          <div className="footer-column">

            <h3>Resources</h3>

            <a href="#">Documentation</a>

            <a href="#">API</a>

            <a href="#">Help Center</a>

            <a href="#">Privacy Policy</a>

            <a href="#">Terms</a>

          </div>

          {/* Company */}

          <div className="footer-column">

            <h3>Company</h3>

            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=suryaravipati556@gmail.com"
  target="_blank"
  rel="noreferrer"
>
  <FaEnvelope />
  Contact
</a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} SMARTMAP. All Rights Reserved.
        </span>

        <span>
          Version 1.0.0
        </span>

      </div>

    </footer>
  );
}

export default Footer;