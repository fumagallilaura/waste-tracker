# ADR 0004: Adoção da Abordagem Mobile-First no Design e Desenvolvimento

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O **Waste Tracker** é um sistema voltado para o monitoramento e gestão eficiente de resíduos e custos. Na rotina operacional de cozinhas industriais, hotéis e eventos, o registro de perdas muitas vezes não ocorre em estações de trabalho fixas com computadores, mas sim diretamente no chão de fábrica, armazéns ou cozinhas por meio de dispositivos móveis (smartphones e tablets) manuseados pelos operadores.

Precisávamos definir uma diretriz de experiência de usuário e desenvolvimento front-end que garantisse a usabilidade perfeita em telas compactas, sem sacrificar a complexidade dos dashboards gerenciais visualizados posteriormente por gestores em desktops.

## Decisão
Optamos por adotar oficialmente a abordagem **Mobile-First** para toda a concepção de layout e estilização com Tailwind CSS:

1. **Desenvolvimento de UI a partir do menor breakpoint:**
   * **Justificativa:** Os componentes e telas são construídos pensando primeiro nos dispositivos móveis (`base` e `sm` do Tailwind). Os layouts de desktop (`md`, `lg`, `xl`) são adicionados progressivamente por meio de media queries.
2. **Foco na Operação de Campo:**
   * **Justificativa:** Garantir que botões de lançamento rápido de desperdício, tabelas de insumos e inputs numéricos possuam tamanhos de toque adequados (touch-friendly) e excelente ergonomia para o uso em trânsito ou ambientes de alta demanda operacional.

## Consequências
* **Positivas:** Experiência de usuário altamente otimizada para operadores em campo, carregamento mais leve de elementos visuais em redes móveis e consistência no design responsivo desde a concepção inicial das páginas.
* **Negativas / Cuidados:** Exige maior rigor do time de desenvolvimento e design para estruturar dashboards densos de gerência de forma limpa quando redimensionados para telas maiores.