import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import MapView from "../components/MapView";
import DeliveryTable from "../components/DeliveryTable";
import {
    FaTruck,
    FaUsers,
    FaClock,
    FaCheckCircle
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="content">

          <h1>Welcome to RouteIQ</h1>

          <div className="cards">

    <DashboardCard
        title="Total Deliveries"
        value="125"
        icon={<FaTruck />}
        color="#2563EB"
    />

    <DashboardCard
        title="Drivers Online"
        value="18"
        icon={<FaUsers />}
        color="#10B981"
    />

    <DashboardCard
        title="Pending Orders"
        value="20"
        icon={<FaClock />}
        color="#F59E0B"
    />

    <DashboardCard
        title="Completed"
        value="105"
        icon={<FaCheckCircle />}
        color="#8B5CF6"
    />
    

</div>

         <div className="map-section">
  <MapView />
</div>

          <DeliveryTable />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;