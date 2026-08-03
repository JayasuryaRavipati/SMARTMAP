import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import QuickActions from "../components/QuickActions";
import DeliveryTable from "../components/DeliveryTable";
import MapView from "../components/MapView";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="dashboard-content">

          <div className="dashboard-header">
            <h1>Driver Dashboard</h1>
            <p>
              Welcome back! Manage your deliveries and optimize today's route.
            </p>
          </div>

          <StatsCards />

          <QuickActions />

          <div className="dashboard-map">
            <MapView />
          </div>

          <DeliveryTable />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;