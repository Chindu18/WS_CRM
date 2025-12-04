// TeamleadSidebar.jsx (FULL FIXED CODE)

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/teamlead" },
  { name: "Leads", path: "/teamlead/lead-list" },
  { name: "Pipeline", path: "/teamlead/pipeline" },
  { name: "Calls", path: "/teamlead/call" },
  { name: "Payments", path: "/teamlead/payment" },
  { name: "Reports", path: "/teamlead/report" },
  { name: "Automations", path: "/teamlead/automation" },
];

export default function TeamleadSidebar({ desktopVisible = true }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navClass = ({ isActive }) =>
    `block px-4 py-3 rounded-2xl transition-colors cursor-pointer font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-md scale-[1.02]"
        : "text-gray-700 hover:bg-blue-50 hover:text-black"
    }`;

  const drawerWidth = "min(75vw, 320px)";

  return (
    <>
      {/* Toggle button */}
      <button
        onMouseOver={() => setOpen(true)}
        aria-label="Open menu"
        className={`fixed top-4 bar left-4 z-[60] inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow
          ${desktopVisible ? "md:hidden" : ""}
        `}
        style={{ touchAction: "manipulation" }}
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Desktop sidebar */}
      {desktopVisible && (
        <aside
          className="
            hidden md:fixed
            md:left-0 md:top-16
            md:w-64 md:bg-white md:shadow-md md:p-4
            md:flex md:flex-col md:z-40
            md:h-[calc(100vh-4rem)]
          "
          aria-label="teamlead sidebar"
        >
          <h2 className="text-xl font-bold mb-6">Team Lead</h2>

          <nav className="flex-1 bar-box overflow-y-auto pr-1">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navClass}
                    end={item.path === "/teamlead"}   // ✅ FIX HERE
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-200 ${
            open ? "opacity-30" : "opacity-0"
          }`}
        />

        {/* drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile teamlead sidebar"
          className="
            absolute left-0 top-0 bottom-0 bg-white shadow-lg
            transition-transform duration-300 ease-in-out flex flex-col
            px-4 pb-4 pt-16
          "
          style={{
            width: drawerWidth,
            transform: open ? "translateX(0)" : "translateX(-110%)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Team Lead</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto pr-1">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navClass}
                    onClick={() => setOpen(false)}
                    end={item.path === "/teamlead"}  // ✅ FIX HERE TOO
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
