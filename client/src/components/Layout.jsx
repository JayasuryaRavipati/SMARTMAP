import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../styles/Layout.css";

function Layout() {
  return (
    <div className="layout">

      <Navbar />

      <main className="layout-content">
        <div className="page-content">
          <Outlet />
        </div>

        <Footer />
      </main>

    </div>
  );
}

export default Layout;