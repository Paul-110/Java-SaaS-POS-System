import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; 
import { CheckCircle, XCircle, Clock, Loader2, AlertTriangle } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { getAllStores, moderateStore } from "@/Redux Toolkit/features/store/storeThunks";
import { formatDateTime } from "@/utils/formateDate";

export default function PendingRequestsPage() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllStores("PENDING"));
  }, [dispatch]);

  const handleApprove = (store) => {
    setSelectedRequest(store);
    setApprovalDialogOpen(true);
  };

  const handleReject = (store) => {
    setSelectedRequest(store);
    setRejectionDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (selectedRequest) {
      setUpdatingId(selectedRequest.id);
      try {
        await dispatch(moderateStore({ storeId: selectedRequest.id, action: "ACTIVE" })).unwrap();
        toast({
          title: "Store Approved",
          description: `${selectedRequest.brand} has been approved successfully.`,
        });
      } catch (e) {
        toast({
          title: "Approval Failed",
          description: e?.message || "Failed to approve store.",
          variant: "destructive",
        });
      } finally {
        setApprovalDialogOpen(false);
        setSelectedRequest(null);
        setUpdatingId(null);
      }
    }
  };

  const confirmReject = async () => {
    if (selectedRequest && rejectionReason.trim()) {
      setUpdatingId(selectedRequest.id);
      try {
        await dispatch(moderateStore({ storeId: selectedRequest.id, action: "BLOCKED" })).unwrap();
        toast({
          title: "Store Rejected",
          description: `${selectedRequest.brand} has been rejected.`,
        });
      } catch (e) {
        toast({
          title: "Rejection Failed",
          description: e?.message || "Failed to reject store.",
          variant: "destructive",
        });
      } finally {
        setRejectionDialogOpen(false);
        setSelectedRequest(null);
        setRejectionReason("");
        setUpdatingId(null);
      }
    }
  };



  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Pending Store Requests</h2>
          <p className="text-gray-400">
            Review and approve new store registration requests
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-300 border-yellow-500/20">
          <Clock className="w-3 h-3" />
          {stores.length} Pending
        </Badge>
      </div>

      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        {loading && stores.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-destructive">
            <AlertTriangle className="w-8 h-8 mb-2" />
            <p>{error}</p>
          </div>
        ) : stores.length > 0 ? (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                    <TableHead>Store Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Submitted On</TableHead>
                   
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stores.filter(s => s.status === 'PENDING').map((store) => (
                    <TableRow key={store.id} className="hover:bg-white/5 border-b-white/10">
                      <TableCell className="font-medium text-white">{store.brand}</TableCell>
                      <TableCell className="text-gray-400">{store.storeAdmin?.fullName}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-300">{store.contact?.phone}</div>
                          <div className="text-gray-400">{store.contact?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{store.storeType || "-"}</TableCell>
                      <TableCell>{formatDateTime(store.createdAt)}</TableCell>
                 
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(store)}
                            className="border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                            disabled={updatingId === store.id}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {updatingId === store.id ? "Approving..." : "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(store)}
                            className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                            disabled={updatingId === store.id}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            {updatingId === store.id ? "Rejecting..." : "Reject"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p>No pending requests at the moment.</p>
          </div>
        )}
      </div>

      {/* Approval Confirmation Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle>Approve Store Registration</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to approve {selectedRequest?.brand}? This will activate their account and allow them to start using the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApprove} className="bg-emerald-600 hover:bg-emerald-500">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle>Reject Store Registration</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide a reason for rejecting {selectedRequest?.brand}. This will be communicated to the store owner.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
              className="bg-white/5 border-white/20 text-white placeholder-gray-500"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectionReason.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 