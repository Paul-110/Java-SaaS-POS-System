import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Tag,
  BarChart2,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  GitBranch,
  ArrowUpCircle,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", path: "dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Sales", path: "sales", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Products", path: "products", icon: <Package className="w-5 h-5" /> },
  { name: "Categories", path: "categories", icon: <Tag className="w-5 h-5" /> },
  { name: "Branches", path: "branches", icon: <GitBranch className="w-5 h-5" /> },
  { name: "Employees", path: "employees", icon: <Users className="w-5 h-5" /> },
  { name: "Reports", path: "reports", icon: <BarChart2 className="w-5 h-5" /> },
  { name: "Alerts", path: "alerts", icon: <Bell className="w-5 h-5" /> },
];

const bottomLinks = [
  { name: "Settings", path: "settings", icon: <Settings className="w-5 h-5" /> },
  { name: "Upgrade Plan", path: "upgrade", icon: <ArrowUpCircle className="w-5 h-5" /> },
];

const StoreSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 p-4 z-20">
      <div className="h-full bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-6 px-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">{store?.brand || "POS Pro"}</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "dashboard"}
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

        <div className="mt-auto space-y-1 pt-2 border-t border-white/10">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
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
};

export default StoreSidebar;
