import { Outlet, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  ShoppingCartIcon,
  ClockIcon,
  RotateCcwIcon,
  UsersIcon,
  ReceiptIcon,
} from "lucide-react";
import CashierSideBar from "./Sidebar/CashierSideBar";
import { SidebarProvider } from "../../context/SidebarProvider";
import { useSidebar } from "../../context/hooks/useSidebar";

const navItems = [
  {
    path: "/cashier",
    icon: <ShoppingCartIcon size={20} />,
    label: "POS Terminal",
  },
  {
    path: "/cashier/orders",
    icon: <ClockIcon size={20} />,
    label: "Order History",
  },
  {
    path: "/cashier/returns",
    icon: <RotateCcwIcon size={20} />,
    label: "Returns/Refunds",
  },
  {
    path: "/cashier/customers",
    icon: <UsersIcon size={20} />,
    label: "Customers",
  },
  {
    path: "/cashier/shift-summary",
    icon: <ReceiptIcon size={20} />,
    label: "Shift Summary",
  },
];

const LayoutContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Preparing Shift Summary",
      description: "Redirecting to shift summary page...",
    });
    navigate("/cashier/shift-summary");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-60" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)` }}><div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/70 rounded-full filter blur-3xl animate-blob"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)` }}><div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/70 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)` }}><div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500/70 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)` }}><div className="absolute -bottom-24 right-20 w-96 h-96 bg-teal-500/60 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -5}px)` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div></div>
      </div>
      <style>{`@keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } } .animate-blob { animation: blob 7s infinite; } .animation-delay-2000 { animation-delay: 2s; } .animation-delay-3000 { animation-delay: 3s; } .animation-delay-4000 { animation-delay: 4s; } .animation-delay-5000 { animation-delay: 5s; }`}</style>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div
        className={`fixed lg:relative z-30 h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <CashierSideBar
          navItems={navItems}
          handleLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden z-10 bg-black/10">
        <Outlet />
      </main>
    </div>
  );
};

const CashierDashboardLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default CashierDashboardLayout;
