import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";
import {
  getProductsByStore,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../Redux Toolkit/features/product/productThunks";
import { useToast } from "../../../components/ui/use-toast";

const Products = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { products, loading, error } = useSelector((state) => state.product);
  const { store } = useSelector((state) => state.store);
  const [filters, setFilters] = useState({ searchTerm: "", category: "all" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (store?.id) {
      dispatch(getProductsByStore(store.id));
    }
  }, [dispatch, store]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const categoryMatch =
        filters.category === "all" || product.category?.id === filters.category;
      return searchMatch && categoryMatch;
    });
  }, [products, filters]);

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast({ title: "Success", description: "Product deleted successfully." });
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Failed to delete product.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (selectedProduct) {
        await dispatch(updateProduct({ id: selectedProduct.id, dto: values })).unwrap();
        toast({ title: "Success", description: "Product updated successfully." });
      } else {
        await dispatch(createProduct({ ...values, storeId: store.id })).unwrap();
        toast({ title: "Success", description: "Product created successfully." });
      }
      setIsFormOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      let description = "Failed to save product.";
      if (err.status === 409) {
        description = "A product with this name or SKU already exists. Please choose a different one.";
      } else if (err.message) {
        description = err.message;
      }
      toast({
        title: "Error",
        description: description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Products</h2>
        <p className="text-gray-400">Manage your store's entire product catalog.</p>
      </div>

      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <ProductSearch onFilterChange={setFilters} />
          <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-500">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">{error.message || "An unexpected error occurred."}</div>
        ) : (
          <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
