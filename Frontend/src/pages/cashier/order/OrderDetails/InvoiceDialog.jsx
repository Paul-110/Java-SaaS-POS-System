import React from "react";
import { handleDownloadOrderPDF } from "../pdf/pdfUtils";
import { useToast } from "../../../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PrinterIcon } from "lucide-react";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";
import { useDispatch } from "react-redux";
import { resetOrder } from "../../../../Redux Toolkit/features/cart/cartSlice";

const InvoiceDialog = ({ showInvoiceDialog, setShowInvoiceDialog }) => {
  let { selectedOrder } = useSelector((state) => state.order);
//   selectedOrder={customer:{fullName:""},items:[{}]}
//   showInvoiceDialog=true
  
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handlePrintInvoice = () => {
    console.log("print invoice...");
  };
  const handleDownloadPDF = async () => {
    await handleDownloadOrderPDF(selectedOrder, toast);
  };

  const finishOrder = () => {
    setShowInvoiceDialog(false);
    // Reset the order
    dispatch(resetOrder());

    toast({
      title: "Order Completed",
      description: "Receipt printed and order saved successfully",
    });
  };

  return (
    <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
      {selectedOrder && (
        <DialogContent className="max-w-3xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold">Order Details - Invoice</DialogTitle>
          </DialogHeader>
          <OrderDetails selectedOrder={selectedOrder} />

          <DialogFooter className="gap-2 sm:gap-0 space-x-3">
            <Button variant="outline" onClick={handleDownloadPDF} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePrintInvoice(selectedOrder)}
              className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>

            <Button onClick={finishOrder} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Start New Order</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default InvoiceDialog;
