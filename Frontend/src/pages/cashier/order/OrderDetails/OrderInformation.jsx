import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'
import { formatDate, getPaymentModeLabel, getStatusBadgeVariant } from '../data'
import { Badge } from '../../../../components/ui/badge'

const OrderInformation = ({selectedOrder}) => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-white">Order Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="text-gray-200">{formatDate(selectedOrder.createdAt)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="text-gray-200">{getPaymentModeLabel(selectedOrder.paymentType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount:</span>
                <span className="font-semibold text-emerald-400">
                  ₹{selectedOrder.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default OrderInformation