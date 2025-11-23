import React from 'react'
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../../../Redux Toolkit/features/cart/cartSlice';
import { User } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

const CustomerSection = ({setShowCustomerDialog}) => {
    const selectedCustomer = useSelector(selectSelectedCustomer);
  return (
         <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold mb-3 flex items-center text-white">
          <User className="w-5 h-5 mr-2" />
          Customer
        </h2>
        {selectedCustomer ? (
          <Card className="bg-emerald-500/10 border border-emerald-500/30">
            <CardContent className="p-3">
              <h3 className="font-medium text-emerald-300">
                {selectedCustomer.name}
              </h3>
              <p className="text-sm text-emerald-400">
                {selectedCustomer.phone}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => setShowCustomerDialog(true)}
              >
                Change Customer
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            onClick={() => setShowCustomerDialog(true)}
          >
            <User className="w-4 h-4 mr-2" />
            Select Customer
          </Button>
        )}
      </div>
  )
}

export default CustomerSection