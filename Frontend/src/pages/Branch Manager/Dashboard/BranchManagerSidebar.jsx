import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Package,
  Users,
  UserCircle,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    path: "/branch/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Orders",
    path: "/branch/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    name: "Refunds",
    path: "/branch/refunds",
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    name: "Transactions",
    path: "/branch/transactions",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "Inventory",
    path: "/branch/inventory",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/branch/employees",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Customers",
    path: "/branch/customers",
    icon: <UserCircle className="w-5 h-5" />,
  },
  {
    name: "Reports",
    path: "/branch/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/branch/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function BranchManagerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 p-4 z-20">
      <div className="h-full bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Branch Manager</span>
        </div>
        {branch && (
          <div className="mb-6 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-medium text-white">{branch.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{branch.address}</p>
          </div>
        )}
        <nav className="flex-1 overflow-y-auto space-y-2">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group text-base font-medium ${
                    location.pathname.startsWith(link.path)
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      location.pathname.startsWith(link.path)
                        ? "text-white"
                        : "text-gray-500 group-hover:text-white"
                    }`}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 rounded-lg transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300 text-base font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}