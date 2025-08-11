"use client";

import { useTheme } from "@/contexts/ThemeContext";
import UIIcon from "./UIIcon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="toggle text-base-content">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      {/* sun icon */}
      <UIIcon iconName="sunny" className="!text-sm" />
      {/* moon icon */}
      <UIIcon iconName="dark_mode" className="!text-sm" />
    </label>
  );
}