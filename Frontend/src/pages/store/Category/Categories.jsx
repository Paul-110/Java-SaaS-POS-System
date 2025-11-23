import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCategoriesByStore } from "@/Redux Toolkit/features/category/categoryThunks";
import { toast } from "@/components/ui/use-toast";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { store } = useSelector((state) => state.store);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);


  // Fetch categories on mount or when store changes
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (store?.id && token) {
      dispatch(getCategoriesByStore({ storeId: store.id, token }));
    }
  }, [dispatch, store]);

  const handleAddCategorySuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditCategorySuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentCategory(null);
  };

  const openEditDialog = (category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
          <p className="text-gray-400 mt-1">Organize your products into categories.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Add New Category</DialogTitle>
              <p className="text-gray-300 mt-2">Enter the details for the new category.</p>
            </DialogHeader>
            <CategoryForm 
              onSubmit={handleAddCategorySuccess} 
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} >
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Edit Category</DialogTitle>
              <p className="text-gray-300 mt-2">Update the category details below.</p>
            </DialogHeader><CategoryForm 
              initialValues={currentCategory} 
              onSubmit={handleEditCategorySuccess} 
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-400/50 text-red-300 rounded-lg shadow-md backdrop-blur-sm">{error}</div>
      )}

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <CategoryTable 
            categories={categories} 
            loading={loading} 
            onEdit={openEditDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
}