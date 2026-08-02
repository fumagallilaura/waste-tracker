# ADR 0001: Arquitetura Frontend com Next.js e Atomic Design

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
Precisamos iniciar o desenvolvimento do front-end do **Waste Tracker**, um sistema de gestão de desperdício e custos voltado para cozinhas de hotéis e eventos. A interface inicial deve suportar dashboards gerenciais complexos, tabelas de controle de insumos, formulários de lançamento de gastos e forte aderência a uma identidade visual própria baseada em uma paleta eco-corporativa (composta por tons de verde-esmeralda, azul-marinho, branco puro e cinza claro).

Precisávamos definir o framework base, a metodologia de estruturação de componentes UI, a estratégia de estilização e o gerenciamento de estado para garantir escalabilidade desde a primeira feature de gestão de gastos.

## Decisão
Optamos por adotar a seguinte stack e arquitetura para o front-end:

1. **Framework:** **Next.js (com App Router e TypeScript)**
   * **Justificativa:** Oferece excelente performance, suporte nativo a rotas estruturadas, facilidade para SSR/SSG quando necessário, e a possibilidade de criar rotas de API (*Serverless Functions*) internamente na fase inicial do projeto.
2. **Metodologia de UI:** **Atomic Design**
   * **Justificativa:** Divide a interface em Átomos, Moléculas, Organismos, Templates e Páginas. Isso garante consistência visual com a paleta eco-corporativa e facilita a reutilização de elementos de formulários e tabelas.
3. **Estilização:** **Tailwind CSS**
   * **Justificativa:** Permite traduzir com precisão os códigos hexadecimais da paleta de cores para classes utilitárias, mantendo o design padronizado e acelerando o desenvolvimento de dashboards B2B.
4. **Gerenciamento de Estado e Dados:** 
   * **TanStack Query (React Query):** Para gerenciar o estado do servidor (cache, requisições, paginação de gastos).
   * **Zustand:** Para o estado global de UI (filtros ativos, sidebar, preferências do usuário).

## Consequências
* **Positivas:** Padronização visual estrita, facilidade de manutenção à medida que novas features (como o módulo de eventos e relatórios avançados) forem adicionadas, e alta performance de carregamento.
* **Negativas / Cuidados:** Curva de aprendizado inicial na organização estrita das pastas do Atomic Design e disciplina necessária para não misturar regras de negócio nos componentes visuais.