import React from 'react'
import { Card, CardContent } from '../../../../components/ui/card'

const CustomerInformation = ({selectedOrder}) => {
  return (
       <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-white">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-gray-200">
                  {selectedOrder.customer?.fullName || "Walk-in Customer"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-gray-200">{selectedOrder.customer?.phone || "N/A"}</span>
              </div>
                 <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-gray-200">{selectedOrder.customer?.email || "N/A"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default CustomerInformation