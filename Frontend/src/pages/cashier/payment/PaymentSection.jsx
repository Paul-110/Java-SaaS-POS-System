import React from "react";
import { useSelector } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";
import { useDispatch } from "react-redux";
import {
  holdOrder,
  selectCartItems,
  selectSelectedCustomer,
  selectTotal,
} from "../../../Redux Toolkit/features/cart/cartSlice";
import { Button } from "../../../components/ui/button";
import { CreditCard } from "lucide-react";
import { Pause } from "lucide-react";

const PaymentSection = ({ setShowPaymentDialog }) => {
  const cartItems = useSelector(selectCartItems);
  const selectedCustomer = useSelector(selectSelectedCustomer);

  const total = useSelector(selectTotal);

  const {toast} = useToast();
  const dispatch = useDispatch();

  const handlePayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before proceeding to payment",
        variant: "destructive",
      });
      return;
    }

    // Check if customer is selected
    if (!selectedCustomer) {
      toast({
        title: "Customer Required",
        description: "Please select a customer before proceeding to payment",
        variant: "destructive",
      });
      return;
    }

    setShowPaymentDialog(true);
  };

  const handleHoldOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "No items in cart to hold",
        variant: "destructive",
      });
      return;
    }

    dispatch(holdOrder());

    toast({
      title: "Order On Hold",
      description: "Order placed on hold",
    });
  };
  return (
    <div className="flex-1 p-4 flex flex-col justify-end">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-1">
            ₹{total.toFixed(2)}
          </div>
          <p className="text-sm text-gray-400">Total Amount</p>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            onClick={handlePayment}
            disabled={cartItems.length === 0}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Process Payment
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            onClick={handleHoldOrder}
            disabled={cartItems.length === 0}
          >
            <Pause className="w-4 h-4 mr-2" />
            Hold Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
