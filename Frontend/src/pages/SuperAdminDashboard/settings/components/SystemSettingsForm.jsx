import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Switch } from "../../../../components/ui/switch";
import { Loader2 } from "lucide-react";
import { useSettingsState } from "./useSettingsState";

export default function SystemSettingsForm() {
  const [system, setSystem] = useSettingsState({
    maintenanceMode: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Saving system settings:", system);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-lg">
      <div className="space-y-4 rounded-lg border border-white/10 p-4 bg-black/10">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
            <span className="font-medium text-white">Maintenance Mode</span>
            <p className="text-xs font-normal text-gray-400">
              Temporarily disable access for non-admin users for system updates.
            </p>
          </Label>
          <Switch
            id="maintenance-mode"
            checked={system.maintenanceMode}
            onCheckedChange={(checked) => setSystem("maintenanceMode", checked)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="w-48 bg-emerald-600 hover:bg-emerald-500">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save System Settings"}
        </Button>
      </div>
    </form>
  );
}
