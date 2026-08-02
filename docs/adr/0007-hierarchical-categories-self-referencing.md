# ADR 0007: Hierarquia Flexível de Categorias com Autorreferência (Self-Referencing)

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O sistema precisa permitir que os usuários gerenciem suas categorias de custos e lançamentos de forma totalmente flexível e personalizada. Conforme os requisitos de negócio, um usuário pode criar estruturas profundas e ramificadas (ex: `Transporte` -> `Transporte Urbano` -> `Uber`), sem limites rígidos de níveis predefinidos (categoria da categoria da categoria).

Precisávamos definir a abordagem de modelagem no banco de dados relational (PostgreSQL) e a estratégia de API no backend para suportar árvores hierárquicas arbitrárias de forma performática e simples de manter.

## Decisão
Optamos por adotar o padrão de **Lista de Adjacência com Autorreferência (Self-Referencing Relationship)**:

1. **Modelagem relacional via auto-relacionamento (`parent_id`):**
   * **Justificativa:** A tabela de categorias possuirá uma chave estrangeira opcional apontando para ela mesma. Categorias raiz terão `parent_id = NULL`, enquanto subcategorias referenciarão o ID da categoria imediatamente superior, permitindo profundidade infinita.
2. **Flexibilidade total para o usuário na API:**
   * **Justificativa:** Os endpoints do backend darão total liberdade para criação, edição e remoção de nós na árvore de categorias, permitindo que o front-end exiba tanto estruturas planas quanto aninhadas (nested).

## Consequências
* **Positivas:** Simplicidade de implementação no PostgreSQL, facilidade para consultas diretas de filhos usando índices, e flexibilidade absoluta para o modelo mental do usuário organizar suas despesas.
* **Negativas / Cuidados:** Consultas que exigem a árvore inteira de forma recursiva requerem o uso de CTEs recursivas (`WITH RECURSIVE`) no PostgreSQL, exigindo atenção com a indexação da coluna `parent_id` para evitar degradação de performance.