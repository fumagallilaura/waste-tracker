# ADR 0002: Adoção de Arquitetura RESTful e Contratos de API

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O **Waste Tracker** precisa de uma camada de API para gerenciar lançamentos de desperdício, insumos, relatórios analíticos e controle financeiro. Precisamos definir o estilo arquitetural da API e os padrões de contrato que serão consumidos pelo front-end em Next.js (App Router) e futuros clientes.

## Decisão
1. **Estilo Arquitetural:** A API seguirá o padrão **RESTful**, utilizando os verbos HTTP de forma semântica (`GET`, `POST`, `PUT`, `DELETE`) e URLs baseadas em recursos plurais.
2. **Formato de Dados:** Todo o tráfego de requisições e respostas utilizará estritamente o formato **JSON**.
3. **Padrão de Resposta de Erro:** As respostas de erro seguirão uma estrutura padronizada contendo código de status, mensagem descritiva e carimbo de data/hora (`timestamp`).
4. **Versionamento:** A API será versionada via URL (ex: `/api/v1/...`).

## Consequências
* **Positivas:** Padronização clara dos endpoints, facilitando o consumo pelo TanStack Query no front-end e a documentação dos contratos.
* **Negativas:** Menos flexibilidade em consultas complexas em comparação a uma abordagem GraphQL, o que será mitigado com parâmetros de filtro eficientes nas queries `GET`.