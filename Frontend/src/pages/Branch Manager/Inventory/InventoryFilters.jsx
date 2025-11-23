import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InventoryFilters = ({
  searchTerm,
  onSearch,
  category,
  onCategoryChange,
  products,
  inventoryRows,
}) => (
  <Card className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl">
    <CardContent className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
        <div className="relative">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full text-left border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800/80 border-white/20 text-white backdrop-blur-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {[...new Set(products.map((p) => p.category).filter(Boolean))].map((cat) => (
                <SelectItem key={cat} value={cat} className="focus:bg-emerald-700/50">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center justify-center border border-white/10 p-3 rounded-lg bg-black/20">
          <h3 className="text-lg font-medium text-gray-400">Total Quantity:</h3>
          <p className="text-xl font-bold text-emerald-400">
            {inventoryRows.reduce((sum, row) => sum + (row.quantity || 0), 0)}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InventoryFilters;
