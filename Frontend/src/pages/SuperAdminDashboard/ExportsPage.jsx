import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Download, FileText, Calendar, Filter, CheckCircle } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
// import { useToast } from "../../hooks/use-toast";

const exportTypes = [
  {
    id: "store-list",
    name: "Store List",
    description: "Complete list of all stores with basic information",
    format: "CSV",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "store-status",
    name: "Store Status Summary",
    description: "Summary of store statuses and registration dates",
    format: "Excel",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "commission-report",
    name: "Commission Report",
    description: "Detailed commission earnings and rates for all stores",
    format: "Excel",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "pending-requests",
    name: "Pending Requests",
    description: "List of all pending store registration requests",
    format: "CSV",
    icon: <FileText className="w-5 h-5" />,
  },
];

const recentExports = [
  {
    id: 1,
    type: "Store List",
    date: "2025-01-15 14:30",
    status: "completed",
    size: "2.3 MB",
    downloads: 3,
  },
  {
    id: 2,
    type: "Commission Report",
    date: "2025-01-14 09:15",
    status: "completed",
    size: "1.8 MB",
    downloads: 1,
  },
  {
    id: 3,
    type: "Store Status Summary",
    date: "2025-01-13 16:45",
    status: "completed",
    size: "1.2 MB",
    downloads: 2,
  },
];

export default function ExportsPage() {
  const [selectedType, setSelectedType] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!selectedType) {
      toast({
        title: "Select Export Type",
        description: "Please select an export type to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const exportType = exportTypes.find(type => type.id === selectedType);
      toast({
        title: "Export Started",
        description: `${exportType.name} export has been initiated. You'll receive a notification when it's ready.`,
      });
      setIsExporting(false);
      setSelectedType("");
      setDateRange({ from: "", to: "" });
    }, 2000);
  };

  const handleDownload = (exportId) => {
    toast({
      title: "Download Started",
      description: "Your file download has begun.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Exports</h2>
        <p className="text-gray-400">
          Export store data and generate reports
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export Configuration */}
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="flex items-center gap-2 text-white">
              <Download className="w-5 h-5" />
              Create New Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-type" className="text-gray-300">Export Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select export type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg">
                  {exportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-400">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-from" className="text-gray-300">From Date</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-to" className="text-gray-300">To Date</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                />
              </div>
            </div>

            <Button 
              onClick={handleExport} 
              disabled={isExporting || !selectedType}
              className="w-full bg-emerald-600 hover:bg-emerald-500"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Export
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Export Types Info */}
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">Available Export Types</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {exportTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-start gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5"
                >
                  <div className="text-gray-400 mt-1">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{type.name}</h4>
                      <Badge variant="outline" className="text-xs border-white/20">
                        {type.format}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white">Recent Exports</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {recentExports.map((exportItem) => (
              <div
                key={exportItem.id}
                className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/20"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{exportItem.type}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exportItem.date}
                      </span>
                      <span>{exportItem.size}</span>
                      <span>{exportItem.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline"
                    className="flex items-center gap-1 bg-green-500/10 text-green-300 border-green-500/20"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {exportItem.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm" className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleDownload(exportItem.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {recentExports.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No recent exports found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 