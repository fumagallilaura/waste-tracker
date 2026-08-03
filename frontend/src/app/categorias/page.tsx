"use client";

import { useState } from "react";
import { CategoryForm } from "@/components/molecules/CategoryForm";
import { Layers, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Alimentos", parentId: null },
    { id: "2", name: "Hortifruti", parentId: "1" },
  ]);

  const handleCreateCategory = (data: { name: string; parentId: string | null }) => {
    const newCategory: Category = {
      id: String(Date.now()),
      name: data.name,
      parentId: data.parentId,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto transition-colors duration-300">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--accent-emerald)]">
          Gestão de Categorias
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Organize seus insumos e custos com suporte a estruturas aninhadas.
        </p>
      </header>

      {/* Formulário para adicionar nova categoria */}
      <CategoryForm categories={categories} onSubmitCategory={handleCreateCategory} />

      {/* Listagem para visualização da árvore/hierarquia */}
      <section className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-3">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-main)]">
          <Layers size={16} className="text-[var(--accent-emerald)]" />
          Categorias Cadastradas
        </h2>
        <div className="space-y-2">
          {categories.map((cat) => {
            const parent = categories.find((c) => c.id === cat.parentId);
            return (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[var(--text-muted)]" />
                  <span className="font-medium text-[var(--text-main)]">{cat.name}</span>
                </div>
                {parent ? (
                  <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] font-medium">
                    Sub de: {parent.name}
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-md bg-[var(--text-muted)]/10 text-[var(--text-muted)] font-medium">
                    Principal
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}