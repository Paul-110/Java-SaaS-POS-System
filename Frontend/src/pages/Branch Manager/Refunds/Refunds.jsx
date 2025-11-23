import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {   Card,CardContent, } from "@/components/ui/card.jsx";
import { Button } from "../../../components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAllRefunds,
  getRefundsByBranch,
} from "../../../Redux Toolkit/features/refund/refundThunks";


const Refunds = () => {
  const dispatch = useDispatch();
  const { branch, loading: branchLoading } = useSelector((store) => store.branch);
  const { refundsByBranch: refunds, loading: refundsLoading } = useSelector((store) => store.refund);

  useEffect(() => {
    if (branch) dispatch(getRefundsByBranch(branch?.id));
  }, [branch]);

  console.log("refund s", refunds)
  const loading = branchLoading || refundsLoading;

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Refund Management</h1>
          <p className="text-gray-400 mt-1">Review all processed refunds for your branch.</p>
        </div>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="w-[100px] text-gray-400">ID</TableHead>
                <TableHead className="text-gray-400">Order ID</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-right text-gray-400">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-16">
                    <div className="flex justify-center items-center text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
                      Loading refunds...
                    </div>
                  </TableCell>
                </TableRow>
              ) : refunds?.length > 0 ? (
                refunds?.map((refund) => (
                  <TableRow key={refund?.id} className="border-white/10">
                    <TableCell className="font-medium text-white">#{refund.id}</TableCell>
                    <TableCell className="font-medium text-gray-300">#ORD-{refund.orderId}</TableCell>
                    <TableCell className="text-emerald-400 font-medium">₹{refund.amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell className="text-right text-gray-300">{refund.reason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-16 text-gray-400">
                    <h3 className="text-xl font-semibold">No Refunds Found</h3>
                    <p className="mt-2">There are no refunds to display for this branch.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Refunds;
