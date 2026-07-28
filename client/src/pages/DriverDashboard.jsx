// import { useEffect, useState } from "react";
// import API from "../services/api";

// function DriverDashboard() {
//   const [deliveries, setDeliveries] = useState([]);

//   useEffect(() => {
//     fetchMyDeliveries();
//   }, []);

//   const fetchMyDeliveries = async () => {
//     try {
//       const res = await API.get("/deliveries/my-deliveries");
//       setDeliveries(res.data.deliveries);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>My Deliveries</h1>

//       {deliveries.map((delivery) => (
//         <div
//           key={delivery._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//           }}
//         >
//           <h3>{delivery.customerName}</h3>

//           <p>{delivery.address}</p>

//           <p>Status: {delivery.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DriverDashboard;

import Sidebar from "../components/Sidebar";
import DriverMap from "../components/DriverMap";
import DriverDeliveries from "../components/DriverDeliveries";

function DriverDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Driver Dashboard</h1>

        <DriverDeliveries />

        <DriverMap />
      </div>
    </div>
  );
}

export default DriverDashboard;