import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { DollarSign, Edit, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
// import { useToast } from "../../hooks/use-toast";

// Mock commission data
const mockCommissions = [
  {
    id: 1,
    storeName: "Zosh Mart",
    currentRate: 2.5,
    previousRate: 2.0,
    totalEarnings: 12500,
    lastUpdated: "2025-01-10",
    status: "active",
  },
  {
    id: 2,
    storeName: "ABC Supermarket",
    currentRate: 3.0,
    previousRate: 3.0,
    totalEarnings: 8900,
    lastUpdated: "2025-01-08",
    status: "active",
  },
  {
    id: 3,
    storeName: "Fresh Groceries",
    currentRate: 2.0,
    previousRate: 2.5,
    totalEarnings: 15600,
    lastUpdated: "2025-01-12",
    status: "active",
  },
];

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newRate, setNewRate] = useState("");
  const { toast } = useToast();

  const handleEditCommission = (commission) => {
    setSelectedCommission(commission);
    setNewRate(commission.currentRate.toString());
    setEditDialogOpen(true);
  };

  const confirmEditCommission = () => {
    if (selectedCommission && newRate) {
      const rate = parseFloat(newRate);
      if (isNaN(rate) || rate < 0 || rate > 10) {
        toast({
          title: "Invalid Rate",
          description: "Commission rate must be between 0% and 10%",
          variant: "destructive",
        });
        return;
      }

      setCommissions(prev => prev.map(comm => 
        comm.id === selectedCommission.id 
          ? { ...comm, currentRate: rate, lastUpdated: new Date().toISOString().split('T')[0] }
          : comm
      ));

      toast({
        title: "Commission Updated",
        description: `Commission rate for ${selectedCommission.storeName} has been updated to ${rate}%`,
      });

      setEditDialogOpen(false);
      setSelectedCommission(null);
      setNewRate("");
    }
  };

  const getRateChange = (current, previous) => {
    const change = current - previous;
    if (change > 0) {
      return { value: `+${change}%`, className: "text-green-600", icon: <TrendingUp className="w-3 h-3" /> };
    } else if (change < 0) {
      return { value: `${change}%`, className: "text-red-600", icon: <TrendingDown className="w-3 h-3" /> };
    } else {
      return { value: "0%", className: "text-gray-600", icon: null };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Commissions</h2>
        <p className="text-gray-400">
          Manage commission rates for all stores
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹37,000</div>
            <p className="text-xs text-gray-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Average Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
            <p className="text-xs text-gray-400">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Stores</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commissions.length}</div>
            <p className="text-xs text-gray-400">
              All stores have commission rates set
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
        <CardHeader className="border-b border-white/10">
          <CardTitle>Store Commission Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-t border-white/10 -mx-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-black/40 border-b-white/10">
                  <TableHead className="text-white">Store Name</TableHead>
                  <TableHead className="text-white">Current Rate</TableHead>
                  <TableHead className="text-white">Rate Change</TableHead>
                  <TableHead className="text-white">Total Earnings</TableHead>
                  <TableHead className="text-white">Last Updated</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => {
                  const rateChange = getRateChange(commission.currentRate, commission.previousRate);
                  return (
                    <TableRow key={commission.id} className="hover:bg-white/5 border-b-white/10">
                      <TableCell className="font-medium text-white">{commission.storeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-sm bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
                          {commission.currentRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${rateChange.className.replace('text-red-600', 'text-red-400').replace('text-green-600', 'text-green-400')}`}>
                          {rateChange.icon}
                          <span className="text-sm">{rateChange.value}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">₹{commission.totalEarnings.toLocaleString()}</TableCell>
                      <TableCell className="text-gray-400">{commission.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm" className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => handleEditCommission(commission)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Rate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Commission Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle>Edit Commission Rate</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the commission rate for {selectedCommission?.storeName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-rate" className="text-gray-300">Current Rate</Label>
              <div className="text-sm text-gray-400">
                {selectedCommission?.currentRate}%
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-rate" className="text-gray-300">New Rate (%)</Label>
              <Input
                id="new-rate"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="Enter new commission rate" className="bg-white/5 border-white/20 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-400">
                Rate must be between 0% and 10%
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditCommission} className="bg-emerald-600 hover:bg-emerald-500">
              <Edit className="w-4 h-4 mr-2" />
              Update Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 