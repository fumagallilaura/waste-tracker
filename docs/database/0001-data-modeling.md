# 0001 - Modelagem de Dados - Waste Tracker

* **Status:** Vigente
* **Data:** 2026-08-02
* **Tecnologia:** PostgreSQL

## 1. Visão Geral
A modelagem de dados do **Waste Tracker** foi estruturada para garantir a integridade transacional, rastreabilidade de custos operacionais em cozinhas e alta performance nas consultas de relatórios gerenciais e dashboards. O banco de dados relacional oficial utilizado é o **PostgreSQL**.

---

## 2. Diagrama Entidade-Relacionamento (Conceitual / Lógico)

Abaixo está a representação textual das principais entidades do sistema e seus relacionamentos:

```text
[ USERS ] 1 ----- N [ WASTES ] N ----- 1 [ INGREDIENTS ]
                             |
                             N
                     [ WASTE_CATEGORIES ]
```

## 3. Dicionário de Tabelas

### 3.1. `ingredients` (Insumos / Ingredientes)
Armazena todos os insumos cadastrados disponíveis na operação para controle de estoque e perdas.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | PRIMARY KEY | Identificador único (UUID ou slug customizado, ex: `ing_...`). |
| `name` | VARCHAR(150) | NOT NULL, UNIQUE | Nome comercial do ingrediente (ex: "Tomate Italiano"). |
| `unit` | VARCHAR(10) | NOT NULL | Unidade padrão de medida (`kg`, `g`, `l`, `un`). |
| `unit_cost` | DECIMAL(10,2) | NOT NULL | Custo unitário médio estimado do insumo. |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Data e hora de criação do registro. |

---

### 3.2. `wastes` (Registros de Desperdício)
Tabela transacional central responsável por armazenar cada lançamento de perda ou sobra ocorrido na operação.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | PRIMARY KEY | Identificador único do registro (ex: `wst_...`). |
| `ingredient_id` | VARCHAR(36) | FOREIGN KEY (`ingredients.id`) | Insumo associado ao desperdício. |
| `quantity` | DECIMAL(10,3) | NOT NULL | Quantidade numérica desperdiçada. |
| `unit` | VARCHAR(10) | NOT NULL | Unidade de medida utilizada no lançamento. |
| `category` | VARCHAR(50) | NOT NULL | Classificação operacional (`PREPARATION_WASTE`, `SPOILAGE`, `PLATE_WASTE`). |
| `reason` | VARCHAR(100) | NOT NULL | Motivo mapeado pela operação (ex: `EXCESS_PRODUCTION`, `EXPIRATION`). |
| `estimated_cost` | DECIMAL(10,2) | NOT NULL | Custo financeiro calculado no momento do lançamento. |
| `notes` | TEXT | NULLABLE | Observações opcionais preenchidas pelo operador. |
| `registered_at` | TIMESTAMP | NOT NULL | Data e hora em que o desperdício ocorreu na cozinha. |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Data e hora de inserção do registro no sistema. |

## 4. Índices e Otimização
* Índice B-Tree na coluna `registered_at` da tabela `wastes` para otimizar filtros por período nos relatórios gerenciais e dashboards.
* Índice de chave estrangeira em `wastes(ingredient_id)` para garantir velocidade em joins analíticos.