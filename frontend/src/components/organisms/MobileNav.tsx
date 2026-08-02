"use client";

import Link from "next/link";
import { LayoutDashboard, PlusCircle, BarChart3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início", icon: LayoutDashboard },
    { href: "/novo", label: "Lançar", icon: PlusCircle },
    { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
    { href: "/ajustes", label: "Ajustes", icon: Settings },
  ];

  return (
    <nav aria-label="Navegação principal" className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-surface)] border-t border-[var(--border-color)] px-4 py-2 flex justify-around items-center z-50 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              isActive
                ? "text-[var(--accent-emerald)] font-semibold"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};