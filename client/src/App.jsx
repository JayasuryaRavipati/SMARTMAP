import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Splash from "./pages/Splash";

import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AddDelivery from "./pages/AddDelivery";
import Deliveries from "./pages/Deliveries";
import DriverDashboard from "./pages/DriverDashboard";
import socket from "./services/socket";
// import DriverDashboard from "./pages/DriverDashboard";

function App() {
   useEffect(() => {

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };

  }, []);
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
      

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/deliveries/add" element={<AddDelivery />} />
      <Route
    path="/deliveries"
    element={<Deliveries />}
/>
<Route
  path="/driver-dashboard"
  element={
    <ProtectedRoute>
      <DriverDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/driver-dashboard"
  element={<DriverDashboard />}
/>
    </Routes>
  );
}

export default App;