import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyDeliveries from "./pages/Deliveries";
import AddDelivery from "./pages/AddDelivery";
import EditDelivery from "./pages/EditDelivery";
import DeliveryDetails from "./pages/DeliveryDetails";
import RouteOptimizer from "./pages/RouteOptimizer";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/deliveries" element={<MyDeliveries />} />

        <Route
          path="/deliveries/add"
          element={<AddDelivery />}
        />

        <Route
          path="/deliveries/edit/:id"
          element={<EditDelivery />}
        />

        <Route
          path="/deliveries/:id"
          element={<DeliveryDetails />}
        />

        <Route
          path="/optimize"
          element={<RouteOptimizer />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;