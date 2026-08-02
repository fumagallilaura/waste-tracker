# ADR 0003: Adoção de Arquitetura Hexagonal (Ports and Adapters)

## Status

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O **Waste Tracker** precisa garantir que o núcleo de suas regras de negócio (cálculo de custos de desperdício, validações de estoque e relatórios) permaneça totalmente independente de detalhes técnicos externos, como frameworks web (Next.js API Routes ou NestJS), bancos de dados (PostgreSQL) ou serviços de mensageria. Precisamos de um padrão que isole o domínio.

## Decisão
1. **Padrão Arquitetural:** O back-end adotará a **Arquitetura Hexagonal (Ports and Adapters)**.
2. **Estrutura de Camadas:**
   - **Domain (Core):** Entidades de negócio puras, *Value Objects* e regras de domínio sem nenhuma dependência externa.
   - **Ports (Contratos/Interfaces):**
     - *Driving / Inbound Ports:* Casos de uso (*Use Cases*) ou interfaces que definem como o mundo externo interage com o domínio.
     - *Driven / Outbound Ports:* Interfaces que definem o que o domínio precisa do mundo externo (ex: repositórios de dados).
   - **Adapters (Implementações):**
     - *Driving / Inbound Adapters:* Controladores HTTP (REST), rotas de API, console CLI.
     - *Driven / Outbound Adapters:* Implementações concretas de persistência (Prisma/TypeORM com PostgreSQL), clientes externos, etc.

## Consequências
* **Positivas:** Desacoplamento total entre o negócio e a tecnologia; facilidade extrema para testes unitários do domínio usando mocks das portas; flexibilidade para trocar frameworks ou bancos de dados sem tocar nas regras da aplicação.
* **Negativas:** Curva de aprendizado inicial ligeiramente maior e maior quantidade de mapeadores de dados entre as camadas (*DTOs* vs *Entities*).