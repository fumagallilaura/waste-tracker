"use client";

import Link from "next/link";
import { LayoutDashboard, PlusCircle, BarChart3, Settings, FolderTree } from "lucide-react";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início", icon: LayoutDashboard },
    // { href: "/novo", label: "Lançar", icon: PlusCircle },
    { href: "/categorias", label: "Categorias", icon: FolderTree },
    // { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
    { href: "/ajustes", label: "Ajustes", icon: Settings },
  ];

  return (
    <nav 
      aria-label="Navegação principal" 
      className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:left-0 md:right-0 bg-[var(--bg-surface)] border-t md:border-t-0 md:border-b border-[var(--border-color)] px-4 py-2 md:py-3 flex justify-around md:justify-center md:gap-8 items-center z-50 shadow-lg transition-colors duration-300"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 rounded-xl transition-colors ${
              isActive
                ? "text-[var(--accent-emerald)] font-semibold"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] md:text-xs tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};