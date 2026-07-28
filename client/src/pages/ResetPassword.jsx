import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const location = useLocation();

const email = location.state?.email;

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/reset-password", {
  email,
  password: form.password,
});

      toast.success("Password Updated!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Reset failed"
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="login-page">
        <div className="login-card">

          <h2>Reset Password</h2>

          <form onSubmit={handleSubmit}>

            {/* <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            /> */}

            <div className="password-box">

              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="New Password"
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <input
              type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <button className="login-btn">
              Update Password
            </button>

          </form>

        </div>
      </div>

    </>
  );
}

export default ResetPassword;