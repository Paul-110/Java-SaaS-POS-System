import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, RefreshCw, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProductsByStore } from "@/Redux Toolkit/features/product/productThunks";
import { toast } from "@/components/ui/use-toast";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";
import ProductDetails from "./ProductDetails";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, searchResults } = useSelector(
    (state) => state.product
  );
  const { store } = useSelector((state) => state.store);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch products on mount or when store changes
  useEffect(() => {
    if (store?.id) {
      fetchProducts();
    }
  }, [dispatch, store]);

  // Update displayed products when products or search results change
  useEffect(() => {
    setDisplayedProducts(
      isSearchActive && searchResults.length > 0 ? searchResults : products
    );
  }, [products, searchResults, isSearchActive]);

  const fetchProducts = async () => {
    try {
      // const token = localStorage.getItem("jwt");
      await dispatch(getProductsByStore(store.id)).unwrap();
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
    setIsSearchActive(false);
  };

  const handleAddProductSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditProductSuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentProduct(null);
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (product) => {
    setCurrentProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleSearch = (results) => {
    if (results === null) {
      // Search was cleared
      setIsSearchActive(false);
    } else {
      setIsSearchActive(true);
      setDisplayedProducts(results);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-gray-400 mt-1">Manage your store's entire product catalog.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Add New Product</DialogTitle>
              <p className="text-gray-300 mt-2">Enter the details for the new product.</p>
            </DialogHeader>
            <ProductForm
              onSubmit={handleAddProductSuccess}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <ProductSearch onSearch={handleSearch} />

        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="ml-auto bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {isSearchActive && (
        <div className="bg-amber-900/30 border border-amber-400/50 text-amber-300 px-4 py-2 rounded-lg flex justify-between items-center backdrop-blur-sm">
          <span>
            Showing search results ({displayedProducts.length}{" "}
            {displayedProducts.length === 1 ? "product" : "products"} found)
          </span>
          <Button
            variant="ghost"
            size="sm" 
            onClick={() => setIsSearchActive(false)}
            className="text-amber-300 hover:text-amber-200 hover:bg-amber-400/20"
          >
            Show all products
          </Button>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-400/50 text-red-300 rounded-lg shadow-md backdrop-blur-sm">
          {error}
        </div>
      )}

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <ProductTable
            products={displayedProducts}
            loading={loading || refreshing}
            onEdit={openEditDialog}
            onView={openViewDialog}
          />
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold">Edit Product</DialogTitle>
            <p className="text-gray-300 mt-2">Update the product details below.</p>
          </DialogHeader>
          <ProductForm
            initialValues={currentProduct}
            onSubmit={handleEditProductSuccess}
            onCancel={() => setIsEditDialogOpen(false)}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold">Product Details</DialogTitle>
          </DialogHeader>
          <ProductDetails product={currentProduct} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
