# Waste Tracker

Sistema inteligente de gestão de desperdício e custos, focado na otimização de insumos, sustentabilidade operacional e controle financeiro.

## 🚀 Sobre o Projeto
O **Waste Tracker** tem como objetivo auxiliar gestores de hospedagem e eventos a monitorarem o desperdício de recursos (água, energia, alimentos e resíduos), oferecendo dashboards analíticos, indicadores de sustentabilidade e um módulo robusto de controle de gastos.

---

## 🛠️ Tech Stack & Arquitetura

### **Front-end** (`/frontend`)
* **Framework:** Next.js (App Router) + TypeScript
* **Estilização:** Tailwind CSS
* **Arquitetura de UI:** Atomic Design
* **Gerenciamento de Estado:** TanStack Query & Zustand

### **Back-end** (`/backend`)
* **Linguagem:** Python
* **Framework:** FastAPI (assíncrono, alta performance e tipagem estática)
* **Validação de Dados:** Pydantic
* **Padrão Arquitetural:** **Arquitetura Hexagonal (Ports and Adapters)**

Para mais detalhes sobre as diretrizes técnicas e escolhas estruturais, consulte nossos registros na pasta `docs/adr/`.

## 📁 Estrutura do Repositório
* `frontend/` — Aplicação web cliente (Next.js).
* `backend/` — API e regras de negócio (Python / FastAPI).
* `docs/adr/` — Architecture Decision Records (Registros de Decisão Arquitetural).
* `docs/conventional-commits.md` — Guia de padronização de commits.

---

## 📋 Pré-requisitos e Instalação

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Python](https://www.python.org/) instalados em sua máquina.

1. Clone o repositório:
   ```bash
   git clone git@github.com:fumagallilaura/waste-tracker.git
   cd waste-tracker
   ```
### Rodando o Front-end:

- Instale as dependências:
    ```bash
    cd frontend
    npm install
    ```

- Execute o ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```

- Acesse http://localhost:3000 no seu navegador.

### Rodando o Back-end:

```bash
cd backend
python -m venv venv
# No Windows
source venv/Scripts/activate 
# | No Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

- Acesse a documentação interativa da API (Swagger) em http://localhost:8000/docs.