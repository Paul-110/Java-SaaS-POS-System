import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";

const InventoryTable = ({ rows, onEdit }) => (
  <Table>
    <TableHeader>
      <TableRow className="border-white/10">
        <TableHead className="w-[100px] text-gray-400">SKU</TableHead>
        <TableHead className="text-gray-400">Product Name</TableHead>
        <TableHead className="text-gray-400">Quantity</TableHead>
        <TableHead className="text-gray-400">Category</TableHead>
        <TableHead className="text-right text-gray-400">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.length > 0 ? (
        rows.map((row) => (
          <TableRow key={row?.id} className="border-white/10">
            <TableCell className="font-medium text-white">{row.sku}</TableCell>
            <TableCell className="text-gray-300">{row.name.slice(0,70)}...</TableCell>
            <TableCell className="text-gray-300">{row.quantity}</TableCell>
            <TableCell className="text-gray-300">{row.category}</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline" onClick={() => onEdit(row)} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-16 text-gray-400">
            <div className="text-center">
              <h3 className="text-xl font-semibold">No Inventory Found</h3>
              <p className="mt-2">No inventory items match the current filter criteria.</p>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default InventoryTable; 