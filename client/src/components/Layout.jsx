import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import "../styles/Layout.css";

function Layout() {
  return (
    <div className="layout">

      {/* Fixed Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="layout-body">

        <Sidebar />

        <div className="layout-content">

          <main className="page-content">
            <Outlet />
          </main>

        </div>

      </div>

      {/* Full Width Footer */}
      <Footer />

    </div>
  );
}

export default Layout;