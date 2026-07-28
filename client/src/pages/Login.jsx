import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTruck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

     const user = await login(
  data.email,
  data.password,
  data.remember
);

toast.success("Login Successful!");

setTimeout(() => {
  if (user.role === "Driver") {
    navigate("/driver-dashboard");
  } else {
    navigate("/dashboard");
  }
}, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
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
          transition={{ duration: 0.6 }}
        >

          <div className="logo">
            <FaTruck />
          </div>

          <h1>RouteIQ</h1>

          <p>Smart Delivery Route Optimization</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <span>{errors.email?.message}</span>

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <span>{errors.password?.message}</span>

            <div className="options">

              <label>

                <input
                  type="checkbox"
                  {...register("remember")}
                />

                Remember Me

              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="signup-link">

            Don't have an account?

            <Link to="/signup">
              Create Account
            </Link>

          </div>

        </motion.div>

      </div>
    </>
  );
}

export default Login;