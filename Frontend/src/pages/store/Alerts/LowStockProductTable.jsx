import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { AlertTriangle } from "lucide-react";

const lowStockProducts = [
  { name: "Product A", sku: "SKU001", stock: 5 },
  { name: "Product B", sku: "SKU002", stock: 2 },
  { name: "Product C", sku: "SKU003", stock: 8 },
];

const LowStockProductTable = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle />
          Low Stock Products
        </CardTitle>
        <CardDescription className="text-gray-400">
          These products are running low on stock and may need to be reordered soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                <TableHead className="text-white">Product Name</TableHead>
                <TableHead className="text-white">SKU</TableHead>
                <TableHead className="text-right text-white">Stock Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.map((product, index) => (
                <TableRow key={index} className="hover:bg-white/5 border-b-white/10">
                  <TableCell className="font-medium text-white">{product.name}</TableCell>
                  <TableCell className="text-gray-400">{product.sku}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive" className="bg-yellow-500/10 text-yellow-300 border-yellow-500/20">
                      {product.stock}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockProductTable;
