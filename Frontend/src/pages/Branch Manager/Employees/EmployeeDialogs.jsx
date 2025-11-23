import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeForm } from "../../store/Employee";
import { Plus } from "lucide-react";
import { branchAdminRole } from "../../../utils/userRole";

export const AddEmployeeDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  handleAddEmployee,
  roles,
}) => (
  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    <DialogTrigger asChild>
      <Button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <Plus className="mr-2 h-4 w-4" /> Add Employee
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
      <DialogHeader className="text-center">
        <DialogTitle className="text-3xl font-bold">Add New Employee</DialogTitle>
        <p className="text-gray-300 mt-2">Enter the details for the new employee.</p>
      </DialogHeader>
      <EmployeeForm
        initialData={null}
        onSubmit={handleAddEmployee}
        roles={roles}
      />
    </DialogContent>
  </Dialog>
);

export const EditEmployeeDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedEmployee,
  handleEditEmployee,
  roles,
}) =>
  selectedEmployee && (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold">Edit Employee</DialogTitle>
          <p className="text-gray-300 mt-2">Update the employee details below.</p>
        </DialogHeader>
        <EmployeeForm
          initialData={
            selectedEmployee
              ? {
                  ...selectedEmployee,
                  branchId: selectedEmployee.branchId || "",
                }
              : null
          }
          onSubmit={handleEditEmployee}
          roles={roles}
        />
      </DialogContent>
    </Dialog>
  );

export const ResetPasswordDialog = ({
  isResetPasswordDialogOpen,
  setIsResetPasswordDialogOpen,
  selectedEmployee,
  handleResetPassword,
}) =>
  selectedEmployee && (
    <Dialog
      open={isResetPasswordDialogOpen}
      onOpenChange={setIsResetPasswordDialogOpen}
    >
      <DialogContent className="sm:max-w-md bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Reset Password</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-300">
            Are you sure you want to reset the password for{" "}
            <strong className="text-white">{selectedEmployee.fullName}</strong>?
          </p>
          <p className="text-sm text-gray-400 mt-2">
            A temporary password will be generated and sent to their email
            address.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            onClick={() => setIsResetPasswordDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleResetPassword} className="bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Reset Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

export const PerformanceDialog = ({
  isPerformanceDialogOpen,
  setIsPerformanceDialogOpen,
  selectedEmployee,
}) =>
  selectedEmployee && (
    <Dialog
      open={isPerformanceDialogOpen}
      onOpenChange={setIsPerformanceDialogOpen}
    >
      <DialogContent className="max-w-3xl bg-gray-900/80 border-white/20 text-white backdrop-blur-lg p-10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold">
            Performance Summary - {selectedEmployee.name}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {selectedEmployee.role === "ROLE_BRANCH_CASHIER" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Orders Processed
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">127</p>
                      <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Total Sales
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">₹78,450</p>
                      <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Avg. Order Value
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">₹617</p>
                      <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold text-white">
                    Daily Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full flex items-center justify-center bg-black/20 rounded-md border border-white/10">
                    <p className="text-gray-400">
                      Sales chart would appear here in production
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Stock Updates
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">42</p>
                      <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Products Managed
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">156</p>
                      <p className="text-sm text-gray-400 mt-1">Total</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        Inventory Accuracy
                      </h3>
                      <p className="text-3xl font-bold mt-2 text-emerald-400">98%</p>
                      <p className="text-sm text-gray-400 mt-1">Last audit</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold text-white">
                    Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-200">
                          Updated stock for 12 products
                        </p>
                        <p className="text-sm text-gray-400">
                          Grocery category
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">2 days ago</p>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-200">Added 5 new products</p>
                        <p className="text-sm text-gray-400">Dairy category</p>
                      </div>
                      <p className="text-sm text-gray-400">5 days ago</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-200">
                          Completed monthly inventory audit
                        </p>
                        <p className="text-sm text-gray-400">All categories</p>
                      </div>
                      <p className="text-sm text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsPerformanceDialogOpen(false)} className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Close
          </Button>
          <Button variant="outline" className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">Export Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
