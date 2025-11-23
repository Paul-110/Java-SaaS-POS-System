import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { useSelector } from "react-redux";
import {
  resetOrder,
  selectPaymentMethod,
  selectTotal,
} from "../../../Redux Toolkit/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";

const ReceiptDialog = ({ showReceiptDialog, setShowReceiptDialog }) => {
  const paymentMethod = useSelector(selectPaymentMethod);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const finishOrder = () => {
    setShowReceiptDialog(false);
    // Reset the order
    dispatch(resetOrder());

    toast({
      title: "Order Completed",
      description: "Receipt printed and order saved successfully",
    });
  };

  return (
    <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
      <DialogContent className="max-w-md bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Receipt</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <Receipt className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">Payment Successful!</h3>
            <p className="text-sm text-gray-400">Receipt has been printed</p>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-white/10">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Total:</span>
                <span className="font-semibold text-white">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="font-semibold capitalize text-white">
                  {paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={finishOrder} className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start New Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
