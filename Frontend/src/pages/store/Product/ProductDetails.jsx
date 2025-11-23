import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, DollarSign, Package, Calendar, Barcode, Palette, Image as ImageIcon } from "lucide-react";

const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <Card className="overflow-hidden bg-transparent border-none shadow-none text-white">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl font-bold text-white">{product.name}</CardTitle>
        {product.brand && (
          <CardDescription className="text-sm font-medium text-emerald-400">
            {product.brand}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Product Image */}
        {product.image && (
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-white/20">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x300?text=No+Image';
                }}
              />
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Barcode className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">SKU</div>
                <div className="font-medium text-gray-200">{product.sku || 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Category</div>
                <div className="font-medium text-gray-200">{product.category || 'Uncategorized'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Color</div>
                <div className="font-medium text-gray-200">{product.color || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Price</div>
                <div className="font-medium text-gray-200">
                  <span className="text-lg font-bold text-emerald-400">
                    ₹{product.sellingPrice?.toFixed(2) || product.price?.toFixed(2) || '0.00'}
                  </span>
                  {product.mrp && product.mrp > (product.sellingPrice || product.price) && (
                    <span className="ml-2 text-sm line-through text-gray-500">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {product.stock !== undefined && <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Stock</div>
                <div className="font-medium text-gray-200">
                  {product.stock !== undefined ? (
                    <Badge className={product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {product.stock} in stock
                    </Badge>
                  ) : 'N/A'}
                </div>
              </div>
            </div>}

            {product.updatedAt && <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Last Updated</div>
                <div className="font-medium text-gray-200">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>}
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-medium mb-2 text-gray-200">Description</h3>
            <p className="text-gray-300 whitespace-pre-line">{product.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDetails;