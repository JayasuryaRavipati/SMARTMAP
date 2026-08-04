import { Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deliveries from "./pages/Deliveries";
import AddDelivery from "./pages/AddDelivery";
import Profile from "./pages/Profile";
import MyDeliveries from "./pages/Deliveries";
import DeliveryDetails from "./pages/DeliveryDetails";
// import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import EditDelivery from "./pages/EditDelivery";
import OptimizeRoute from "./pages/RouteOptimizer";

function App() {
  return (
    <Routes>
      {/* Splash */}
      <Route path="/" element={<Splash />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deliveries"
        element={
          <ProtectedRoute>
            <Deliveries />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deliveries/add"
        element={
          <ProtectedRoute>
            <AddDelivery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Redirect */}
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* <Route path="/profile" element={<Profile />} /> */}

      {/* <Route path="/deliveries" element={<Deliveries />} /> */}
      <Route
    path="/deliveries/:id"
    element={<DeliveryDetails />}
/>
<Route
    path="/deliveries/edit/:id"
    element={<EditDelivery />}
/>
<Route path="/optimize" element={<OptimizeRoute />} />

    </Routes>
  );
}

export default App;