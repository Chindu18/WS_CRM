// // ManagerLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../../../Navbar/nav";
// import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";

// export default function ManagerLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar userRole="Manager" />
//       <ManagerSidebar />

//       {/* ✅ right side content area */}
      
        

//         {/* ✅ push page content below sticky navbar */}
//         <main className="pt-16 md:pt-0 md:ml-64">
//           {/* pt-16 = navbar height (4rem) */}
//           <Outlet />
//         </main>
      
//     </div>
//   );
// }

// ManagerLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../../Navbar/nav";
import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";

export default function ManagerLayout() {
  const location = useLocation();

  // ✅ Sidebar visible ONLY on dashboard route
  const isDashboard =
    location.pathname === "/manager" || location.pathname === "/manager/";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="Manager" />

      {/* Sidebar gets a prop to control desktop visibility */}
      <ManagerSidebar desktopVisible={isDashboard} />

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
