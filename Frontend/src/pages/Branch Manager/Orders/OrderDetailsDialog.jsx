import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import OrderItemTable from "../../common/Order/OrderItemTable";

const OrderDetailsDialog = ({
  open,
  onOpenChange,
  selectedOrder,
  getStatusColor,
  getPaymentIcon,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold">Order Details</DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <strong className="text-gray-400">Order ID:</strong> <span className="text-gray-200">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Date:</strong>{" "}
                  <span className="text-gray-200">{selectedOrder.createdAt
                    ? new Date(selectedOrder.createdAt).toLocaleString()
                    : "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="text-gray-400">Status:</strong>{" "}
                  <Badge className={`${getStatusColor(selectedOrder.status)} bg-opacity-20 border border-opacity-30`} variant="secondary">
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Payment:</strong>{" "}
                  <span className="inline-flex items-center gap-1">
                    {getPaymentIcon(selectedOrder.paymentType)}{" "}
                    <span className="text-gray-200">{selectedOrder.paymentType || "-"}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Amount:</strong>{" "}
                  <span className="font-bold text-emerald-400">{selectedOrder.totalAmount
                    ? `₹${selectedOrder.totalAmount.toFixed(2)}`
                    : "-"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold mb-1 text-gray-200">Customer Details</div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Name:</strong>{" "}
                  <span className="text-gray-200">{selectedOrder.customer?.name ||
                    selectedOrder.customer?.fullName ||
                    "-"}</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Phone:</strong> <span className="text-gray-200">{selectedOrder.customer?.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Email:</strong> <span className="text-gray-200">{selectedOrder.customer?.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-gray-400">Address:</strong>{" "}
                  <span className="text-gray-200">{selectedOrder.customer?.address || "-"}</span>
                </div>
              </div>
            </div>
            {/* Cashier Details */}
            <div className="font-semibold mt-2 mb-1 text-gray-200">Cashier Details</div>
            <div className="mb-2 text-sm space-y-2">
              <div className="flex justify-between">
                <strong className="text-gray-400">Name:</strong>{" "}
                <span className="text-gray-200">{selectedOrder.cashier?.name ||
                  selectedOrder.cashier?.fullName ||
                  selectedOrder.cashierId ||
                  "-"}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-400">ID:</strong>{" "}
                <span className="text-gray-200">{selectedOrder.cashier?.id || selectedOrder.cashierId || "-"}</span>
              </div>
            </div>
            {/* Order Items */}
            <div className="font-semibold mb-1 text-gray-200">Order Items</div>
            <div className="overflow-x-auto">
              <OrderItemTable selectedOrder={selectedOrder} />
            </div>
            <DialogClose asChild>
              <Button className="mt-4 w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white" variant="outline">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
