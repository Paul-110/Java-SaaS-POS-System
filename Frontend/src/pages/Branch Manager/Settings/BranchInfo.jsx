import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateBranch } from "../../../Redux Toolkit/features/branch/branchThunks";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { Clock } from "lucide-react";
import { Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Checkbox } from "../../../components/ui/checkbox";

const BranchInfo = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);
  const [branchInfo, setBranchInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    workingDays: [],
  });

  useEffect(() => {
    if (branch) {
      setBranchInfo({
        name: branch.name || "",
        address: branch.address || "",
        phone: branch.phone || "",
        email: branch.email || "",
        openingTime: branch.openingTime || "",
        closingTime: branch.closingTime || "",
        workingDays: branch.workingDays || [],
      });
    }
  }, [branch]);
  const handleBranchInfoChange = (field, value) => {
    setBranchInfo({
      ...branchInfo,
      [field]: value,
    });
  };

  const handleSaveSettings = (settingType) => {
    // In a real app, this would make an API call to save the settings
    console.log(`Saving ${settingType} settings`);
    if (settingType === "branch-info") {
      dispatch(
        updateBranch({
          id: branch.id,
          dto: branchInfo,
          jwt: localStorage.getItem("jwt"),
        })
      );
      console.log("Saving branch info:", branchInfo);
    }
  };
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-white">Branch Information</CardTitle>
        <CardDescription className="text-gray-400">
          Update your branch details and business hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="branch-name" className="text-sm font-medium text-gray-300">
                Branch Name
              </label>
              <Input
                id="branch-name"
                className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                value={branchInfo.name}
                onChange={(e) => handleBranchInfoChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="branch-address" className="text-sm font-medium text-gray-300">
                Address
              </label>
              <Input
                id="branch-address"
                className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                value={branchInfo.address}
                onChange={(e) =>
                  handleBranchInfoChange("address", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="branch-phone" className="text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="branch-phone"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                  value={branchInfo.phone}
                  onChange={(e) =>
                    handleBranchInfoChange("phone", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="branch-email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="branch-email"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                  type="email"
                  value={branchInfo.email}
                  onChange={(e) =>
                    handleBranchInfoChange("email", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10"/>

        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-200">Business Hours</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="opening-time" className="text-sm font-medium text-gray-300">
                Opening Time
              </label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="opening-time"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                  type="time"
                  value={branchInfo.openingTime}
                  onChange={(e) =>
                    handleBranchInfoChange("openingTime", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="closing-time" className="text-sm font-medium text-gray-300">
                Closing Time
              </label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="closing-time"
                  className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40"
                  type="time"
                  value={branchInfo.closingTime}
                  onChange={(e) =>
                    handleBranchInfoChange("closingTime", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-300">Working Days</label>
            <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    checked={branchInfo.workingDays.includes(day)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleBranchInfoChange("workingDays", [
                          ...branchInfo.workingDays,
                          day,
                        ]);
                      } else {
                        handleBranchInfoChange(
                          "workingDays",
                          branchInfo.workingDays.filter((d) => d !== day)
                        );
                      }
                    }}
                  />
               
                  <label
                    htmlFor={`day-${day}`}
                    className="text-sm text-gray-300"
                  >
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => handleSaveSettings("branch-info")}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BranchInfo;
