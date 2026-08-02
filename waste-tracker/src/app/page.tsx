import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--accent-emerald)]">
              Waste Tracker
            </h1>
            <p className="text-[var(--text-muted)] mt-1">
              Sistema inteligente de gestão de desperdício e custos operacionais.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Ambiente Configurado 🚀</h2>
          <p className="text-[var(--text-muted)] text-sm">
            Tipografia limpa (Inter) aplicada e suporte completo a Light/Dark mode estruturado com variáveis de tema.
          </p>
        </section>
      </div>
    </main>
  );
}