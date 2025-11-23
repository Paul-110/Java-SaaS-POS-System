import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { resumeOrder, selectHeldOrders } from '../../../Redux Toolkit/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../components/ui/use-toast';

const HeldOrdersDialog = ({
  showHeldOrdersDialog,
  setShowHeldOrdersDialog,
}) => {
  const dispatch = useDispatch();
  const {toast} = useToast();
  
  const heldOrders = useSelector(selectHeldOrders);
    const handleResumeOrder = (order) => {
    dispatch(resumeOrder(order));
    setShowHeldOrdersDialog(false);

    toast({
      title: "Order Resumed",
      description: `Order #${order.id} has been resumed`,
    });
  };
  return (
    <Dialog open={showHeldOrdersDialog} onOpenChange={setShowHeldOrdersDialog}>
      <DialogContent className="max-w-2xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold">Held Orders</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          {heldOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Pause className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No held orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {heldOrders.map((order) => (
                <Card key={order.id} className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">Order #{order.id}</h3>
                        <p className="text-sm text-gray-400">
                          {order.items.length} items • {new Date(order.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleResumeOrder(order)}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowHeldOrdersDialog(false)} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeldOrdersDialog;