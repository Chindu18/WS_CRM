// AdminLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../../Navbar/nav";
import AdminSidebar from "../a-dasboard/a-dasboard";

export default function AdminLayout() {
  const location = useLocation();

  // ✅ Sidebar visible ONLY on dashboard route
  const isDashboard =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sidebar gets prop to control desktop visibility */}
      <AdminSidebar desktopVisible={isDashboard} />

      {/* ✅ Content area:
          - if sidebar visible → leave space md:ml-64
          - else → full width
      */}
      <main
        className={`
          pt-16 md:pt-0
          ${isDashboard ? "md:ml-64" : "md:ml-0"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
