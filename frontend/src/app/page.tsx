import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { PlusCircle, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--accent-emerald)]">
            Waste Tracker
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Gestão inteligente de insumos e custos.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Desperdício Hoje</span>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold">4.2 kg</p>
          <span className="text-xs text-emerald-600 font-medium">↓ 12% vs. ontem</span>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Custo Estimado</span>
            <TrendingUp size={18} className="text-[var(--accent-emerald)]" />
          </div>
          <p className="text-2xl font-bold">R$ 180,00</p>
          <span className="text-xs text-[var(--text-muted)]">Meta diária: R$ 250</span>
        </div>
      </section>

      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">Ação Operacional</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Registre o desperdício de alimentos ou recursos diretamente da cozinha.
          </p>
        </div>
        <Link
          href="/novo"
          className="w-full py-3.5 px-4 bg-[var(--accent-emerald)] text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <PlusCircle size={20} />
          Novo Lançamento de Resíduo
        </Link>
      </section>
    </div>
  );
}