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
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/deliveries"
          element={<MyDeliveries />}
        />

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

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* Invalid URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;