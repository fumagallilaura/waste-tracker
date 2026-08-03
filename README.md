# Waste Tracker

Sistema inteligente de gestão de desperdício e custos, focado na otimização de insumos, sustentabilidade operacional e controle financeiro.

## Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Como Rodar com Docker](#como-rodar-com-docker)
- [Como Rodar os Testes](#como-rodar-os-testes)
- [Análise de Qualidade (SonarQube)](#análise-de-qualidade-sonarqube)
- [Documentação](#documentação)
- [Troubleshooting](#troubleshooting)

---

## Sobre o Projeto
O **Waste Tracker** é uma aplicação desenvolvida para o monitoramento e gestão eficiente de resíduos, contando com uma arquitetura moderna dividida entre API em Python (FastAPI) e interface web em Next.js.

---

## Tecnologias Utilizadas
* **Back-end:** Python, FastAPI, Uvicorn, Pydantic, PostgreSQL
* **Front-end:** Next.js, React, TypeScript, Tailwind CSS, Zustand, TanStack React Query
* **Infraestrutura:** Docker & Docker Compose
* **Qualidade de Código & Testes:** SonarQube, Pytest, Pytest-cov

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

> Observação: é importante ter um banco de dados rodando. Pode usar o docker se quiser com o comando `docker compose up db -d`. Caso contrario, pode colocar uma connection string na variável de ambiente `DATABASE_URL`

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

## Como Rodar os Testes

Os testes do back-end utilizam pytest com banco SQLite em memória (:memory:). Para executá-los:

1. Certifique-se de estar com o ambiente virtual ativado na pasta backend:
```bash
cd backend
source venv/Scripts/activate  # ou venv/bin/activate no Linux/macOS
```
2. Execute o pytest:
```bash
pytest
```

---

## Análise de Qualidade (SonarQube)

Este projeto utiliza o **SonarQube** para análise estática de código e métricas de qualidade, dividindo os relatórios em dois projetos independentes no painel: **Backend** e **Frontend**.

### Pré-requisitos
* [Docker](https://www.docker.com/) e Docker Compose instalados e rodando.
* Python (para execução dos testes e cobertura do backend).

### Como executar a análise

O repositório possui um script automatizado (`analisar.sh`) que sobe o SonarQube, gera o relatório de cobertura de testes do backend e envia as análises separadas de ambas as camadas.

1. Abra o seu terminal (Bash / WSL).
2. Execute o script de análise:
   ```bash
   bash analisar.sh
   ```
3. O script irá:

- Subir os containers do SonarQube e do Banco de Dados.

- Aguardar o serviço ficar pronto.

- Gerar o relatório de cobertura do backend (coverage.xml).

- Executar os scanners de forma isolada para o Backend (waste-tracker-backend) e para o Frontend (waste-tracker-frontend).

### Acessando os Resultados
Após a conclusão do script, acesse o painel web em:

URL: http://localhost:9000

Credenciais padrão (primeiro acesso): admin / S&nh@!123456 (o SonarQube solicitará a alteração da senha no primeiro login).

> Observação: Caso necessário, no primeiro acesso, utilize as credenciais padrão: admin / admin (o sistema pedirá a redefinição da senha) e troque pela senha do script, que é `S&nh@!123456`

---

## Documentação

Todo o detalhamento técnico, registros de decisão e padrões do projeto estão centralizados na pasta [docs/](./docs). 

Acesse o [Índice da Documentação](./docs/README.md) para navegar por todos os guias e ADRs.

---

## Troubleshooting (Resolução de Problemas)

### 1. Erro quando fizer alterações no Docker

- Causa: A pasta gerada localmente no host possui binários incompatíveis com o ambiente Linux do container.

- Solução: Certifique-se de fazer as modificações necessárias e rode:

```bash
docker compose build --no-cache && docker compose up
```

### 2. Mudança de dependencias no backend
```bash
pip freeze > requirements.txt
```
