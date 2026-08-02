# Waste Tracker

Sistema inteligente de gestão de desperdício e custos, focado na otimização de insumos, sustentabilidade operacional e controle financeiro.

## Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Como Rodar com Docker](#como-rodar-com-docker)
- [Documentação](#documentação)

---

## Sobre o Projeto
O **Waste Tracker** é uma aplicação desenvolvida para o monitoramento e gestão eficiente de resíduos, contando com uma arquitetura moderna dividida entre API em Python (FastAPI) e interface web em Next.js.

---

## Tecnologias Utilizadas
* **Back-end:** Python, FastAPI, Uvicorn, Pydantic, PostgreSQL
* **Front-end:** Next.js, React, TypeScript, Tailwind CSS, Zustand, TanStack React Query
* **Infraestrutura:** Docker & Docker Compose

---

## Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## Como Rodar Localmente

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

---

## Como Rodar com Docker

Para subir toda a aplicação (Banco de Dados, Back-end e Front-end) de uma só vez utilizando o Docker Compose, siga os passos abaixo:

1. Clone o repositório e navegue até a raiz do projeto:
   ```bash
   git clone git@github.com:fumagallilaura/waste-tracker.git
   cd waste-tracker
   ```

2. Construa e inicie os containers em segundo plano:
  ```bash
  docker compose up --build -d
  ```

3. Com os serviços rodando, você pode acessar:

- Front-end: http://localhost:3000

- Documentação da API (Swagger): http://localhost:8000/docs

4. Para parar os containers, execute:
```bash
docker compose down
```

---

## Documentação

Todo o detalhamento técnico, registros de decisão e padrões do projeto estão centralizados na pasta [docs/](./docs). 

Acesse o [Índice da Documentação](./docs/README.md) para navegar por todos os guias e ADRs.