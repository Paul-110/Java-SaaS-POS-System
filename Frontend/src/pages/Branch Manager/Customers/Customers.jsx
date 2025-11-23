import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, ShoppingBag, Phone, Mail, User, Calendar } from "lucide-react";
import { getStatusColor } from "../../../utils/getStatusColor";
import { calculateCustomerStats } from "../../cashier/customer/utils/customerUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../../../Redux Toolkit/features/customer/customerThunks";
import { clearCustomerOrders } from "../../../Redux Toolkit/features/order/orderSlice";
import { getOrdersByCustomer } from "../../../Redux Toolkit/features/order/orderThunks";

const Customers = () => {
  // Sample data - in a real app, this would come from an API
  const initialCustomers = [
    {
      id: 1,
      name: "Rahul Mehta",
      phone: "+91 9876543200",
      email: "rahul.mehta@example.com",
      totalOrders: 12,
      totalSpent: "₹8,450",
      lastOrder: "2023-08-10",
      loyaltyStatus: "Gold",
    },
    {
      id: 2,
      name: "Sneha Gupta",
      phone: "+91 9876543201",
      email: "sneha.gupta@example.com",
      totalOrders: 8,
      totalSpent: "₹5,200",
      lastOrder: "2023-08-05",
      loyaltyStatus: "Silver",
    },
    {
      id: 3,
      name: "Arjun Sharma",
      phone: "+91 9876543202",
      email: "arjun.sharma@example.com",
      totalOrders: 5,
      totalSpent: "₹3,100",
      lastOrder: "2023-07-28",
      loyaltyStatus: "Bronze",
    },
    {
      id: 4,
      name: "Meera Patel",
      phone: "+91 9876543203",
      email: "meera.patel@example.com",
      totalOrders: 15,
      totalSpent: "₹12,750",
      lastOrder: "2023-08-12",
      loyaltyStatus: "Gold",
    },
    {
      id: 5,
      name: "Vikrant Singh",
      phone: "+91 9876543204",
      email: "vikrant.singh@example.com",
      totalOrders: 3,
      totalSpent: "₹1,850",
      lastOrder: "2023-07-15",
      loyaltyStatus: "Bronze",
    },
    {
      id: 6,
      name: "Priya Desai",
      phone: "+91 9876543205",
      email: "priya.desai@example.com",
      totalOrders: 7,
      totalSpent: "₹4,900",
      lastOrder: "2023-08-01",
      loyaltyStatus: "Silver",
    },
  ];

  // Sample order history data
  const sampleOrderHistory = [
    {
      id: "ORD-7891",
      date: "2023-08-10",
      amount: "₹1,250",
      items: 5,
      status: "Completed",
      paymentMode: "UPI",
    },
    {
      id: "ORD-7650",
      date: "2023-07-25",
      amount: "₹850",
      items: 3,
      status: "Completed",
      paymentMode: "Cash",
    },
    {
      id: "ORD-7432",
      date: "2023-07-12",
      amount: "₹1,500",
      items: 6,
      status: "Completed",
      paymentMode: "Card",
    },
    {
      id: "ORD-7290",
      date: "2023-06-30",
      amount: "₹720",
      items: 2,
      status: "Completed",
      paymentMode: "UPI",
    },
  ];

  const { customerOrders } = useSelector((state) => state.order);

  const { customers } = useSelector((state) => state.customer);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderHistory, setOrderHistory] = useState(sampleOrderHistory);
  const dispatch = useDispatch();

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm) ||
      customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getLoyaltyStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "gold":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
      case "silver":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
      case "bronze":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    // In a real app, you would fetch the customer's order history here
    setIsCustomerDetailsOpen(true);
    dispatch(clearCustomerOrders());
    // Fetch customer orders
    if (customer.id) {
      dispatch(getOrdersByCustomer(customer.id));
    }
  };

  console.log("customerOrders", customerOrders);
  const customerStats = selectedCustomer
    ? calculateCustomerStats(customerOrders)
    : null;

  const displayCustomer = selectedCustomer
    ? {
        ...selectedCustomer,
        ...customerStats,
      }
    : null;

  console.log("display customer ", displayCustomer);
  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Overview</h1>
          <p className="text-gray-400 mt-1">View and manage your branch's customers.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-400">
                Total Customers
              </h3>
              <p className="text-3xl font-bold mt-2 text-emerald-400">{customers.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-400">
                Gold Members
              </h3>
              <p className="text-3xl font-bold mt-2 text-yellow-400">
                {customers.filter((c) => c.loyaltyStatus === "Gold").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-400">
                Avg. Orders per Customer
              </h3>
              <p className="text-3xl font-bold mt-2 text-blue-400">
                {Math.round(
                  customers.reduce((sum, c) => sum + c.totalOrders, 0) /
                    customers.length
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Customer List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Contact</TableHead>

                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-white/10">
                    <TableCell className="font-medium text-white">
                      {customer.fullName}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex flex-col">
                        <span className="text-sm">{customer.phone}</span>
                        <span className="text-xs text-gray-400">
                          {customer.email}
                        </span>
                      </div>
                    </TableCell>
        
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                        onClick={() => openCustomerDetails(customer)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-16 text-gray-400"
                  >
                    <h3 className="text-xl font-semibold">No Customers Found</h3>
                    <p className="mt-2">No customers match the current search term.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog
          open={isCustomerDetailsOpen}
          onOpenChange={setIsCustomerDetailsOpen}
        >
          <DialogContent className="h-[93vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Customer Details</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-6">
              {/* Customer Info */}
              <>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-semibold text-white">
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-400">Name</p>
                        <p className="text-gray-200">
                          {displayCustomer.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-400">Email</p>
                        <p className="text-gray-200">
                          {selectedCustomer.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-400">Phone</p>
                        <p className="text-gray-200">
                          {selectedCustomer.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-400">Total Orders</p>
                        <p className="text-gray-200">
                          {displayCustomer.totalOrders} orders
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>

              {/* Order History */}
              <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold text-white">
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-400">Order ID</TableHead>
                       
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">Items</TableHead>
                        <TableHead className="text-gray-400">Payment</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerOrders?.map((order) => (
                        <TableRow key={order.id} className="border-white/10">
                          <TableCell className="font-medium text-white">
                            {order.id}
                          </TableCell>
                         
                          <TableCell className="text-emerald-400 font-medium">₹{order.totalAmount.toFixed(2)}</TableCell>
                          <TableCell className="text-gray-300">{order.items.map((orderItem)=><p>{
                            orderItem.product?.name?.slice(0,15)}...</p>)}</TableCell>
                          <TableCell className="text-gray-300">{order.paymentType}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusColor(order.status)} bg-opacity-20 border border-opacity-30`}
                              variant="secondary"
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

           
            </div>
            <DialogFooter>
              <Button onClick={() => setIsCustomerDetailsOpen(false)} className="w-full bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Customers;
