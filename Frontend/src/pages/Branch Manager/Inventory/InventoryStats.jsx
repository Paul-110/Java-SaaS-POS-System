import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const InventoryStats = ({ inventoryRows }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-gray-400">Total Products</h3>
          <p className="text-3xl font-bold mt-2 text-white">{inventoryRows.length}</p>
        </div>
      </CardContent>
    </Card>
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-gray-400">Total Quantity</h3>
          <p className="text-3xl font-bold mt-2 text-emerald-400">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default InventoryStats; 