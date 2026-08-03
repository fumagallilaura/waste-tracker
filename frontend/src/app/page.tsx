"use client";

import { useEffect, useState, useMemo } from "react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { PlusCircle, TrendingUp, AlertTriangle, Trash2, Tag, Loader2, PieChart as PieIcon, ArrowDownCircle, ArrowUpCircle, Calendar, BarChart2 } from "lucide-react";
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
  created_z: string;
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Campos do formulário
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [expenseDate, setExpenseDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // Filtros de período
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  // 1. FUNÇÃO DECLARADA ANTES DE QUALQUER USEMEMO
  const getExpenseDate = (exp: Expense) => {
    const match = exp.description.match(/^\[(\d{4}-\d{2}-\d{2})\]/);
    if (match) return match[1];
    if (exp.created_z) return exp.created_z.substring(0, 10);
    return new Date().toISOString().split("T")[0];
  };

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

  // Lista de meses disponíveis nos registros para o filtro
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    expenses.forEach((exp) => {
      const dateStr = getExpenseDate(exp);
      if (dateStr && dateStr.length >= 7) {
        const yearMonth = dateStr.substring(0, 7);
        monthsSet.add(yearMonth);
      }
    });
    return Array.from(monthsSet).sort().reverse();
  }, [expenses]);

  // Filtrar lançamentos com base no mês selecionado
  const filteredExpenses = useMemo(() => {
    if (selectedMonth === "all") return expenses;
    return expenses.filter((exp) => {
      const expDate = getExpenseDate(exp);
      return expDate.startsWith(selectedMonth);
    });
  }, [expenses, selectedMonth]);

  // Lançamentos do mês anterior para comparação
  const comparisonData = useMemo(() => {
    if (selectedMonth === "all") return null;

    const [year, month] = selectedMonth.split("-").map(Number);
    const prevDate = new Date(year, month - 2, 1);
    const prevYearMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const currentTotal = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);
    
    const prevExpenses = expenses.filter((exp) => {
      const expDate = getExpenseDate(exp);
      return expDate.startsWith(prevYearMonth);
    });
    const prevTotal = prevExpenses.reduce((acc, item) => acc + item.amount, 0);

    const diff = currentTotal - prevTotal;
    const percentDiff = prevTotal !== 0 ? (diff / Math.abs(prevTotal)) * 100 : 0;

    return {
      prevMonthName: prevDate.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
      prevTotal,
      diff,
      percentDiff,
    };
  }, [selectedMonth, expenses, filteredExpenses]);

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    const numericAmount = Math.abs(parseFloat(amount));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Informe um valor válido maior que zero.");
      return;
    }

    const finalAmount = transactionType === "income" ? -numericAmount : numericAmount;
    const formattedDescription = `[${expenseDate}] [${transactionType === "income" ? "Ganho" : "Gasto"}] ${description}`;

    try {
      const response = await fetch(`${API_URL}/expenses/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: formattedDescription,
          amount: finalAmount,
          category_id: categoryId ? categoryId : null,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar lançamento");

      setDescription("");
      setAmount("");
      setCategoryId("");
      setTransactionType("expense");
      setExpenseDate(new Date().toISOString().split("T")[0]);
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

  const totalCost = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);

  const chartData = useMemo(() => {
    const categoryMap: { [key: string]: { name: string; value: number } } = {};

    filteredExpenses.forEach((exp) => {
      const positiveValue = Math.abs(exp.amount);
      const cat = categories.find((c) => c.id === exp.category_id);
      const catName = cat ? cat.name : "Sem Categoria";

      if (!categoryMap[catName]) {
        categoryMap[catName] = { name: catName, value: 0 };
      }
      categoryMap[catName].value += positiveValue;
    });

    return Object.values(categoryMap);
  }, [filteredExpenses, categories]);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--accent-emerald)]">
            Waste Tracker
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Gestão inteligente de insumos e custos por período.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Filtro de Mês */}
      <section className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]">
          <Calendar size={18} className="text-[var(--accent-emerald)]" />
          <span>Filtrar por Período / Mês:</span>
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] cursor-pointer w-full md:w-64"
        >
          <option value="all">Todos os Meses (Geral)</option>
          {availableMonths.map((ym) => {
            const [y, m] = ym.split("-");
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, 1);
            const formattedLabel = dateObj.toLocaleString("pt-BR", { month: "long", year: "numeric" });
            return (
              <option key={ym} value={ym}>
                {formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1)}
              </option>
            );
          })}
        </select>
      </section>

      {/* Indicadores & Comparação */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Registros no Período</span>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold">{filteredExpenses.length} lançamentos</p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Balanço / Custo do Período</span>
            <TrendingUp size={18} className="text-[var(--accent-emerald)]" />
          </div>
          <p className={`text-2xl font-bold ${totalCost < 0 ? "text-blue-400" : "text-[var(--text-main)]"}`}>
            R$ {totalCost.toFixed(2)}
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Comparação Mensal</span>
            <BarChart2 size={18} className="text-[var(--accent-emerald)]" />
          </div>
          {comparisonData ? (
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)]">
                vs {comparisonData.prevMonthName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-bold ${comparisonData.diff <= 0 ? "text-[var(--accent-emerald)]" : "text-red-400"}`}>
                  {comparisonData.diff <= 0 ? `▼ R$ ${Math.abs(comparisonData.diff).toFixed(2)}` : `▲ R$ ${comparisonData.diff.toFixed(2)}`}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  ({comparisonData.percentDiff.toFixed(1)}%)
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--text-muted)] mt-2">Selecione um mês específico para comparar.</p>
          )}
        </div>
      </section>

      {/* Gráfico de Pizza por Categoria */}
      {filteredExpenses.length > 0 && chartData.reduce((sum, i) => sum + i.value, 0) > 0 && (
        <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-main)]">
            <PieIcon size={16} className="text-[var(--accent-emerald)]" />
            Distribuição por Categoria no Período (%)
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

      {/* Formulário para Adicionar Lançamento com Data */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-main)]">Novo Lançamento</h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Informe os dados, valor, categoria e a data correspondente do gasto ou ganho.
          </p>
        </div>

        <form onSubmit={handleCreateExpense} className="space-y-3">
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
                  ? "bg-[var(--accent-emerald)]/10 border-[var(--accent-emerald)] text-[var(--accent-emerald)]"
                  : "border-[var(--border-color)] text-[var(--text-muted)] bg-[var(--bg-primary)]"
              }`}
            >
              <ArrowUpCircle size={16} /> Ganho / Receita
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Descrição (ex: Insumos)"
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
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              required
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer ${
              transactionType === "income" ? "bg-[var(--accent-emerald)]" : "bg-red-500"
            }`}
          >
            <PlusCircle size={20} />
            {transactionType === "expense" ? "Registrar Gasto" : "Registrar Ganho"}
          </button>
        </form>
      </section>

      {/* Lista de Lançamentos Filtrados */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-[var(--text-main)]">Lançamentos do Período</h2>

        {loading && (
          <div className="flex justify-center py-6 text-[var(--text-muted)]">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {!loading && filteredExpenses.length === 0 && (
          <p className="text-xs text-[var(--text-muted)]">Nenhum lançamento encontrado para este período.</p>
        )}

        <div className="space-y-2">
          {!loading && filteredExpenses.map((exp) => {
            const cat = categories.find((c) => c.id === exp.category_id);
            const isIncome = exp.amount < 0;
            const formattedDate = getExpenseDate(exp).split("-").reverse().join("/");
            return (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--text-main)]">{exp.description}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--border-color)] text-[var(--text-muted)]">
                      {formattedDate}
                    </span>
                  </div>
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