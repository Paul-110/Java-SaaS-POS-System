
import OrderInformation from "./OrderInformation";
import CustomerInformation from "./CustomerInformation";
import OrderItemTable from "../../../common/Order/OrderItemTable";
import { Card, CardContent } from "../../../../components/ui/card";

const OrderDetails = ({ selectedOrder }) => {
  if (!selectedOrder) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an order to see details
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full gap-4 max-h-[90vh] overflow-y-auto p-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrderInformation selectedOrder={selectedOrder} />
        <CustomerInformation selectedOrder={selectedOrder} />
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white flex-grow">
        <CardContent className="p-4 h-full flex flex-col">
          <h3 className="font-semibold mb-2 text-white">Order Items</h3>
          <div className="flex-grow overflow-auto"><OrderItemTable selectedOrder={selectedOrder} /></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
