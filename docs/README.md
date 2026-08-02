# 📂 Central de Documentação - Waste Tracker

Bem-vindo à central de documentação do projeto Waste Tracker. Abaixo você encontra o sumário com todos os guias, padrões e registros arquiteturais disponíveis.

---

### 📝 Templates e Padrões
* [Guia de Criação de Nova ADR (Template)](./template.md)

---

## 🏗️ Decisões de Arquitetura (ADRs)
Os Architecture Decision Records documentam escolhas técnicas cruciais feitas ao longo do desenvolvimento do projeto.

* [ADR 001: Arquitetura Frontend com Next.js e Atomic Design](./adr/0001-frontend-architecture-nextjs-atomic-design.md)
* [ADR 002: Adoção de Arquitetura RESTful e Contratos de API](./adr/0002-api-restful-contracts.md) 
* [ADR 0003: Adoção de Arquitetura Hexagonal (Ports and Adapters)](./adr/0003-backend-architecture-pattern.md) 
* [ADR 0004: Adoção da Abordagem Mobile-First no Design e Desenvolvimento](./adr/0004-mobile-first-strategy.md)
* [ADR 0005: Padronização de Layout, Suporte Nativo a Dark Mode e Extensão de Estilos](./adr/0005-layout-dark-mode-and-styling-guidelines.md)
* [ADR 0006: Adoção do PostgreSQL como Banco de Dados Relacional Principal](./adr/0006-postgresql-database.md)
* [ADR 0007: Hierarquia Flexível de Categorias com Autorreferência (Self-Referencing)](./adr/0007-hierarchical-categories-self-referencing.md)

---

## 🔌 API Contracts (Contratos de API)
Documentação formal dos contratos, esquemas de dados e endpoints disponibilizados pelos microsserviços.

* [Registrar Novo Desperdício (`POST /api/v1/wastes`)](./api/register-waste-contract.md)

---

## 📊 Modelagem de Dados
Documentação estrutural do banco de dados, diagramas de entidade-relacionamento (DER) e dicionário de dados das entidades do sistema.

* [0001: Modelagem Geral do Banco de Dados (PostgreSQL)](./database/0001-data-modeling.md)
* [0002: Dicionário de Dados: Insumos e Desperdícios](./database/0002-data-dictionary.md)
* [0003: Modelagem do Banco de Dados (DER)](./database/0003-schema-model)
* [0004: Como Criar e Migrar Tabelas com SQLAlchemy e Alembic](./database/0004-tables-creation.md)

---

## 📜 Padrões e Guias de Desenvolvimento
* [Guia de Conventional Commits](./conventional-commits.md) — Padrão de padronização de mensagens de commit adotado no repositório.

---

## 🚀 Manutenção da Documentação
Sempre que um novo documento, diagrama ou ADR for adicionado à pasta `docs/`, lembre-se de atualizar este sumário para manter a organização.