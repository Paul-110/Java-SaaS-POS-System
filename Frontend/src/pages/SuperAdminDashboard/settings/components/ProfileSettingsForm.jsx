import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { User, Loader2 } from "lucide-react";

export default function ProfileSettingsForm({ userProfile }) {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.fullName || "Super Admin",
        email: userProfile.email || "admin@pospro.com",
      });
    }
  }, [userProfile]);

  const handleChange = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Saving profile settings:", profile);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 ring-2 ring-emerald-500/20">
          <User className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">Change Avatar</Button>
          <p className="text-xs text-gray-400">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="profile-name" className="text-gray-300">Full Name</Label>
          <Input
            id="profile-name"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email" className="text-gray-300">Email Address</Label>
          <Input
            id="profile-email"
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="w-32 bg-emerald-600 hover:bg-emerald-500">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
