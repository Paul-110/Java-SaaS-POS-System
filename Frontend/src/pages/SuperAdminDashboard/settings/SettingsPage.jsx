import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Shield, Bell, Settings as SettingsIcon, Loader2 } from "lucide-react";
import ProfileSettingsForm from "./components/ProfileSettingsForm";
import SecuritySettingsForm from "./components/SecuritySettingsForm";
import NotificationSettingsForm from "./components/NotificationSettingsForm";
import SystemSettingsForm from "./components/SystemSettingsForm";
import { getUserProfile } from "../../../Redux Toolkit/features/user/userThunks";

// Configuration for the settings tabs
const settingsTabs = [
  { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" />, description: "Update your photo and personal details." },
  { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" />, description: "Change your password and manage security settings." },
  { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" />, description: "Manage how you receive notifications." },
  { id: 'system', name: 'System', icon: <SettingsIcon className="w-5 h-5" />, description: "Manage general system settings." },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => state.user);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !userProfile) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch, userProfile]);

  // Helper function to render the currently active form component
  const renderActiveComponent = () => {
    if (loading && !userProfile) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      );
    }

    switch (activeTab) {
      case 'profile':
        return <ProfileSettingsForm userProfile={userProfile} />;
      case 'security':
        return <SecuritySettingsForm />;
      case 'notifications':
        return <NotificationSettingsForm />;
      case 'system':
        return <SystemSettingsForm />;
      default:
        return null;
    }
  };

  const currentTab = settingsTabs.find(tab => tab.id === activeTab);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-gray-400">
          Manage your account, security, and system settings.
        </p>
      </div>

      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-0 lg:grid lg:grid-cols-12 lg:gap-0 overflow-hidden">
        {/* Left-side Navigation */}
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

        {/* Right-side Content */}
        <div className="lg:col-span-9">
          <div className="px-6 py-6 lg:px-8">
            {currentTab && (
              <div>
                <h3 className="text-lg font-medium leading-6 text-white">{currentTab.name} Settings</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {currentTab.description}
                </p>
                <div className="mt-6 border-t border-white/10 pt-6">
                  {renderActiveComponent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
