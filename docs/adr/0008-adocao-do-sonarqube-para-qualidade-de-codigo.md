# ADR 0008: Adoção do SonarQube para Análise Estática e Qualidade de Código

* **Status:** Aceito
* **Data:** 2026-04-05
* **Contexto:** O projeto **Waste Tracker** é composto por uma arquitetura desacoplada (Backend em Python/FastAPI e Frontend em Next.js/TypeScript). À medida que o projeto evolui, torna-se essencial garantir a manutenibilidade, a ausência de vulnerabilidades de segurança, a prevenção de débitos técnicos e o acompanhamento rigoroso da cobertura de testes automatizados de forma padronizada.

## Contexto e Problema
Precisávamos de uma ferramenta centralizada para realizar inspeções contínuas da qualidade do código-fonte, medir a cobertura de testes e aplicar *Quality Gates* (portas de qualidade) consistentes. 

Como a aplicação possui duas tecnologias principais muito distintas (Python no back-end e TypeScript/React no front-end), a nossa abordagem de análise estática precisava atender aos seguintes requisitos:
1. Isolar os relatórios de forma independente para que o código de back-end e front-end tivessem métricas claras e separadas.
2. Integrar a geração de relatórios de cobertura (como o `pytest-cov`) diretamente ao painel de métricas.
3. Ser fácil de subir e rodar em ambiente de desenvolvimento local e pipelines utilizando Docker.

## Decisão
Decidimos adotar o **SonarQube** (em sua versão Community Build rodando via containers Docker) integrado a um script automatizado de execução (`analisar.sh`). 

Para atender à separação das tecnologias, a arquitetura do projeto no SonarQube foi dividida em dois projetos distintos utilizando arquivos de propriedades dedicados:
* `sonar-project-backend.properties` (focado na linguagem Python, excluindo pastas de dependências virtuais, caches e incluindo o relatório de cobertura `coverage.xml`).
* `sonar-project-frontend.properties` (focado no ecossistema Next.js/TypeScript).

## Consequências

### Positivas
* **Visibilidade Clara:** Separação exata das métricas, *code smells*, bugs e vulnerabilidades entre o back-end e o front-end.
* **Padronização:** Facilita a aplicação de regras de estilo e boas práticas consistentes para ambas as tecnologias.
* **Automação:** O processo foi totalmente encapsulado em um script de execução local (`analisar.sh`), permitindo que qualquer desenvolvedor audite o código em segundos antes de subir alterações.
* **Métricas de Cobertura:** Integração direta da cobertura de testes unitários do Python (`pytest`) com o painel de qualidade.

### Negativas / Mitigações
* **Uso de Recursos:** A execução local do SonarQube via Docker exige o consumo de memória e CPU adicionais da máquina de desenvolvimento. *(Mitigação: O ambiente sobe sob demanda apenas quando o script de análise é executado).*
* **Complexidade de Configuração:** A exigência de múltiplos arquivos `.properties` e tratamento de flags no container Docker no Windows/WSL exigiu ajustes finos na scriptagem de execução.