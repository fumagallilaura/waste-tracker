"use client";

import React, { useState } from "react";
import { FolderPlus, Layers } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  categories: Category[];
  onSubmitCategory: (data: { name: string; parentId: string | null }) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  categories,
  onSubmitCategory,
}) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmitCategory({ name, parentId });
    setName("");
    setParentId(null);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4 transition-colors duration-300"
    >
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-main)] flex items-center gap-2">
          <FolderPlus size={20} className="text-[var(--accent-emerald)]" />
          Nova Categoria
        </h2>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Crie categorias principais ou subcategorias (hierarquia flexível).
        </p>
      </div>

      {successMessage && (
        <div className="p-3 text-xs font-medium bg-emerald-500/10 text-[var(--accent-emerald)] rounded-xl border border-emerald-500/20">
          Categoria criada com sucesso!
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--text-muted)]">
          Nome da Categoria
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Hortifruti, Utensílios..."
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
          <Layers size={14} /> Categoria Pai (Opcional - Subcategoria)
        </label>
        <select
          value={parentId || ""}
          onChange={(e) => setParentId(e.target.value ? e.target.value : null)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] transition-all cursor-pointer"
        >
          <option value="" className="bg-[var(--bg-surface)] text-[var(--text-main)]">
            Nenhuma (Categoria Principal / Raiz)
          </option>
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
        Salvar Categoria
      </button>
    </form>
  );
};