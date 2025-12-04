// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../../../Navbar/nav";
// import SalesSidebar from "../Sidebar/SalesSidebar";

// export default function SalesLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//         <Navbar />
//       <SalesSidebar/>

      
//         <main className="pt-16 md:pt-0 md:ml-64">
//           <Outlet />
//         </main>
      
//     </div>
//   );
// }


// SalesLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../../Navbar/nav";
import SalesSidebar from "../Sidebar/SalesSidebar";

export default function SalesLayout() {
  const location = useLocation();

  // ✅ Sidebar visible ONLY on dashboard route
  const isDashboard =
    location.pathname === "/salesexecutive" ||
    location.pathname === "/salesexecutive/";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sidebar gets prop to control desktop visibility */}
      <SalesSidebar desktopVisible={isDashboard} />

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
