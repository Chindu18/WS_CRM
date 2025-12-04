// TeamLeadLayout.jsx
import React from "react";
import Navbar from "../../../Navbar/nav";
import TeamleadSidebar from "../SideBar/TlDashboard";
import { Outlet, useLocation } from "react-router-dom";

export default function TeamLeadLayout() {
  const location = useLocation();

  // ✅ Sidebar visible ONLY on dashboard route
  const isDashboard =
    location.pathname === "/teamlead" ||
    location.pathname === "/teamlead/";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sidebar gets prop to control desktop visibility */}
      <TeamleadSidebar desktopVisible={isDashboard} />

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
