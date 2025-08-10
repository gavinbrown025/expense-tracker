"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeValues = {
  dark: "forest",
  light: "emerald",
} as const;

type ThemeKey = keyof typeof ThemeValues; // "dark" | "light"
type ThemeValue = (typeof ThemeValues)[ThemeKey]; // "forest" | "emerald"

interface ThemeContextType {
  theme: ThemeKey;
  themeValue: ThemeValue;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedThemeValue = localStorage.getItem("theme") as ThemeValue;
    if (
      savedThemeValue === ThemeValues.dark ||
      savedThemeValue === ThemeValues.light
    ) {
      setTheme(savedThemeValue === ThemeValues.dark ? "dark" : "light");
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", ThemeValues[theme]);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    document.documentElement.setAttribute("data-theme", ThemeValues[theme]);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeValue: ThemeValues[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
