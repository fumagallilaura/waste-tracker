"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:opacity-80 transition-all cursor-pointer flex items-center justify-center shadow-sm"
      aria-label="Alternar tema"
    >
      {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
    </button>
  );
};