import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Loader2 } from "lucide-react";
import { useSettingsState } from "./useSettingsState";

export default function SecuritySettingsForm() {
  const [passwords, setPasswords] = useSettingsState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Saving security settings:", passwords);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords("currentPassword", e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
        <Input
          id="new-password"
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords("newPassword", e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords("confirmPassword", e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-500"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="w-36 bg-emerald-600 hover:bg-emerald-500">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
