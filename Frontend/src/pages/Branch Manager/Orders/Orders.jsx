import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { RefreshCw, ArrowUpDown } from "lucide-react";
import {
  getOrdersByBranch,
  getOrderById,
} from "@/Redux Toolkit/features/order/orderThunks";
import { findBranchEmployees } from "@/Redux Toolkit/features/employee/employeeThunks";
import { getPaymentIcon } from "../../../utils/getPaymentIcon";

import { getStatusColor } from "../../../utils/getStatusColor";
import OrdersFilters from "./OrdersFilters";
import OrdersTable from "./OrdersTable";
import OrderDetailsDialog from "./OrderDetailsDialog";

const Orders = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { orders, loading } = useSelector((state) => state.order);
  const { selectedOrder } = useSelector((state) => state.order);


  const [showDetails, setShowDetails] = useState(false);

  // Fetch branch employees (cashiers)
  useEffect(() => {
    if (branchId) {
      dispatch(findBranchEmployees({ branchId, role: "ROLE_BRANCH_CASHIER" }));
    }
  }, [branchId, dispatch]);

  // Fetch orders when filters change
  useEffect(() => {
    if (branchId) {
      const data = {
        branchId,
      };
      console.log("filters data ", data);
      dispatch(getOrdersByBranch(data));
    }
  }, [branchId, dispatch]);

  const handleViewDetails = (orderId) => {
    dispatch(getOrderById(orderId));
    setShowDetails(true);
  };

  const handlePrintInvoice = (orderId) => {
    // In a real app, this would trigger invoice printing
    console.log(`Print invoice for order ${orderId}`);
  };

  const handleRefresh = () => {
    if (branchId) {
      const data = {
        branchId,
      };
      console.log("filter data ", data);
      dispatch(getOrdersByBranch(data));
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-gray-400 mt-1">Review and manage all orders for your branch.</p>
        </div>
        <Button
          variant="outline"
          className="ml-auto bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white gap-2"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <OrdersFilters />
      </div>

      {/* Orders Table */}
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <OrdersTable
            orders={orders}
            loading={loading}
            onViewDetails={handleViewDetails}
            onPrintInvoice={handlePrintInvoice}
            getStatusColor={getStatusColor}
            getPaymentIcon={getPaymentIcon}
          />
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={showDetails && !!selectedOrder}
        onOpenChange={setShowDetails}
        selectedOrder={selectedOrder}
        getStatusColor={getStatusColor}
        getPaymentIcon={getPaymentIcon}
      />
    </div>
  );
};

export default Orders;
