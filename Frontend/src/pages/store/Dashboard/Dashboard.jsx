import React from "react";
import DashboardStats from "./DashboardStats";
import SalesTrend from "./SalesTrend";
import RecentSales from "./RecentSales";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Store Dashboard</h2>
        <p className="text-gray-400">
          An overview of your store's performance.
        </p>
      </div>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesTrend />
        </div>
        <div>
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
