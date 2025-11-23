import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FileText, BarChart2, Users, Package, Download, GitBranch } from "lucide-react";

const reportTypes = [
  {
    title: "Overall Sales Report",
    description: "Aggregated sales data from all branches, including revenue and profit.",
    icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Branch Performance",
    description: "Compare sales, orders, and revenue between different branches.",
    icon: <GitBranch className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Product Performance",
    description: "Insights into top-selling products and category performance across the store.",
    icon: <Package className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Employee Sales Report",
    description: "Track sales performance for individual employees across all branches.",
    icon: <Users className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Inventory Summary",
    description: "A complete overview of stock levels for all products in all branches.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Tax & GST Report",
    description: "Consolidated tax reports for easy filing and reconciliation.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Reports</h2>
        <p className="text-gray-400">
          Generate and download consolidated reports for your entire store.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report, index) => (
          <Card key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 text-white flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                {report.icon}
              </div>
              <CardTitle className="text-lg font-semibold text-white">{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-gray-400">{report.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
