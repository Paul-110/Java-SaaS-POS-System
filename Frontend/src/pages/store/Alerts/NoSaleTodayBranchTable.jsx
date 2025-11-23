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

const noSaleBranches = [
  { name: "Branch Downtown", lastSale: "2025-11-21" },
  { name: "Branch Westside", lastSale: "2025-11-20" },
];

const NoSaleTodayBranchTable = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle />
          Branches with No Sales Today
        </CardTitle>
        <CardDescription className="text-gray-400">
          These branches have not recorded any sales today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                <TableHead className="text-white">Branch Name</TableHead>
                <TableHead className="text-right text-white">Last Sale Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noSaleBranches.map((branch, index) => (
                <TableRow key={index} className="hover:bg-white/5 border-b-white/10">
                  <TableCell className="font-medium text-white">{branch.name}</TableCell>
                  <TableCell className="text-right text-gray-400">{branch.lastSale}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoSaleTodayBranchTable;
