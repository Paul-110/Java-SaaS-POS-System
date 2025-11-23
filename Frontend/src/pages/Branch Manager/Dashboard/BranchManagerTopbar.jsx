import React from "react";
import { useSelector } from "react-redux";
import { Bell, User, ShoppingBag, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    icon: <ShoppingBag className="h-4 w-4 text-emerald-400" />,
    title: "New Order #12345",
    description: "A new order for ₹1,250 has been placed.",
  },
  {
    icon: <Package className="h-4 w-4 text-yellow-400" />,
    title: "Low Stock Alert",
    description: "Product 'Milk' is running low. Only 5 left.",
  },
  {
    icon: <CheckCircle className="h-4 w-4 text-blue-400" />,
    title: "Shift Summary Ready",
    description: "Your previous shift summary is ready for review.",
  },
];

export default function BranchManagerTopbar() {
  const { userProfile } = useSelector((state) => state.user);
  const { branch } = useSelector((state) => state.branch);

  return (
    <header className="h-20 px-6 md:px-8 lg:px-10 flex-shrink-0 z-20">
      <div className="h-full flex items-center justify-between bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl px-6">
        <div>
          <h1 className="text-xl font-semibold text-white">
          {branch ? branch.name : "Branch Dashboard"}
        </h1>
          <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
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
                  <div className="p-2 bg-black/20 rounded-full mt-1">
                    {notification.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-400">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="bg-white/10" />
            <div className="p-2 text-center">
              <Button variant="link" className="text-emerald-400 hover:text-emerald-300 text-sm">View all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">{userProfile?.fullName || "Branch Manager"}</p>
            <p className="text-xs text-gray-400">{userProfile?.email || "manager@example.com"}</p>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}