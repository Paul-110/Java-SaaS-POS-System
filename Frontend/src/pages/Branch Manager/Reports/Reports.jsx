import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart2, Users, Package, Download } from "lucide-react";
import jsPDF from "jspdf";

const reportTypes = [
  {
    title: "Sales Report",
    description: "Detailed breakdown of sales, revenue, and profit over a selected period.",
    icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Inventory Report",
    description: "Summary of stock levels, low-stock items, and inventory valuation.",
    icon: <Package className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Customer Report",
    description: "Insights into customer behavior, purchase history, and loyalty.",
    icon: <Users className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Employee Performance",
    description: "Track sales per employee, shift performance, and other metrics.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Transaction Report",
    description: "A complete log of all transactions, including payment methods and details.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Tax Report",
    description: "GST-compliant reports for easy tax filing and reconciliation.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
  },
];

export default function Reports() {
  const handleGenerateReport = (reportTitle) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(22);
    doc.text(`${reportTitle}`, 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text("This is a placeholder for the report content.", 105, 30, null, null, "center");
    doc.text("In a real application, this PDF would be populated with actual report data.", 105, 35, null, null, "center");

    // Save the PDF with a dynamic filename
    doc.save(`${reportTitle.replace(/ /g, "_")}.pdf`);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-white">Reports</h2>
        <p className="text-gray-400">
          Generate and download detailed reports for your branch.
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
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => handleGenerateReport(report.title)}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
