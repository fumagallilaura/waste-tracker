"use client";

import { useEffect, useState } from "react";
import { CategoryForm } from "@/components/molecules/CategoryForm";
import { Layers, Tag, Loader2, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories/`);
      if (!response.ok) throw new Error("Erro ao carregar categorias do servidor.");
      const data = await response.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data: { name: string; parentId: string | null }) => {
    try {
      const response = await fetch(`${API_URL}/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          parent_id: data.parentId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar categoria.");
      await fetchCategories();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar categoria.");
    }
  };

  // Função para excluir categoria
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir categoria.");
      await fetchCategories();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir categoria.");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto transition-colors duration-300">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--accent-emerald)]">
          Gestão de Categorias
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Organize seus insumos e custos integrados com o back-end.
        </p>
      </header>

      <CategoryForm categories={categories} onSubmitCategory={handleCreateCategory} />

      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-main)]">
          <Layers size={16} className="text-[var(--accent-emerald)]" />
          Categorias Cadastradas no Banco
        </h2>

        {loading && (
          <div className="flex justify-center py-6 text-[var(--text-muted)]">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 bg-red-500/10 p-3 rounded-xl">
            {error} (Verifique se o back-end FastAPI está rodando na porta 8000).
          </p>
        )}

        {!loading && !error && categories.length === 0 && (
          <p className="text-xs text-[var(--text-muted)]">Nenhuma categoria encontrada.</p>
        )}

        <div className="space-y-2">
          {!loading && categories.map((cat) => {
            const parent = categories.find((c) => c.id === cat.parent_id);
            return (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[var(--text-muted)]" />
                  <span className="font-medium text-[var(--text-main)]">{cat.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  {parent ? (
                    <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] font-medium">
                      Sub de: {parent.name}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-md bg-[var(--text-muted)]/10 text-[var(--text-muted)] font-medium">
                      Principal
                    </span>
                  )}

                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Excluir categoria"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}