"use client";

import { useEffect, useState, useMemo } from "react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { PlusCircle, TrendingUp, AlertTriangle, Trash2, Tag, Loader2, PieChart as PieIcon, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Category {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category_id: string | null;
  type?: "expense" | "income"; // Tipo opcional para diferenciar gasto ou ganho
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense"); // Padrão é Gasto
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resExp, resCat] = await Promise.all([
        fetch(`${API_URL}/expenses/`),
        fetch(`${API_URL}/categories/`)
      ]);
      
      if (resExp.ok) {
        const data = await resExp.json();
        // Garante que o amount venha positivo do banco para fins de cálculo de categoria
        setExpenses(data);
      }
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

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    const numericAmount = Math.abs(parseFloat(amount)); // Garante que nunca seja negativo
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Informe um valor válido maior que zero.");
      return;
    }

    // Se for ganho, podemos salvar com valor negativo no banco ou tratar o sinal
    const finalAmount = transactionType === "income" ? -numericAmount : numericAmount;

    try {
      const response = await fetch(`${API_URL}/expenses/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: `[${transactionType === "income" ? "Ganho" : "Gasto"}] ${description}`,
          amount: finalAmount,
          category_id: categoryId ? categoryId : null,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar lançamento");

      setDescription("");
      setAmount("");
      setCategoryId("");
      setTransactionType("expense");
      await fetchData();
    } catch (err) {
      alert("Erro ao registrar lançamento.");
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await fetch(`${API_URL}/expenses/${id}`, { method: "DELETE" });
      await fetchData();
    } catch (err) {
      alert("Erro ao excluir lançamento.");
    }
  };

  // Custo total considera gastos positivos menos ganhos
  const totalCost = expenses.reduce((acc, item) => acc + item.amount, 0);

  // Dados para o gráfico considerando apenas os valores absolutos dos gastos para exibir a proporção correta por categoria
  const chartData = useMemo(() => {
    const categoryMap: { [key: string]: { name: string; value: number } } = {};

    expenses.forEach((exp) => {
      const positiveValue = Math.abs(exp.amount);
      const cat = categories.find((c) => c.id === exp.category_id);
      const catName = cat ? cat.name : "Sem Categoria";

      if (!categoryMap[catName]) {
        categoryMap[catName] = { name: catName, value: 0 };
      }
      categoryMap[catName].value += positiveValue;
    });

    return Object.values(categoryMap);
  }, [expenses, categories]);

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
            <span className="text-xs font-medium text-[var(--text-muted)]">Balanço / Custo Total</span>
            <TrendingUp size={18} className="text-[var(--accent-emerald)]" />
          </div>
          <p className={`text-2xl font-bold ${totalCost < 0 ? "text-blue-400" : "text-[var(--text-main)]"}`}>
            R$ {totalCost.toFixed(2)}
          </p>
        </div>
      </section>

      {/* Gráfico de Pizza por Categoria */}
      {expenses.length > 0 && chartData.reduce((sum, i) => sum + i.value, 0) > 0 && (
        <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-main)]">
            <PieIcon size={16} className="text-[var(--accent-emerald)]" />
            Distribuição por Categoria (%)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    borderRadius: "0.75rem",
                    color: "var(--text-main)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Formulário para Adicionar Gasto / Ganho */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-main)]">Novo Lançamento</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Escolha se deseja adicionar um gasto ou um ganho.
          </p>
        </div>

        <form onSubmit={handleCreateExpense} className="space-y-3">
          {/* Seletor de Tipo (Gasto vs Ganho) */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTransactionType("expense")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                transactionType === "expense"
                  ? "bg-red-500/10 border-red-500 text-red-500"
                  : "border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--bg-primary)]"
              }`}
            >
              <ArrowDownCircle size={16} /> Gasto (Padrão)
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("income")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                transactionType === "income"
                  ? "bg-blue-500/10 border-blue-500 text-blue-400"
                  : "border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--bg-primary)]"
              }`}
            >
              <ArrowUpCircle size={16} /> Ganho / Receita
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Descrição (ex: Compra de insumos)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]"
            />
            <input
              type="number"
              step="0.01"
              min="0.01"
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
            {transactionType === "expense" ? "Registrar Gasto" : "Registrar Ganho"}
          </button>
        </form>
      </section>

      {/* Lista de Lançamentos */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-main)]">Lançamentos Recentes</h2>

        {loading && (
          <div className="flex justify-center py-6 text-[var(--text-muted)]">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {!loading && expenses.length === 0 && (
          <p className="text-xs text-[var(--text-muted)]">Nenhum lançamento registrado até o momento.</p>
        )}

        <div className="space-y-2">
          {!loading && expenses.map((exp) => {
            const cat = categories.find((c) => c.id === exp.category_id);
            const isIncome = exp.amount < 0;
            return (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-medium text-[var(--text-main)] block">{exp.description}</span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className={`font-semibold ${isIncome ? "text-blue-400" : "text-red-400"}`}>
                      {isIncome ? `- R$ ${Math.abs(exp.amount).toFixed(2)}` : `R$ ${exp.amount.toFixed(2)}`}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> {cat ? cat.name : "Sem Categoria"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteExpense(exp.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Excluir lançamento"
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