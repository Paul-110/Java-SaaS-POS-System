import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag, Loader2 } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/Redux Toolkit/features/category/categoryThunks';
import { toast } from '@/components/ui/use-toast';

const CategoryTable = ({ categories, loading, onEdit }) => {
  const dispatch = useDispatch();

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await dispatch(deleteCategory({ id, token })).unwrap();
      toast({ title: "Success", description: "Category deleted successfully" });
    } catch (err) {
      toast({ title: "Error", description: err || "Failed to delete category", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <h3 className="text-xl font-semibold">No Categories Found</h3>
        <p className="mt-2">Add your first category to get started.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-400">Category Name</TableHead>
          <TableHead className="text-gray-400">Description</TableHead>
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => ( 
          <TableRow key={category.id} className="border-white/10">
            <TableCell className="text-white">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">{category.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-400 truncate max-w-xs">
              {category.description || 'No description'}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                  onClick={() => handleDeleteCategory(category.id)}
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

export default CategoryTable;