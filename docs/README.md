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

---

## 🔌 API Contracts (Contratos de API)
Documentação formal dos contratos, esquemas de dados e endpoints disponibilizados pelos microsserviços.

* [Registrar Novo Desperdício (`POST /api/v1/wastes`)](./api/register-waste-contract.md)

---

## 📜 Padrões e Guias de Desenvolvimento
* [Guia de Conventional Commits](./conventional-commits.md) — Padrão de padronização de mensagens de commit adotado no repositório.

---

## 🚀 Manutenção da Documentação
Sempre que um novo documento, diagrama ou ADR for adicionado à pasta `docs/`, lembre-se de atualizar este sumário para manter a organização.