// import React from "react";
// import { Link } from "react-router-dom";
// export default function Header() {
//     return (
//         <>
//             <header>
//                 <nav className="flex items-center justify-center px-4 py-6 bg-blue-300">
//                     <div className="flex gap-4">
//                         <Link to="/login" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">login</Link>
//                         <Link to="/salesexecutive" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Sales Executive</Link>
//                         <Link to="/teamlead" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Team Lead</Link>
//                         <Link to="/manager" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Manager</Link>
//                         <Link to="/admin" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">admin</Link>
//                     </div>
//                 </nav>
//             </header>
//         </>
//     )
// }


import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const setRole = (role, name) => {
    localStorage.setItem(
      "crm_user",
      JSON.stringify({ role, name })
    );
  };

  return (
    <header>
      <nav className="flex items-center justify-center px-4 py-6 bg-blue-300">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/salesexecutive"
            onClick={() => setRole("Sales Executive", "Sales Executive")}
            className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white"
          >
            Sales Executive
          </Link>

          <Link
            to="/teamlead"
            onClick={() => setRole("Team Lead", "Team Lead")}
            className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white"
          >
            Team Lead
          </Link>

          <Link
            to="/manager"
            onClick={() => setRole("Manager", "Manager")}
            className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white"
          >
            Manager
          </Link>

          <Link
            to="/admin"
            onClick={() => setRole("Admin", "Admin")}
            className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white"
          >
            Admin
          </Link>

          <Link
            to="/login"
            onClick={() => {
              localStorage.removeItem("crm_user");
            }}
            className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
