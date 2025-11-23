import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag, DollarSign, Eye, Loader2 } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/Redux Toolkit/features/product/productThunks';
import { toast } from '@/components/ui/use-toast';

const ProductTable = ({ products, loading, onEdit, onView }) => {
  const dispatch = useDispatch();

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await dispatch(deleteProduct({ id, token })).unwrap();
      toast({ title: "Success", description: "Product deleted successfully" });
    } catch (err) {
      toast({ title: "Error", description: err || "Failed to delete product", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <h3 className="text-xl font-semibold">No Products Found</h3>
        <p className="mt-2">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-400">ID</TableHead>
          <TableHead className="text-gray-400">Image</TableHead>
          <TableHead className="text-gray-400">Product</TableHead>
          <TableHead className="text-gray-400">Category</TableHead>
          <TableHead className="text-gray-400">Price</TableHead>
          
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="border-white/10">
            <TableCell className="text-gray-300">
              
                #{product.id}
              
            </TableCell>
            <TableCell>
              {product.image && (
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
              )}
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="font-medium text-white">{product.name.slice(0,70)}...</div>
                <div className="text-sm text-gray-400 truncate max-w-xs">{product.description}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-gray-300">
                <Tag className="h-4 w-4 text-gray-400" />
                {product.category}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-gray-300">
                <DollarSign className="h-4 w-4 text-gray-400" />
                {product.price?.toFixed ? product.price.toFixed(2) : product.sellingPrice}
              </div>
            </TableCell>
            
            <TableCell className="text-right">
              <div className="flex justify-end gap-2 ">
                {onView && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                    onClick={() => onView(product)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;