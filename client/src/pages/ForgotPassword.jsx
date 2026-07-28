import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import API from "../services/api";

import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

     await API.post("/auth/forgot-password", {
  email,
});

toast.success("Email verified");

setTimeout(() => {
  navigate("/reset-password", {
    state: { email },
  });
}, 1000);

// toast.success("Email verified");

// setTimeout(() => {
//   navigate("/reset-password", {
//     state: { email },
//   });
// }, 1000);

      toast.success("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login-page">

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="logo">
            <FaTruck />
          </div>

          <h1>Forgot Password</h1>

          <p>Enter your registered email</p>

          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Reset Password"}
            </button>

          </form>

          <div className="signup-link">

            <Link to="/login">

              Back to Login

            </Link>

          </div>

        </motion.div>

      </div>
    </>
  );
}

export default ForgotPassword;