import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store, Clock, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  getDashboardSummary,
  getStoreRegistrationStats,
  getStoreStatusDistribution
} from "../../Redux Toolkit/features/adminDashboard/adminDashboardThunks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const COLORS = {
  ACTIVE: "hsl(var(--primary))",
  PENDING: "#f59e0b", // A vibrant yellow for warning
  BLOCKED: "#ef4444", // A standard destructive red
};

const StatCard = ({ title, value, icon, description, trend }) => (
  <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium text-gray-400">
        {title}
      </h3>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-400 flex items-center gap-1">
        {trend !== undefined && (
          <span className={trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : ""}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
        {description}
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    dashboardSummary,
    storeRegistrationStats,
    storeStatusDistribution,
    loading,
    error
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(getDashboardSummary());
    dispatch(getStoreRegistrationStats());
    dispatch(getStoreStatusDistribution());
  }, [dispatch]);

  const barData = storeRegistrationStats?.map((item) => ({
    date: item.date || item.day || item.label,
    stores: item.count || item.value || 0
  })) || [];

  const pieData = storeStatusDistribution
    ? [
        { name: "Active", value: storeStatusDistribution.active, color: COLORS.ACTIVE },
        { name: "Pending", value: storeStatusDistribution.pending, color: COLORS.PENDING },
        { name: "Blocked", value: storeStatusDistribution.blocked, color: COLORS.BLOCKED },
      ]
    : [];

  if (loading && !dashboardSummary) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-400">
          Overview of all stores and system statistics
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Stores"
          value={dashboardSummary?.totalStores ?? "—"}
          icon={<Store className="h-4 w-4 text-gray-400" />}
          description="from last month"
          trend={undefined}
        />
        <StatCard
          title="Active Stores"
          value={dashboardSummary?.activeStores ?? "—"}
          icon={<TrendingUp className="h-4 w-4 text-gray-400" />}
          description="currently operational"
          trend={undefined}
        />
        <StatCard
          title="Blocked Stores"
          value={dashboardSummary?.blockedStores ?? "—"}
          icon={<AlertTriangle className="h-4 w-4 text-gray-400" />}
          description="suspended accounts"
          trend={undefined}
        />
        <StatCard
          title="Pending Requests"
          value={dashboardSummary?.pendingStores ?? "—"}
          icon={<Clock className="h-4 w-4 text-gray-400" />}
          description="awaiting approval"
          trend={undefined}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Store Registrations (Last 7 Days)
          </h3>
          <div className="w-full min-h-[350px]">
            {loading || barData.length === 0 ? (
              <div className="flex items-center justify-center h-[350px]">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barData}>
                  <XAxis
                    dataKey="date"
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
                    tickFormatter={(value) => `${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <Tooltip
                    cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.7)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Bar
                    dataKey="stores"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-emerald-500"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-span-3 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Store Status Distribution
          </h3>
          <div className="w-full min-h-[350px]">
            {loading || pieData.length === 0 ? (
              <div className="flex items-center justify-center h-[350px]">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          className="text-xs font-medium"
                        >
                          {`${pieData[index].name} (${(percent * 100).toFixed(0)}%)`}
                        </text>
                      );
                    }}
                    >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.7)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '0.75rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity - still mock for now */}
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">New store "Zosh Mart" registered</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Store "ABC Supermarket" pending approval</p>
                <p className="text-xs text-gray-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Store "XYZ Store" blocked for policy violation</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}