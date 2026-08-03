# Waste Tracker - Front-end

Interface web moderna construída com **Next.js (App Router)**, **Tailwind CSS** e **Recharts**, projetada para o acompanhamento visual de custos, controle por períodos (meses) e comparação financeira.

## 🚀 Tecnologias
* Next.js (React)
* TypeScript
* Tailwind CSS
* Recharts (Gráficos interativos)
* Lucide React (Ícones)

## ✨ Funcionalidades
* **Cadastro por Data:** Escolha a data exata do lançamento (gasto ou ganho).
* **Filtro por Período:** Visualize os dados gerais ou selecione um mês específico.
* **Gráficos Dinâmicos:** Acompanhe a distribuição de despesas por categoria através de um gráfico de pizza atualizado conforme o filtro.
* **Comparação Mensal:** Acompanhe o comparativo percentual e de valor em relação ao mês anterior de forma automatizada.
* **Modo Escuro / Claro:** Suporte a alternância de temas.

## ⚙️ Como Executar

1. **Abra o terminal na pasta do front-end:**
   ```bash
   cd frontend
   ```
2. Instale as dependências:
```bash
npm install
```
3. Configure as Variáveis de Ambiente (Opcional):
Crie um arquivo .env.local na raiz do front-end caso precise alterar a porta da API:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```
4. Execute o ambiente de desenvolvimento:
```bash
npm run dev
```
A aplicação estará acessível em http://localhost:3000