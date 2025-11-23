import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getRecentOrdersByBranch } from "@/Redux Toolkit/features/order/orderThunks";
import { getStatusColor } from "../../../utils/getStatusColor";
import { formatDateTime } from "../../../utils/formateDate";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { recentOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (branchId) {
      dispatch(getRecentOrdersByBranch(branchId));
    }
  }, [branchId, dispatch]);



  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-xl font-semibold text-white">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="border-t border-white/10 -mx-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-black/40 border-b-white/10">
                <TableHead className="text-white">Order ID</TableHead>
                <TableHead className="text-white">Customer</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(recentOrders || []).map((order) => (
                <TableRow key={order.id} className="hover:bg-white/5 border-b-white/10">
                  <TableCell className="font-medium text-gray-400">{order.id}</TableCell>
                  <TableCell className="text-white">{order.customer?.fullName || order.customerName || "—"}</TableCell>
                  <TableCell className="text-white">{order.amount ? `₹${order.amount}` : order.totalAmount ? `₹${order.totalAmount}` : "—"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-400">{formatDateTime(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {loading && <div className="text-center text-xs text-gray-400 pt-4">Loading...</div>}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;