import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const EmployeeStats = ({ employees }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-400">
              Total Employees
            </h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">{employees.length}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-400">
              Active Employees
            </h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">
              {employees.length}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-400">Cashiers</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">
              {
                employees.filter(
                  (e) => e.role === "ROLE_BRANCH_CASHIER"
                ).length
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeStats;