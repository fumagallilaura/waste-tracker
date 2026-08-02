# 0003 - Modelagem do Banco de Dados (DER) - Waste Tracker

## 1. Visão Geral das Entidades

### `ingredients` (Insumos / Ingredientes)
Armazena a matéria-prima utilizada na cozinha e seu custo unitário padrão.
- `id` (UUID, PK)
- `name` (VARCHAR, Not Null) - Ex: Tomate Italiano
- `unit` (VARCHAR, Not Null) - Ex: kg, l, un
- `unit_cost` (NUMERIC(10,2), Not Null) - Custo por unidade em moeda local
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `wastes` (Lançamentos de Desperdício)
Registra cada evento de descarte ocorrido na operação.
- `id` (UUID, PK)
- `ingredient_id` (UUID, FK -> `ingredients.id`, Not Null)
- `quantity` (NUMERIC(10,3), Not Null) - Quantidade desperdiçada
- `unit` (VARCHAR, Not Null) - Unidade de medida do lançamento
- `category` (VARCHAR, Not Null) - Classificação (ex: `PREPARATION_WASTE`, `SPOILAGE`, `PLATE_WASTE`)
- `reason` (VARCHAR, Not Null) - Motivo principal mapeado
- `estimated_cost` (NUMERIC(10,2), Not Null) - Custo calculado (`quantity * unit_cost` ou valor informado)
- `notes` (TEXT, Nullable) - Observações operacionais
- `registered_at` (TIMESTAMP, Not Null) - Data/hora em que o desperdício ocorreu
- `created_at` (TIMESTAMP)

---

## 2. Script SQL Inicial (DDL de Referência)

```sql
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    unit_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wastes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    quantity NUMERIC(10, 3) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    reason VARCHAR(100) NOT NULL,
    estimated_cost NUMERIC(10, 2) NOT NULL CHECK (estimated_cost >= 0),
    notes TEXT,
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wastes_registered_at ON wastes(registered_at);
CREATE INDEX idx_wastes_category ON wastes(category);