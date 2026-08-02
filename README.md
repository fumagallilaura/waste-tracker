# Waste Tracker

Sistema inteligente de gestão de desperdício e custos, focado na otimização de insumos, sustentabilidade operacional e controle financeiro.

## 🚀 Sobre o Projeto
O **Waste Tracker** tem como objetivo auxiliar gestores de hospedagem e eventos a monitorarem o desperdício de recursos (água, energia, alimentos e resíduos), oferecendo dashboards analíticos, indicadores de sustentabilidade e um módulo robusto de controle de gastos.

## 🛠️ Tech Stack & Arquitetura
O front-end da aplicação foi estruturado para garantir escalabilidade, performance e consistência visual baseada na identidade eco-corporativa do projeto.

* **Framework:** Next.js (App Router) + TypeScript
* **Estilização:** Tailwind CSS
* **Arquitetura de UI:** Atomic Design
* **Gerenciamento de Estado:** TanStack Query & Zustand

Para mais detalhes sobre as diretrizes técnicas e escolhas estruturais, consulte nossa [ADR 0001 - Arquitetura Frontend](./docs/adr/0001-frontend-architecture-nextjs-atomic-design.md).

## 📁 Estrutura de Documentação
* `docs/adr/` — Architecture Decision Records (Registros de Decisão Arquitetural).
* `docs/conventional-commits.md` — Guia de padronização de commits.

## 📋 Pré-requisitos e Instalação

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone o repositório:
   ```bash
   git clone git@github.com:fumagallilaura/waste-tracker.git
   cd waste-tracker
   ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute o ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```

4. Acesse http://localhost:3000 no seu navegador.