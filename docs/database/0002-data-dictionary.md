# 0002 - Dicionário de Dados Detalhado - Waste Tracker

* **Status:** Vigente
* **Data:** 2026-08-02
* **Tecnologia:** PostgreSQL

## 1. Visão Geral
Este documento detalha o dicionário de dados do **Waste Tracker**, especificando regras de negócio, domínios de valores aceitos e validações aplicadas aos campos das principais entidades do sistema.

---

## 2. Dicionário de Domínios e Enums

### 2.1. `Unit` (Unidades de Medida)
Unidades permitidas para cadastro de insumos e lançamentos de desperdício.
* `kg`: Quilogramas
* `g`: Gramas
* `l`: Litros
* `un`: Unidades

### 2.2. `WasteCategory` (Categorias de Desperdício)
Classificação operacional do tipo de perda ocorrida.
* `PREPARATION_WASTE`: Desperdício gerado durante o pré-preparo ou corte de ingredientes.
* `SPOILAGE`: Alimentos estragados ou vencidos que precisaram ser descartados.
* `PLATE_WASTE`: Sobras limpas ou restos de pratos retornados do salão/buffet.

### 2.3. `WasteReason` (Motivos de Desperdício)
Motivo principal mapeado para fins de auditoria e relatórios gerenciais.
* `EXCESS_PRODUCTION`: Produção acima da demanda real do evento ou refeição.
* `EXPIRATION`: Validade expirada no estoque.
* `PREPARATION_ERROR`: Erro humano ou técnico durante a execução da receita.
* `QUALITY_ISSUE`: Insumo recebido fora do padrão de qualidade ou deteriorado.

---

## 3. Detalhamento de Atributos por Entidade

### 3.1. Entidade: `ingredients`
Representa o catálogo de insumos gerenciados pela cozinha.

| Atributo | Tipo de Dado | Obrigatório | Regras de Validação / Descrição |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | Sim | Chave primária gerada via UUIDv4 ou slug padronizado (ex: `ing_...`). |
| `name` | VARCHAR(150) | Sim | Nome único do insumo. Não pode conter caracteres especiais inválidos. |
| `unit` | VARCHAR(10) | Sim | Deve pertencer estritamente ao domínio de unidades aceitas (`kg`, `g`, `l`, `un`). |
| `unit_cost` | DECIMAL(10,2) | Sim | Valor monetário unitário. Deve ser obrigatoriamente maior ou igual a zero. |
| `created_at` | TIMESTAMP | Sim | Data e hora de criação do registro no padrão UTC. |

---

### 3.2. Entidade: `wastes`
Representa cada lançamento individual de desperdício realizado na operação.

| Atributo | Tipo de Dado | Obrigatório | Regras de Validação / Descrição |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | Sim | Chave primária gerada no formato `wst_...`. |
| `ingredient_id` | VARCHAR(36) | Sim | Deve referenciar um ID válido existente na tabela `ingredients`. |
| `quantity` | DECIMAL(10,3) | Sim | Valor numérico estritamente maior que zero (`quantity > 0`). |
| `unit` | VARCHAR(10) | Sim | Unidade correspondente ao lançamento, compatível com o insumo. |
| `category` | VARCHAR(50) | Sim | Deve pertencer ao enum `WasteCategory`. |
| `reason` | VARCHAR(100) | Sim | Deve pertencer ao enum `WasteReason`. |
| `estimated_cost` | DECIMAL(10,2) | Sim | Calculado automaticamente pela aplicação (`quantity * unit_cost`). |
| `notes` | TEXT | Não | Campo de texto livre limitado a 500 caracteres para observações operacionais. |
| `registered_at` | TIMESTAMP | Sim | Data/hora do fato gerador. Não pode ser uma data futura. |
| `created_at` | TIMESTAMP | Sim | Data e hora de persistência do registro no banco de dados. |