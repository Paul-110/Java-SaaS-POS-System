import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import TransactionTable from "./TransactionTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrdersByBranch } from "../../../Redux Toolkit/features/order/orderThunks";
import { Printer } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



export default function Transactions() {
  const { orders } = useSelector((state) => state.order);
  const { branch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const receiptRef = useRef();

  useEffect(() => {
    if (branch) {
      dispatch(getOrdersByBranch({branchId:branch?.id}));
    }
  }, [branch]);

  // Calculate totals
  const totalIncome = orders
    .filter((t) => t.totalAmount > 0)
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalExpenses = orders
    .filter((t) => t.totalAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.totalAmount), 0);

  const netAmount = totalIncome - totalExpenses || 0;


  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewDialogOpen(true);
  };

  const handlePrintReceipt = () => {
    const input = receiptRef.current;
    if (!input) {
      console.error("Receipt element not found!");
      return;
    }

    // Use html2canvas to capture the element
    html2canvas(input, {
      scale: 2, // Increase scale for better resolution
      useCORS: true,
      backgroundColor: "#111827", // Match the dark theme background
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-ORD-${selectedTransaction?.id}.pdf`);
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-gray-400 mt-1">Review all sales and refunds for your branch.</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Download className="mr-2 h-4 w-4" /> Export Transactions
        </Button>
      </div>

      {/* Transaction Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Income
                </p>
                <h3 className="text-2xl font-bold mt-1 text-emerald-400">
                  ₹{totalIncome.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Expenses
                </p>
                <h3 className="text-2xl font-bold mt-1 text-red-400">
                  ₹{totalExpenses.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-red-500/20 rounded-full">
                <ArrowDownLeft className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Net Amount</p>
                <h3 className="text-2xl font-bold mt-1 text-blue-400">
                  ₹{netAmount.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <TransactionTable
            filteredTransactions={orders}
            handleViewTransaction={handleViewTransaction}
          />
        </CardContent>
      </Card>

      {/* View Transaction Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Transaction Details - #ORD-{selectedTransaction?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <>
              <div ref={receiptRef} className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Cashier</p>
                    <p className="text-gray-200">{selectedTransaction.cashierId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Date & Time
                    </p>
                    <p className="text-gray-200">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Type</p>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedTransaction.status === "Sale"
                            ? "bg-green-500/20 text-green-300"
                            : selectedTransaction.type === "Refund"
                            ? "bg-amber-500/20 text-amber-300"
                            : selectedTransaction.type === "Purchase" ||
                              selectedTransaction.type === "Expense"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Status</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Payment Method
                    </p>
                    <p className="text-gray-200">{selectedTransaction.paymentType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Amount</p>
                    <p
                      className={`font-bold ${
                        selectedTransaction.totalAmount > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedTransaction.totalAmount > 0
                        ? `+₹${selectedTransaction.totalAmount.toFixed(2)}`
                        : `-₹${Math.abs(selectedTransaction.totalAmount).toFixed(2)}`}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Customer Name</p>
                  <p className="text-gray-200">{selectedTransaction.customer?.fullName}</p>
                </div>

                {/* Additional details based on transaction type */}
                {(selectedTransaction.status === "COMPLETED" || selectedTransaction.status === null) && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2 text-gray-200">Sale Details</h4>
                    <p className="text-sm text-gray-400">
                      Invoice:{" "}
                      {selectedTransaction.reference?.replace("TRX", "INV")}
                    </p>
                    <p className="text-sm text-gray-400">Customer: {selectedTransaction.customer?.fullName}</p>
                    <p className="text-sm text-gray-400">Items: {selectedTransaction.items?.length || 0}</p>
                  </div>
                )}

                {selectedTransaction.type === "Refund" && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2 text-gray-200">Refund Details</h4>
                    <p className="text-sm text-gray-400">
                      Original Invoice: INV-001
                    </p>
                    <p className="text-sm text-gray-400">
                      Reason: Customer request
                    </p>
                    <p className="text-sm text-gray-400">
                      Approved by: Jane Smith
                    </p>
                  </div>
                )}

                {selectedTransaction.type === "Purchase" && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2 text-gray-200">Purchase Details</h4>
                    <p className="text-sm text-gray-400">
                      Purchase Order: PO-001
                    </p>
                    <p className="text-sm text-gray-400">
                      Supplier: ABC Supplies Inc.
                    </p>
                    <p className="text-sm text-gray-400">Items: 15</p>
                  </div>
                )}

                {selectedTransaction.type === "Expense" && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2 text-gray-200">Expense Details</h4>
                    <p className="text-sm text-gray-400">Category: Utilities</p>
                    <p className="text-sm text-gray-400">
                      Approved by: Store Manager
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <Button variant="outline" onClick={handlePrintReceipt} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                    <Printer className="h-4 w-4 mr-1" /> Print Receipt
                  </Button>
                </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
