import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

const ProductSelect = () => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const products = useSelector((state) => state.product.products);

  return (
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
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductSelect;
