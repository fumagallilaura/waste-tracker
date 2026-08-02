# Padrão de Conventional Commits

Este projeto adota a especificação do **Conventional Commits** para padronizar o histórico de commits. Isso facilita a leitura do histórico, a geração automática de changelogs e o versionamento semântico.

## Estrutura da Mensagem
Cada commit deve seguir a seguinte estrutura:

```text
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

## Tipos Utilizados

* **`feat`**: Uma nova funcionalidade para o usuário (ex: `feat(gastos): add new expense registration form`).
* **`fix`**: Correção de um bug (ex: `fix(auth): resolve token expiration redirect issue`).
* **`docs`**: Mudanças apenas na documentação (ex: `docs: update README with setup instructions`).
* **`style`**: Alterações que não afetam o significado do código (espaçamento, formatação, ponto e vírgula, etc.).
* **`refactor`**: Uma alteração de código que não corrige bugs nem adiciona funcionalidades (ex: reorganizar componentes do Atomic Design).
* **`perf`**: Alteração de código que melhora a performance.
* **`test`**: Adição ou correção de testes automatizados.
* **`chore`**: Alterações em ferramentas de build, arquivos de configuração ou pacotes (ex: `chore(deps): update next version`).

## Exemplos Práticos

* Commit de infraestrutura/configuração inicial:
  `chore(repo): initialize project structure and gitignore`
* Commit de documentação de arquitetura:
  `docs(adr): add frontend architecture decision record`
* Commit de componente de UI:
  `feat(ui): add primary button atom based on eco-corporate palette`