import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { branchAdminRole } from "../../../utils/userRole";

import EmployeeStats from "./EmployeeStats";
import EmployeeTable from "./EmployeeTable";
import {
  AddEmployeeDialog,
  EditEmployeeDialog,
  ResetPasswordDialog,
  PerformanceDialog,
} from "./EmployeeDialogs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createBranchEmployee,
  findBranchEmployees,
  updateEmployee,
} from "../../../Redux Toolkit/features/employee/employeeThunks";

const getStatusColor = (status) => {
  if (status === "Active") {
    return "text-green-500";
  } else if (status === "Inactive") {
    return "text-red-500";
  } else {
    return "text-gray-500";
  }
};

const BranchEmployees = () => {
  // const [employees, setEmployees] = useState([]); // Initialize with empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dispatch = useDispatch();
  // const { store } = useSelector((state) => state);
  const { branch } = useSelector((state) => state.branch);
  const {employees}=useSelector((state)=>state.employee)
  const { userProfile } = useSelector((state) => state.user);


  console.log("branch employees", employees);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmployee = (newEmployeeData) => {
    if (branch?.id && userProfile.branchId) {
      const data = {
        employee: {
          ...newEmployeeData,

          username: newEmployeeData.email.split("@")[0],
        },
        branchId: branch.id,
        token: localStorage.getItem("jwt"),
      };
      console.log("branch employee data ", data);
      dispatch(createBranchEmployee(data));
      setIsAddDialogOpen(false);
    }
  };

  const handleEditEmployee = (updatedEmployeeData) => {
    if (selectedEmployee?.id && localStorage.getItem("jwt")) {
      const data={
          employeeId: selectedEmployee.id,
          employeeDetails: updatedEmployeeData,
          token: localStorage.getItem("jwt"),

        }
      dispatch(
        updateEmployee(data)
      );
      setIsEditDialogOpen(false);
    }
  };

    useEffect(() => {
      if (branch?.id) {
        dispatch(
          findBranchEmployees({
            branchId: branch?.id
          })
        );
      }
    }, [dispatch, branch?.id]);

  // const handleEditEmployee = (updatedEmployeeData) => {
  //   const updatedEmployees = employees.map((employee) =>
  //     employee.id === updatedEmployeeData.id
  //       ? {
  //           ...updatedEmployeeData,
  //           status: updatedEmployeeData.loginAccess ? "Active" : "Inactive",
  //         }
  //       : employee
  //   );
  //   setEmployees(updatedEmployees);
  //   setIsEditDialogOpen(false);
  // };

  const handleToggleAccess = (employee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === employee.id
        ? {
            ...emp,
            loginAccess: !emp.loginAccess,
            status: !emp.loginAccess ? "Inactive" : "Active",
          }
        : emp
    );
    // setEmployees(updatedEmployees);
  };

  const handleResetPassword = () => {
    console.log(`Password reset for ${selectedEmployee.name}`);
    setIsResetPasswordDialogOpen(false);
  };

  const openEditDialog = (employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const openResetPasswordDialog = (employee) => {
    setSelectedEmployee(employee);
    setIsResetPasswordDialogOpen(true);
  };

  const openPerformanceDialog = (employee) => {
    setSelectedEmployee(employee);
    setIsPerformanceDialogOpen(true);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-gray-400 mt-1">Manage your branch's staff and roles.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input type="text" placeholder="Search employees..." value={searchTerm} onChange={handleSearch} className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40" />
        </div>
        <AddEmployeeDialog
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          handleAddEmployee={handleAddEmployee}
          roles={branchAdminRole}
        />
      </div>
      <EmployeeStats employees={employees} />
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <EmployeeTable
          employees={filteredEmployees}
          getStatusColor={getStatusColor}
          handleToggleAccess={handleToggleAccess}
          openEditDialog={openEditDialog}
          openResetPasswordDialog={openResetPasswordDialog}
          openPerformanceDialog={openPerformanceDialog}
        />
      </div>

      <EditEmployeeDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        selectedEmployee={selectedEmployee}
        handleEditEmployee={handleEditEmployee}
        roles={branchAdminRole}
      />

      <ResetPasswordDialog
        isResetPasswordDialogOpen={isResetPasswordDialogOpen}
        setIsResetPasswordDialogOpen={setIsResetPasswordDialogOpen}
        selectedEmployee={selectedEmployee}
        handleResetPassword={handleResetPassword}
      />

      <PerformanceDialog
        isPerformanceDialogOpen={isPerformanceDialogOpen}
        setIsPerformanceDialogOpen={setIsPerformanceDialogOpen}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
};

export default BranchEmployees;
