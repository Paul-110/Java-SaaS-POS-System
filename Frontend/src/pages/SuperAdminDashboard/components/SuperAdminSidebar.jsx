import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  Store,
  Settings,
  FileText,
  Clock,
  LogOut,
  ShoppingCart,
} from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "stores",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Subscription Plans",
    path: "subscriptions",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Pending Requests",
    path: "requests",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function SuperAdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 p-4 z-20">
      <div className="h-full bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">POS Pro</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "dashboard"} // Ensure only exact match for dashboard
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
} 