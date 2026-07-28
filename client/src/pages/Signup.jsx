import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTruck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import API from "../services/api";

import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await API.post("/auth/signup", {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        driverId: data.driverId,
        role: data.role,
        password: data.password,
      });

      toast.success("Account Created Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup Failed"
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
          <p>Create Your Account</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <span>{errors.name?.message}</span>

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <span>{errors.email?.message}</span>

            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
            <span>{errors.mobile?.message}</span>

            <label>Driver ID (Optional)</label>
            <input
              type="text"
              placeholder="Driver ID"
              {...register("driverId")}
            />

            <label>Role</label>
            <select {...register("role")}>
              <option value="Driver">Driver</option>
              <option value="Manager">Manager</option>
            </select>

            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <span>{errors.password?.message}</span>

            <label>Confirm Password</label>

            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <span>{errors.confirmPassword?.message}</span>

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <div className="signup-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </div>

        </motion.div>

      </div>
    </>
  );
}

export default Signup;