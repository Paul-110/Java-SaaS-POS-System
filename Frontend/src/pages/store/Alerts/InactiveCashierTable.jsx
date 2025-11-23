import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { AlertTriangle } from "lucide-react";

const inactiveCashiers = [
  { name: "John Doe", branch: "Branch Downtown", lastActive: "2025-11-18" },
  { name: "Jane Smith", branch: "Branch Uptown", lastActive: "2025-11-19" },
];

const InactiveCashierTable = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle />
          Inactive Cashiers
        </CardTitle>
        <CardDescription className="text-gray-400">
          These cashiers have been inactive for more than 3 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                <TableHead className="text-white">Cashier Name</TableHead>
                <TableHead className="text-white">Branch</TableHead>
                <TableHead className="text-right text-white">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inactiveCashiers.map((cashier, index) => (
                <TableRow key={index} className="hover:bg-white/5 border-b-white/10">
                  <TableCell className="font-medium text-white">{cashier.name}</TableCell>
                  <TableCell className="text-gray-400">{cashier.branch}</TableCell>
                  <TableCell className="text-right text-gray-400">{cashier.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InactiveCashierTable;
