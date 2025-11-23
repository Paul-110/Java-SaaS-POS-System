import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useSelector } from "react-redux";

const InventoryFormDialog = ({
  open,
  onOpenChange,
  selectedProductId,
  setSelectedProductId,
  quantity,
  setQuantity,
  onSubmit,
  mode = "add",
}) => {
  const products = useSelector((state) => state.product.products);
  const isEdit = mode === "edit";
  const selectedProduct = products.find(
    (p) => String(p.id) === String(selectedProductId)
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Edit Inventory" : "Add Inventory"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium text-gray-300">
              Product
            </label>
            {isEdit ? (
              <Input
                id="product"
                value={selectedProduct?.name || ""}
                className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm bg-white/10 text-white placeholder-gray-400 border-white/20"
                disabled
              />
            ) : (
              <Select
                value={selectedProductId}
                onValueChange={(value) => setSelectedProductId(value)}
              >
                <SelectTrigger className="w-full text-left border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40">
                  <SelectValue placeholder="Select a Product" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/80 border-white/20 text-white backdrop-blur-lg">
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id} className="focus:bg-emerald-700/50">
                      {product.name} ({product.sku})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-300">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {isEdit ? "Update Inventory" : "Add Inventory"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryFormDialog;
