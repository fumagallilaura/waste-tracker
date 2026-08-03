"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { PlusCircle, TrendingUp, AlertTriangle, Trash2, Tag, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category_id: string | null;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  // Carregar dados da API
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resExp, resCat] = await Promise.all([
        fetch(`${API_URL}/expenses/`),
        fetch(`${API_URL}/categories/`)
      ]);
      
      if (resExp.ok) setExpenses(await resExp.json());
      if (resCat.ok) setCategories(await resCat.json());
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Salvar novo gasto
  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    try {
      const response = await fetch(`${API_URL}/expenses/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          category_id: categoryId ? categoryId : null,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar gasto");

      setDescription("");
      setAmount("");
      setCategoryId("");
      await fetchData();
    } catch (err) {
      alert("Erro ao registrar gasto.");
    }
  };

  // Excluir gasto
  const handleDeleteExpense = async (id: string) => {
    try {
      await fetch(`${API_URL}/expenses/${id}`, { method: "DELETE" });
      await fetchData();
    } catch (err) {
      alert("Erro ao excluir gasto.");
    }
  };

  const totalCost = expenses.reduce((acc, item) => acc + item.amount, 0);

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

      {/* Indicadores */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Total de Registros</span>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold">{expenses.length} lançamentos</p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Custo Total Estimado</span>
            <TrendingUp size={18} className="text-[var(--accent-emerald)]" />
          </div>
          <p className="text-2xl font-bold">R$ {totalCost.toFixed(2)}</p>
        </div>
      </section>

      {/* Formulário para Adicionar Gasto */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-main)]">Novo Lançamento de Gasto</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Registre o desperdício ou custo informando a descrição, valor e categoria opcional.
          </p>
        </div>

        <form onSubmit={handleCreateExpense} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Descrição (ex: Desperdício de Hortifruti)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] cursor-pointer"
            >
              <option value="">Sem Categoria (Nulo)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[var(--bg-surface)] text-[var(--text-main)]">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[var(--accent-emerald)] text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            <PlusCircle size={20} />
            Registrar Gasto
          </button>
        </form>
      </section>

      {/* Lista de Gastos Registrados */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-main)]">Gastos e Resíduos Recentes</h2>

        {loading && (
          <div className="flex justify-center py-6 text-[var(--text-muted)]">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {!loading && expenses.length === 0 && (
          <p className="text-xs text-[var(--text-muted)]">Nenhum gasto registrado até o momento.</p>
        )}

        <div className="space-y-2">
          {!loading && expenses.map((exp) => {
            const cat = categories.find((c) => c.id === exp.category_id);
            return (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-medium text-[var(--text-main)] block">{exp.description}</span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--accent-emerald)]">R$ {exp.amount.toFixed(2)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> {cat ? cat.name : "Sem Categoria"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteExpense(exp.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Excluir gasto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}