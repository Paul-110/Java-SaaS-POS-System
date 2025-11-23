import React from "react";
import { Separator } from "../../../components/ui/separator";
import { useSelector } from "react-redux";
import {
  selectDiscountAmount,
  selectSubtotal,
  selectTax,
  selectTotal,
} from "../../../Redux Toolkit/features/cart/cartSlice";

const CartSummary = () => {
  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const discountAmount = useSelector(selectDiscountAmount);
  const total = useSelector(selectTotal);

  return (
    <div className="border-t border-white/10 bg-black/20 p-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal:</span>
          <span className="text-gray-200">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tax (18% GST):</span>
          <span className="text-gray-200">₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Discount:</span>
          <span className="text-red-400">- ₹{discountAmount.toFixed(2)}</span>
        </div>
        <Separator className="bg-white/10" />
        <div className="flex justify-between text-lg font-bold">
          <span className="text-white">Total:</span>
          <span className="text-emerald-400">₹{total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
