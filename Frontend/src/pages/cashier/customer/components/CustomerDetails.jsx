import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon, PlusIcon, Loader2, UserIcon } from 'lucide-react';

const CustomerDetails = ({ customer, onAddPoints, loading = false }) => {
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4">
        <UserIcon size={48} strokeWidth={1} />
        <p className="mt-4">Select a customer to view details</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4">
        <Loader2 className="animate-spin h-8 w-8 mb-4 text-emerald-500" />
        <p>Loading customer details...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{customer.fullName || 'Unknown Customer'}</h2>
          <p className="text-gray-400">{customer.phone || 'N/A'}</p>
          <p className="text-gray-400">{customer.email || 'N/A'}</p>
        </div>
        <Button onClick={onAddPoints} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <PlusIcon className="h-4 w-4" />
          Add Points
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold text-white">{customer.loyaltyPoints || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">{customer.totalOrders || 0}</span>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-emerald-400">₹{(customer.totalSpent || 0).toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      {customer.averageOrderValue && (
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardHeader>
            <CardTitle className="text-gray-200">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹{customer.averageOrderValue.toFixed(2)}</span>
          </CardContent>
        </Card>
      )}

      {customer.lastVisit && (
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Last Visit: {new Date(customer.lastVisit).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails; 