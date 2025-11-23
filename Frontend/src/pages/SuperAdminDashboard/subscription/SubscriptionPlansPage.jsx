import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  getAllSubscriptionPlans,
  deleteSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks";

import { toast} from "../../../components/ui/use-toast";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";
import AddPlanDialog from "./AddPlanDialog";
import { Switch } from "../../../components/ui/switch";
import EditPlanDialog from "./EditPlanDialog";
import { AlertTriangle, Check, CheckCircle, Edit, Loader2, PlusCircle, Trash2, X } from "lucide-react";

const FEATURE_FLAGS = [
  { key: "enableAdvancedReports", label: "Advanced Reports" },
  { key: "enableInventory", label: "Inventory System" },
  { key: "enableIntegrations", label: "Integrations" },
  { key: "enableEcommerce", label: "eCommerce" },
  { key: "enableInvoiceBranding", label: "Invoice Branding" },
  { key: "prioritySupport", label: "Priority Support" },
  { key: "enableMultiLocation", label: "Multi-location" },
];


const columns = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "billingCycle", label: "Billing Cycle" },
  { key: "maxBranches", label: "Branches" },
  { key: "maxUsers", label: "Users" },
  { key: "maxProducts", label: "Products" },
  { key: "status", label: "Status" },
  { key: "features", label: "Features" },
  { key: "actions", label: "Actions" },
];

const SubscriptionPlansPage = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector(
    (state) => state.subscriptionPlan
  );

  const [search, setSearch] = useState("");

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  const filteredPlans = useMemo(() => {
    let filtered = plans;
    if (search) {
      filtered = filtered.filter((plan) =>
        plan.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [plans, search]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this subscription plan?")
    ) {
      const res = await dispatch(deleteSubscriptionPlan(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Plan Deleted",
          description: "Subscription plan deleted successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: res.payload || "Failed to delete plan",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusToggle = async (plan) => {
    setStatusLoadingId(plan.id);
    const updated = { ...plan, active: !plan.active };    
    const res = await dispatch(updateSubscriptionPlan({ id: plan.id, plan: updated }));
    setStatusLoadingId(null);
    if (res.meta.requestStatus === 'fulfilled') {
      toast({ title: 'Status Updated', description: `Plan is now ${updated.active ? 'Active' : 'Inactive'}`, variant: 'success' });
      dispatch(getAllSubscriptionPlans());
    } else {
      toast({ title: 'Error', description: res.payload || 'Failed to update status', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Subscription Plans</h2>
        <p className="text-gray-400">
          Create, view, and manage subscription plans for stores
        </p>
      </div>
      <AddPlanDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={() => dispatch(getAllSubscriptionPlans())}
      />
      <EditPlanDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        plan={selectedPlan}
        onSuccess={() => {
          setEditDialogOpen(false);
          setSelectedPlan(null);
          dispatch(getAllSubscriptionPlans());
        }}
      />
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <Input
            placeholder="Search plans by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-white/5 border-white/20 text-white placeholder-gray-500"
          />
          <Button onClick={() => setAddDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-500">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Plan
          </Button>
        </div>

        {loading && plans.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-destructive">
            <AlertTriangle className="w-8 h-8 mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                  {columns.map((col) => (
                    <TableHead key={col.key} className="text-white">{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center h-24 text-gray-400">
                      No plans found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlans.map((plan) => (
                    <TableRow key={plan.id} className="hover:bg-white/5 border-b-white/10">
                      <TableCell className="font-medium text-white">{plan.name}</TableCell>
                      <TableCell className="text-gray-300">₹{plan.price.toLocaleString()}</TableCell>
                      <TableCell className="capitalize text-gray-400">{plan.billingCycle.toLowerCase()}</TableCell>
                      <TableCell className="text-gray-300">{plan.maxBranches}</TableCell>
                      <TableCell className="text-gray-300">{plan.maxUsers}</TableCell>
                      <TableCell className="text-gray-300">{plan.maxProducts}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={!!plan.active}
                            onCheckedChange={() => handleStatusToggle(plan)}
                            disabled={statusLoadingId === plan.id}
                          />
                          <span className={plan.active ? 'text-green-400' : 'text-red-400'}>
                            {plan.active ? 'Active' : 'Inactive'}
                          </span>
                          {statusLoadingId === plan.id && <Loader2 className="w-4 h-4 animate-spin" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            {FEATURE_FLAGS.map(f => (
                              <Tooltip key={f.key}>
                                <TooltipTrigger>
                                  {plan[f.key] ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-gray-500" />}
                                </TooltipTrigger>
                                <TooltipContent>{f.label}</TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setSelectedPlan(plan);
                              setEditDialogOpen(true);
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-400"
                            onClick={() => handleDelete(plan.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
