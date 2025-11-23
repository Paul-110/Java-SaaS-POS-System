import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeForm, EmployeeTable } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStoreEmployee,
  findStoreEmployees,
  updateEmployee,
  deleteEmployee,
} from "@/Redux Toolkit/features/employee/employeeThunks";
import { storeAdminRole } from "@/utils/userRole";

export default function StoreEmployees() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const {store}=useSelector(state=>state.store)

  useEffect(() => {
    if (store?.id) {
      dispatch(
        findStoreEmployees({
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, store?.id, localStorage.getItem("jwt")]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAddEmployee = (newEmployeeData) => {
    if (store?.id && localStorage.getItem("jwt")) {
      dispatch(
        createStoreEmployee({
          employee: {
            ...newEmployeeData,
            storeId: store?.id,
            username: newEmployeeData.email.split("@")[0],
          },
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsAddDialogOpen(false);
    }
  };

  const handleEditEmployee = (updatedEmployeeData) => {
    if (currentEmployee?.id && localStorage.getItem("jwt")) {
      dispatch(
        updateEmployee({
          employeeId: currentEmployee.id,
          employeeDetails: updatedEmployeeData,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteEmployee = (id) => {
    if (localStorage.getItem("jwt")) {
      dispatch(deleteEmployee({ employeeId: id, token: localStorage.getItem("jwt") }));
    }
  };

  const openEditDialog = (employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-gray-400 mt-1">Manage your store's staff and roles.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Add New Employee</DialogTitle>
              <p className="text-gray-300 mt-2">Enter the details for the new employee.</p>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleAddEmployee}
              initialData={{
                fullName: "",
                email: "",
                password: "",
                phone: "",
                role: "",
                branchId: "",
              }}
              roles={storeAdminRole}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold">Edit Employee</DialogTitle>
              <p className="text-gray-300 mt-2">Update the employee details below.</p>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleEditEmployee}
              roles={storeAdminRole}
              initialData={
                currentEmployee
                  ? {
                      ...currentEmployee,
                      branchId: currentEmployee.branchId || "",
                    }
                  : null
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <EmployeeTable
          employees={employees}
          onEdit={openEditDialog}
          onDelete={handleDeleteEmployee}
        />
      </div>
    </div>
  );
}
