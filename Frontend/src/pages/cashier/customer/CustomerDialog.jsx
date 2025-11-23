import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchIcon, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '@/Redux Toolkit/features/customer/customerThunks';
import CustomerForm from './CustomerForm';
import { setSelectedCustomer } from '../../../Redux Toolkit/features/cart/cartSlice';
import { useToast } from '../../../components/ui/use-toast';

const CustomerDialog = ({
  showCustomerDialog,
  setShowCustomerDialog
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { customers, loading } = useSelector(state => state.customer);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  // Fetch customers when dialog opens
  useEffect(() => {
    if (showCustomerDialog) {
      dispatch(getAllCustomers());
    }
  }, [showCustomerDialog, dispatch]);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

    const handleCustomerSelect = (customer) => {
      dispatch(setSelectedCustomer(customer));
      setShowCustomerDialog(false);
      toast({
        title: "Customer Selected",
        description: `${customer.name} selected for this order`,
      });
    };



  return (
    <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
      <DialogContent className="max-w-2xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold">Select Customer</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <Loader2 className="animate-spin h-6 w-6 mr-2 text-emerald-500" />
              <p>Loading customers...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <p>
                {searchTerm ? 'No customers found matching your search.' : 'No customers available.'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Phone</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-right text-gray-400"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map(customer => (
                  <TableRow key={customer.id} className="border-white/10">
                    <TableCell className="text-white">{customer.fullName}</TableCell>
                    <TableCell className="text-gray-300">{customer.phone}</TableCell>
                    <TableCell className="text-gray-300">{customer.email}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleCustomerSelect(customer)} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <CustomerForm 
          showCustomerForm={showCustomerForm}
          setShowCustomerForm={setShowCustomerForm}
       
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCustomerDialog(false)} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">Cancel</Button>
          <Button onClick={() => setShowCustomerForm(true)} className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Add New Customer</Button>
        </DialogFooter>
        
        
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;