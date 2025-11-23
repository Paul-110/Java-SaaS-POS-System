import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, Phone, Users, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { deleteBranch, getAllBranchesByStore } from "@/Redux Toolkit/features/branch/branchThunks";

const BranchTable = ({ branches, loading, onEdit }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const handleDeleteBranch = async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!id || !jwt) {
        toast({
          title: "Error",
          description: "Branch ID or authentication JWT missing",
          variant: "destructive",
        });
        return;
      }

      await dispatch(deleteBranch({ id, jwt })).unwrap();

      toast({
        title: "Success",
        description: "Branch deleted successfully",
      });

      // Refresh branches list
      dispatch(getAllBranchesByStore({ storeId: store.id, jwt }));
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete branch",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10">
          <TableHead className="text-gray-400">Branch Name</TableHead>
          <TableHead className="text-gray-400">Address</TableHead>
          <TableHead className="text-gray-400">Manager</TableHead>
          <TableHead className="text-gray-400">Phone</TableHead>
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <div className="flex justify-center items-center h-64 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
                Loading branches...
              </div>
            </TableCell>
          </TableRow>
        ) : branches.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <div className="text-center py-16 text-gray-400">
                <h3 className="text-xl font-semibold">No Branches Found</h3>
                <p className="mt-2">Add your first branch to get started.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          branches.map((branch) => (
            <TableRow key={branch.id} className="border-white/10">
              <TableCell className="font-medium text-white">
                {branch.name}
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {branch.address}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  {branch.manager || "Not Assigned"}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {branch.phone}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(branch)} className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    onClick={() => handleDeleteBranch(branch.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default BranchTable;