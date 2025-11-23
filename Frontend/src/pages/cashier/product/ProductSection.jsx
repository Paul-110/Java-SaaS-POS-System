import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Barcode, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getProductsByStore,
  searchProducts,
} from "../../../Redux Toolkit/features/product/productThunks";
import { getBranchById } from "../../../Redux Toolkit/features/branch/branchThunks";
import { clearSearchResults } from '@/Redux Toolkit/features/product/productSlice';

const ProductSection = ({searchInputRef}) => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);
  const { userProfile } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    products,
    searchResults,
    loading,
    error: productsError
  } = useSelector((state) => state.product);

  const { toast } = useToast();

   

  const getDisplayProducts = () => {
    if (searchTerm.trim() && searchResults.length > 0) {
      return searchResults;
    }
    return products || [];
  };

  // Fetch products when component mounts or when branch changes
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching products...", { branch, userProfile });

      // Wait for branch to be loaded
      if (branch?.storeId && localStorage.getItem("jwt")) {
        console.log("Fetching products for branch:", branch.storeId);
        try {
          await dispatch(
            getProductsByStore(branch.storeId)
          ).unwrap();
        } catch (error) {
          console.error("Failed to fetch products:", error);
          toast({
            title: "Error",
            description: error || "Failed to fetch products",
            variant: "destructive",
          });
        }
      } else if (
        userProfile?.branchId &&
        localStorage.getItem("jwt") &&
        !branch
      ) {
        // If branch is not loaded but we have branchId in userProfile, fetch branch first
        console.log("Fetching branch first:", userProfile.branchId);
        try {
          await dispatch(
            getBranchById({
              id: userProfile.branchId,
              jwt: localStorage.getItem("jwt"),
            })
          ).unwrap();
        } catch (error) {
          console.error("Failed to fetch branch:", error);
          toast({
            title: "Error",
            description: "Failed to load branch information",
            variant: "destructive",
          });
        }
      }
    };

    fetchProducts();
  }, [dispatch, branch, userProfile, toast]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (query.trim() && branch?.storeId && localStorage.getItem("jwt")) {
            dispatch(
              searchProducts({
                query: query.trim(),
                storeId: branch.storeId,
              })
            )
              .unwrap()
              .catch((error) => {
                console.error("Search failed:", error);
                toast({
                  title: "Search Error",
                  description: error || "Failed to search products",
                  variant: "destructive",
                });
              });
          }
        }, 500); // 300ms debounce
      };
    })(),
    [dispatch, branch, toast]
  );

  // Handle search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      debouncedSearch(e.target.value);
    } else {
      // Clear search results when search term is empty
      dispatch(clearSearchResults());
    }
  };

    // Show error toast if products fail to load
    useEffect(() => {
      if (productsError) {
        toast({
          title: 'Error',
          description: productsError,
          variant: 'destructive',
        });
      }
    }, [productsError, toast]);

  return (
    <div className="w-3/5 flex flex-col bg-black/10 border-r border-white/10">
      {/* Search Section */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search products or scan barcode (F1)"
            className="w-full pl-10 pr-4 py-3 text-lg border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
            value={searchTerm}
            onChange={handleSearchChange}
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">
            {loading
              ? "Loading products..."
              : searchTerm.trim()
              ? `Search results: ${getDisplayProducts().length} products found`
              : `${getDisplayProducts().length} products found`}
          </span>
          <div className="flex gap-2">
            {searchTerm.trim() && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => setSearchTerm("")}
                disabled={loading}
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              disabled={loading}
            >
              <Barcode className="w-4 h-4 mr-1" />
              Scan
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <p className="text-gray-400">Loading products...</p>
            </div>
          </div>
        ) : getDisplayProducts().length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                {searchTerm
                  ? "No products found matching your search"
                  : "No products available"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {getDisplayProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
               
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
