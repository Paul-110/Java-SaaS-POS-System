import { useState } from "react";

export function useSettingsState(initialState) {
  const [settings, setSettings] = useState(initialState);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return [settings, handleChange];
}