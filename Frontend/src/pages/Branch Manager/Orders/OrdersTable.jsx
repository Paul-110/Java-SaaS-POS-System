import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, FileText, ArrowUpDown, Loader2 } from "lucide-react";

const OrdersTable = ({ orders, loading, onViewDetails, onPrintInvoice, getStatusColor, getPaymentIcon }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10">
          <TableHead className="w-[100px] text-gray-400">
            <div className="flex items-center gap-1">
              Order ID
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead className="text-gray-400">Customer</TableHead>
          <TableHead className="text-gray-400">Cashier</TableHead>
          <TableHead className="text-gray-400">
            <div className="flex items-center gap-1">
              Date
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead className="text-gray-400">
            <div className="flex items-center gap-1">
              Amount
              <ArrowUpDown className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead className="text-gray-400">Payment Mode</TableHead>
          <TableHead className="text-gray-400">Status</TableHead>
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-16">
              <div className="flex justify-center items-center text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
                Loading orders...
              </div>
            </TableCell>
          </TableRow>
        ) : orders.length > 0 ? (
          orders.map((order) => ( 
            <TableRow key={order.id} className="border-white/10">
              <TableCell className="font-medium text-white">{order.id}</TableCell>
              <TableCell className="text-gray-300">{order.customer?.fullName || "-"}</TableCell>
              <TableCell className="text-gray-300">{order.cashierId || "-"}</TableCell>
              <TableCell className="text-gray-300">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</TableCell>
              <TableCell className="text-emerald-400 font-medium">{order.totalAmount ? `₹${order.totalAmount.toFixed(2)}` : "-"}</TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  {getPaymentIcon(order.paymentType)} {order.paymentType || "-"}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(order.status)} bg-opacity-20 border border-opacity-30`} variant="secondary">
                  {order.status || "COMPLETE"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(order.id)}
                    title="View Details"
                    className="bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPrintInvoice(order.id)}
                    title="Print Invoice"
                    className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-16 text-gray-400">
              <div className="text-center">
                <h3 className="text-xl font-semibold">No Orders Found</h3>
                <p className="mt-2">No orders match the current filter criteria.</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable; 