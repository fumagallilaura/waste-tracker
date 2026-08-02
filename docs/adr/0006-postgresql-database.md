# ADR 0006: Adoção do PostgreSQL como Banco de Dados Relacional Principal

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O **Waste Tracker** é um sistema de gestão de custos e desperdícios voltado para cozinhas industriais, hotéis e eventos. A aplicação lida com dados altamente relacionais e transacionais que exigem rigor na integridade dos registros financeiros e de estoque (como o vínculo estrito entre insumos, categorias de perdas e cálculos monetários de custos estimados). 

Precisávamos definir qual sistema de gerenciamento de banco de dados (SGBD) seria adotado para garantir consistência transacional (ACID), suporte robusto a tipos numéricos precisos para quantidades e custos, além de excelente performance em consultas analíticas e relatórios gerenciais consolidados.

## Decisão
Optamos por adotar o **PostgreSQL** como o banco de dados relacional oficial do projeto:

1. **Garantia de Integridade Transacional (ACID):**
   * **Justificativa:** Essencial para transações críticas de estoque e auditoria financeira, prevenindo inconsistências em lançamentos simultâneos feitos por múltiplos operadores na cozinha.
2. **Suporte Nativo a Tipos de Dados e Precisão Decimal:**
   * **Justificativa:** O tipo `DECIMAL` / `NUMERIC` do PostgreSQL garante exatidão matemática em cálculos de custos financeiros e frações de unidades de medida (ex: pesagens de ingredientes em gramas e quilogramas), evitando erros de arredondamento comuns em tipos de ponto flutuante.
3. **Ecossistema, Indexação e Consultas Complexas:**
   * **Justificativa:** Excelente performance com índices avançados (B-Tree) para filtros temporais por período em dashboards gerenciais, além de amplo suporte em ORMs e ferramentas de migração no ecossistema moderno.

## Consequências
* **Positivas:** Alta confiabilidade dos dados, facilidade para estruturar chaves estrangeiras e restrições de domínio robustas, e excelente suporte da comunidade e ferramentas de tooling.
* **Negativas / Cuidados:** Exige maior planejamento em relação à escalabilidade horizontal em comparação a bancos NoSQL, demandando o uso adequado de indexação e otimização de queries à medida que o volume histórico de lançamentos de desperdício crescer.