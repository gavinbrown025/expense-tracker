"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

import UIIcon from "./UIIcon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative flex items-center w-14 h-7 backdrop-blur-sm rounded-full shadow-lg border border-primary/50">
        <div className="bg-primary rounded-full h-[26px] aspect-square grid place-items-center">
          <UIIcon iconName="dark_mode" className="!text-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center w-14 h-7 backdrop-blur-sm rounded-full shadow-lg border border-primary/50">
      <label
        className={`absolute left-0 transition-all duration-300 swap swap-rotate bg-primary rounded-full h-[26px] aspect-square grid place-items-center ${
          theme === "dark" && "left-full -translate-x-full"
        }`}
      >
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          onClick={toggleTheme}
        />

        {/* sun icon */}
        <UIIcon iconName="sunny" className="swap-off !text-lg" />
        {/* moon icon */}
        <UIIcon iconName="dark_mode" className="swap-on !text-lg" />
      </label>
    </div>
  );
}
