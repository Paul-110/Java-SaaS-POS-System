import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import {
  getAllBranchesByStore,
} from "@/Redux Toolkit/features/branch/branchThunks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BranchTable from "./BranchTable";
import BranchForm from "./BranchForm";

export default function Branches() {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branch);
  const { store } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);



  // Fetch branches when component mounts
  useEffect(() => {
    if (store?.id) {
      dispatch(
        getAllBranchesByStore({
          storeId: store.id,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, store, user]);

  console.log("store ", store);

  const handleAddBranchSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditBranchSuccess = () => {
    setIsEditDialogOpen(false);
    setCurrentBranch(null);
  };

  const openEditDialog = (branch) => {
    setCurrentBranch(branch);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
          <p className="text-gray-400 mt-1">Oversee all your store locations.</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Add Branch
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Add New Branch</DialogTitle>
              <p className="text-gray-300 mt-2">Enter the details for the new branch.</p>
            </DialogHeader>
            <BranchForm 
              onSubmit={handleAddBranchSuccess} 
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Edit Branch</DialogTitle>
              <p className="text-gray-300 mt-2">Update the branch details below.</p>
            </DialogHeader>
            <BranchForm 
              initialValues={currentBranch} 
              onSubmit={handleEditBranchSuccess} 
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
          <BranchTable 
            branches={branches} 
            loading={loading} 
            onEdit={openEditDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
}
