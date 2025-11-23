import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useSidebar } from "../../../context/hooks/useSidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell, ShoppingBag, Package, CheckCircle } from "lucide-react";

const notifications = [
  {
    icon: <ShoppingBag className="h-4 w-4 text-emerald-400" />,
    title: "New Order #10345",
    description: "A new order for ₹1,950 has been placed.",
  },
  {
    icon: <Package className="h-4 w-4 text-yellow-400" />,
    title: "Low Stock Alert",
    description: "Product 'Shirt-345' is running low. Only 5 left.",
  },
  {
    icon: <CheckCircle className="h-4 w-4 text-blue-400" />,
    title: "Shift Summary Ready",
    description: "Your previous shift summary is ready for review.",
  },
];

const POSHeader = () => {
  const { setSidebarOpen } = useSidebar();
  return (
    <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Button
            className="z-10 p-2 rounded shadow-lg bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">POS Terminal</h1>
          <p className="text-sm text-gray-400">Create new order</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="hidden md:inline-flex text-xs bg-black/20 border-white/10 text-gray-300"
          >
            F1: Search | F2: Discount | F3: Customer | Ctrl+Enter: Payment
          </Badge>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-emerald-500 text-white">
                  {notifications.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-0">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <Separator className="bg-white/10" />
              <div className="p-2 max-h-80 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5">
                    <div className="p-2 bg-black/20 rounded-full mt-1">{notification.icon}</div>
                    <div>
                      <p className="font-semibold text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-400">{notification.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default POSHeader;
