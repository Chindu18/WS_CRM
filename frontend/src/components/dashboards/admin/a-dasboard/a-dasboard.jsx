// AdminSidebar.jsx (FULL UPDATED CODE — heading moved downward)

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Leads", path: "/admin/lead-list" },
  { name: "Pipeline", path: "/admin/pipeline" },
  { name: "Calls", path: "/admin/call" },
  { name: "Payments", path: "/admin/payment" },
  { name: "Reports", path: "/admin/report" },
  { name: "Automations", path: "/admin/automation" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar({ desktopVisible = true }) {
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
        className={`fixed top-4 left-4 bar inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow
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
            hidden md:fixed md:left-0 md:top-16
            md:w-64 md:bg-white md:shadow-md
            md:px-4 md:pb-4 md:pt-8   /* ✅ more top padding */
            md:flex md:flex-col
            md:h-[calc(100vh-4rem)] md:z-40
          "
          aria-label="admin sidebar"
        >
          {/* ✅ Heading moved downward */}
          <h2 className="text-xl font-bold mb-6">Admin</h2>

          <nav className="flex-1 bar-box overflow-y-auto pr-1">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navClass}
                    end={item.path === "/admin"} 
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
          onMouseOver={() => setOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-200 ${
            open ? "opacity-30" : "opacity-0"
          }`}
        />

        {/* drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile admin sidebar"
          className="
            absolute left-0 top-0 bottom-0 bg-white shadow-lg
            transition-transform duration-300 ease-in-out
            flex flex-col
            px-4 pb-4 pt-16   /* ✅ heading moved down */
          "
          style={{
            width: drawerWidth,
            transform: open ? "translateX(0)" : "translateX(-110%)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Admin</h2>
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
                    end={item.path === "/admin"}
                    onClick={() => setOpen(false)}
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

