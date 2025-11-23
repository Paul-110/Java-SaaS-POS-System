import React from "react";
import LowStockProductTable from "./LowStockProductTable";
import NoSaleTodayBranchTable from "./NoSaleTodayBranchTable";
import InactiveCashierTable from "./InactiveCashierTable";
import RefundSpikeTable from "./RefundSpikeTable";

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Alerts</h2>
        <p className="text-gray-400">
          Critical and warning alerts for your store operations.
        </p>
      </div>
      <div className="space-y-6">
        <LowStockProductTable />
        <NoSaleTodayBranchTable />
        <InactiveCashierTable />
        <RefundSpikeTable />
      </div>
    </div>
  );
};

export default Alerts;
