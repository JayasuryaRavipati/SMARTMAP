import StatsCards from "../components/StatsCards";
import QuickActions from "../components/QuickActions";
import DeliveryTable from "../components/DeliveryTable";
import MapView from "../components/MapView";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <StatsCards />

      <QuickActions />

      <div className="dashboard-map">
        <MapView />
      </div>

      <DeliveryTable />
    </>
  );
}

export default Dashboard;