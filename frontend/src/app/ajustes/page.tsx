"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Settings, Monitor } from "lucide-react";

export default function AjustesPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--accent-emerald)] flex items-center gap-2">
          <Settings size={24} />
          Ajustes do Sistema
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Gerencie as preferências da aplicação e a interface visual.
        </p>
      </header>

      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
          <Monitor size={18} className="text-[var(--accent-emerald)]" />
          Aparência e Tema
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          Alterne entre o modo claro e escuro para melhor visualização no ambiente de trabalho.
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Sun size={20} className="text-amber-400" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
            <div>
              <p className="text-sm font-medium text-[var(--text-main)]">
                {isDark ? "Modo Escuro Ativo" : "Modo Claro Ativo"}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {isDark ? "Interface otimizada para ambientes com pouca luz." : "Interface clara ideal para ambientes iluminados."}
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-[var(--accent-emerald)] text-white text-xs font-medium shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            Alternar para {isDark ? "Claro" : "Escuro"}
          </button>
        </div>
      </section>
    </div>
  );
}