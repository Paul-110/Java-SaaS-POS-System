import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Loader2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { User } from "lucide-react";
import { getTopCashiersByRevenue } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const CashierPerformance = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { topCashiers, loading } = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getTopCashiersByRevenue(branchId));
    }
  }, [branchId, dispatch]);

  // Map API data to recharts format
  const data = topCashiers?.map((item) => ({
    name: item.cashierName,
    sales: item.totalRevenue,
  })) || [];

  const config = {
    sales: {
      label: "Sales",
      color: "#3b82f6",
    },
  };

  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <CardTitle className="text-xl font-semibold text-white">Cashier Performance</CardTitle>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-emerald-400" />
          <span className="text-sm text-gray-400">Top 5 Cashiers</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <XAxis type="number" stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <YAxis dataKey="name" type="category" stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <ChartTooltip
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '0.75rem',
                  color: 'white'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Bar dataKey="sales" fill="currentColor" radius={[0, 4, 4, 0]} className="fill-emerald-500" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CashierPerformance;