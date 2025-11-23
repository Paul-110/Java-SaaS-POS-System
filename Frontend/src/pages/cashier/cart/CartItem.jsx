import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";

const CartItem = ({item,updateCartItemQuantity,removeFromCart}) => {
  return (
    <Card key={item.id} className="bg-black/20 backdrop-blur-lg border border-white/10 text-white border-l-4 border-l-emerald-500">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-white">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.sku}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-white/20 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center text-white">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-300">₹{item.sellingPrice}</p>
              <p className="text-sm font-bold text-emerald-400">
                ₹{(item.sellingPrice * item.quantity).toFixed(2)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartItem