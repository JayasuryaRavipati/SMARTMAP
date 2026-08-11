import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../styles/Layout.css";

function Layout() {
  return (
    <div className="layout">

      <Navbar />

      <div className="layout-content">

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default Layout;