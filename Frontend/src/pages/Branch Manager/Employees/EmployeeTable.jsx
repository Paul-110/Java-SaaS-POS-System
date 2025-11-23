import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, UserX, Key, BarChart } from "lucide-react";

const loginAccess=true

const EmployeeTable = ({
  employees,
  handleToggleAccess,
  openResetPasswordDialog,
  openPerformanceDialog,
  openEditDialog,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10">
          <TableHead className="text-gray-400">Name</TableHead>
          <TableHead className="text-gray-400">Role</TableHead>
          <TableHead className="text-gray-400">Email</TableHead>
          <TableHead className="text-gray-400">Login Access</TableHead>
         
          <TableHead className="text-gray-400">Assigned Since</TableHead>
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees?.length > 0 ? (
          employees.map((employee) => (
            <TableRow key={employee.id} className="border-white/10">
              <TableCell className="font-medium text-white">{employee.fullName}</TableCell>
              <TableCell className="text-gray-300">{employee.role.replace('ROLE_BRANCH_', '').replace('_', ' ')}</TableCell>
              <TableCell className="text-gray-300">{employee.email}</TableCell>
              <TableCell>
                <Badge
                  className={
                    loginAccess
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                  }
                  variant="secondary"
                >
                  {loginAccess ? "Enabled" : "Disabled"}
                </Badge>
              </TableCell>
            
              <TableCell className="text-gray-300">{new Date(employee.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleAccess(employee)}
                    title={
                      employee.loginAccess
                        ? "Disable Access"
                        : "Enable Access"
                    }
                    className="bg-transparent border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openResetPasswordDialog(employee)}
                    title="Reset Password"
                    className="bg-transparent border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300"
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openPerformanceDialog(employee)}
                    title="View Performance"
                    className="bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  >
                    <BarChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(employee)}
                    title="Edit Employee"
                    className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-16 text-gray-400">
              <h3 className="text-xl font-semibold">No Employees Found</h3>
              <p className="mt-2">Add your first employee to get started.</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;