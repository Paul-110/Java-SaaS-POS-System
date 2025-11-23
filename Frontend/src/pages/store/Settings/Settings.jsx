import React, { useState } from "react";
import { User, Store, Shield, Bell } from "lucide-react";
import StoreInformation from "../storeInformation/StoreInformation";

// Placeholder for other settings components
const ProfileSettings = () => <div className="text-gray-400">Profile settings will be available here.</div>;
const SecuritySettings = () => <div className="text-gray-400">Security settings will be available here.</div>;
const NotificationsSettings = () => <div className="text-gray-400">Notifications settings will be available here.</div>;

const settingsTabs = [
  { id: 'store', name: 'Store Details', icon: <Store className="w-5 h-5" />, component: <StoreInformation /> },
  { id: 'profile', name: 'My Profile', icon: <User className="w-5 h-5" />, component: <ProfileSettings /> },
  { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" />, component: <SecuritySettings /> },
  { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" />, component: <NotificationsSettings /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');

  const ActiveComponent = settingsTabs.find(tab => tab.id === activeTab)?.component || null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-gray-400">
          Manage your store, profile, and account settings.
        </p>
      </div>

      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-0 lg:grid lg:grid-cols-12 lg:gap-0 overflow-hidden">
        <aside className="px-4 py-6 lg:col-span-3 lg:border-r lg:border-white/10">
          <nav className="space-y-1">
            {settingsTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {React.cloneElement(tab.icon, { className: `mr-3 h-5 w-5 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}` })}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9 p-6 lg:p-8">
          {ActiveComponent}
        </div>
      </div>
    </div>
  );
};

export default Settings;
