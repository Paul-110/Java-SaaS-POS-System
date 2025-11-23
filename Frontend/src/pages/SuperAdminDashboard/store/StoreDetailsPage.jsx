import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function StoreDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)} // Go back to the previous page
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stores
        </Button>
      </div>

      <div className="pb-4 border-b border-border">
        <h2 className="text-3xl font-bold tracking-tight">Store Details</h2>
        <p className="text-muted-foreground">
          Detailed view of store information and statistics
        </p>
      </div>

      <div className="glass-panel p-6">
        <p className="text-muted-foreground">This page will show detailed store information, statistics, and management options.</p>
      </div>
    </div>
  );
} 