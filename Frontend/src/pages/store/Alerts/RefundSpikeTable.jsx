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
import { Badge } from "../../../components/ui/badge";

const refundSpikes = [
  { branch: "Branch Downtown", refundsToday: 15, average: 4 },
  { branch: "Branch South", refundsToday: 8, average: 2 },
];

const RefundSpikeTable = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <AlertTriangle />
          Unusual Refund Activity
        </CardTitle>
        <CardDescription className="text-gray-400">
          These branches have a significantly higher number of refunds today compared to their daily average.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                <TableHead className="text-white">Branch Name</TableHead>
                <TableHead className="text-center text-white">Refunds Today</TableHead>
                <TableHead className="text-center text-white">Daily Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundSpikes.map((spike, index) => (
                <TableRow key={index} className="hover:bg-white/5 border-b-white/10">
                  <TableCell className="font-medium text-white">{spike.branch}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="destructive" className="bg-red-500/10 text-red-300 border-red-500/20 text-base">
                      {spike.refundsToday}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-gray-400">{spike.average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RefundSpikeTable;
