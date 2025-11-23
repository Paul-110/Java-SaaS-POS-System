import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";
import { addToCart } from "../../../Redux Toolkit/features/cart/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();

     const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart`,
        duration: 1500,
      });
    };
  return (
    <Card
      className="overflow-hidden bg-black/20 backdrop-blur-lg border border-white/10 text-white transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
      onClick={() => handleAddToCart(product)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image || "https://placehold.co/300x200"}
            alt={product.name}
            className="w-full h-32 object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-black/50 text-gray-200 border-white/20" variant="secondary">
            {product.category}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate text-white">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.sku}</p>
          <p className="text-lg font-bold mt-1 text-emerald-400">₹{product.sellingPrice}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
