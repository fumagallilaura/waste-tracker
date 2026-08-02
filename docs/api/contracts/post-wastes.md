# Contrato de API: Registrar Novo Desperdício

## 1. Endpoint
```http
POST /api/v1/wastes
```

## 2. Cabeçalhos (Headers)

- Content-Type: application/json

- Accept: application/json

## 3. Payload de Requisição (Request Body)
Estrutura enviada pelo front-end no momento do lançamento na cozinha:

```json
{
  "ingredientId": "ing_987654321",
  "quantity": 1.5,
  "unit": "kg",
  "category": "PREPARATION_WASTE",
  "reason": "EXCESS_PRODUCTION",
  "estimatedCost": 45.00,
  "notes": "Sobras de vegetais cortados para o buffet do almoço.",
  "registeredAt": "2026-08-02T13:14:00Z"
}
```

`ingredientId`: Identificador único do insumo ou ingrediente.

`quantity`: Quantidade numérica desperdiçada.

`unit`: Unidade de medida (kg, g, l, un).

`category`: Classificação operacional (ex: SPOILAGE, PREPARATION_WASTE, PLATE_WASTE).

`reason`: Motivo principal mapeado pela operação.

`estimatedCost`: Custo financeiro estimado do desperdício em moeda local.

`notes`: Observações opcionais preenchidas pelo operador.

## 4. Resposta de Sucesso (HTTP 201 Created)
Retornada quando o registro é validado e salvo com sucesso no banco de dados:
```json
{
  "success": true,
  "data": {
    "id": "wst_123456789",
    "ingredientId": "ing_987654321",
    "ingredientName": "Tomate Italiano",
    "quantity": 1.5,
    "unit": "kg",
    "category": "PREPARATION_WASTE",
    "reason": "EXCESS_PRODUCTION",
    "estimatedCost": 45.00,
    "notes": "Sobras de vegetais cortados para o buffet do almoço.",
    "registeredAt": "2026-08-02T13:14:00Z",
    "createdAt": "2026-08-02T13:14:05Z"
  },
  "message": "Desperdício registrado com sucesso."
}
```

## 5. Resposta de Erro de Validação (HTTP 400 Bad Request)
Retornada caso algum campo obrigatório esteja faltando ou inválido:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos fornecidos para o registro.",
    "details": [
      {
        "field": "quantity",
        "message": "A quantidade deve ser maior que zero."
      }
    ],
    "timestamp": "2026-08-02T13:14:05Z"
  }
}
```
