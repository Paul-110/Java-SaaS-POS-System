import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from 'react-redux';
import { CreditCard } from 'lucide-react';
import { getPaymentIcon } from '../../../utils/getPaymentIcon';


const PaymentBreakdown = () => {
      const { paymentBreakdown, loading } = useSelector((state) => state.branchAnalytics);

  return (
   <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-semibold text-white">Payment Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {paymentBreakdown && paymentBreakdown.length > 0 ? paymentBreakdown.map((payment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {getPaymentIcon(payment.type)}
                  <span className="text-gray-300">{payment.type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500"
                      style={{ width: `${payment.percentage ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-white w-20 text-right">₹{payment.totalAmount?.toLocaleString() ?? "—"}</span>
                  <span className="text-xs text-gray-400 w-10 text-right">{payment.percentage ? `${payment.percentage}%` : ""}</span>
                  <span className="text-xs text-gray-400 w-20 text-right">{payment.transactionCount ? `(${payment.transactionCount} txns)` : ""}</span>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-400">{loading ? "Loading payment breakdown..." : "No data available"}</div>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export default PaymentBreakdown