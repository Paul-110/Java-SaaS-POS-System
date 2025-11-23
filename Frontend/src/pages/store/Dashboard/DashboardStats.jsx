import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹4,52,318",
    change: "+20.1% from last month",
    icon: <DollarSign className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "Total Sales",
    value: "+1,230",
    change: "+18.1% from last month",
    icon: <ShoppingCart className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "New Customers",
    value: "+573",
    change: "+19% from last month",
    icon: <Users className="h-4 w-4 text-gray-400" />,
  },
  {
    title: "Active Branches",
    value: "12",
    change: "+2 since last month",
    icon: <TrendingUp className="h-4 w-4 text-gray-400" />,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 text-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-400">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
