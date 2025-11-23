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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getDailySalesChart } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const SalesChart = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const analytics = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getDailySalesChart({ branchId }));
    }
  }, [branchId, dispatch]);



  // Map API data to recharts format
  const data = analytics?.dailySales?.map((item) => ({
    name: item.date,
    sales: item.totalSales,
  })) || [];

  const config = {
    sales: {
      label: "Sales",
      color: "#6D214F",
    },
  };

  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-xl font-semibold text-white">Daily Sales</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="rgba(255, 255, 255, 0.5)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.5)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
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
              <Bar
                dataKey="sales"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-emerald-500"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {analytics?.loading && <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>}
      </CardContent>
    </Card>
  );
};

export default SalesChart;