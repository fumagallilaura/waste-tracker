# ADR 0005: Padronização de Layout, Suporte Nativo a Dark Mode e Extensão de Estilos

* **Status:** Aceito
* **Data:** 2026-08-02
* **Decisor:** Laura Fumagalli

## Contexto
O **Waste Tracker** é utilizado tanto em ambientes de cozinha industrial e eventos sob luz intensa quanto em escritórios gerenciais onde gestores podem preferir o uso noturno ou ambientes com menor luminosidade. Além disso, a rápida evolução de novas features exige uma diretriz clara e padronizada de como estruturar layouts e aplicar novos estilos visuais sem quebrar a consistência da identidade eco-corporativa.

Precisávamos definir a arquitetura de layout base, o padrão técnico para alternância entre temas (Light/Dark Mode) e o processo mandatório para a criação de novos estilos na aplicação.

## Decisão
Optamos por adotar as seguintes diretrizes arquiteturais para estilização e layout:

1. **Estrutura de Layout Base:**
   * **Justificativa:** Uso do sistema de grids e flexbox nativos do Tailwind CSS combinados com a estrutura de rotas do Next.js App Router (`layouts` compartilhados), garantindo que a barra de navegação, áreas de conteúdo e rodapé mantenham proporções fluidas e responsivas.
2. **Suporte Obrigatório a Dark Mode:**
   * **Justificativa:** Adoção da estratégia baseada em classes do Tailwind (`darkMode: 'class'`) gerenciada por tokens de cores semânticos. Todos os componentes devem obrigatoriamente suportar os estados claro e escuro.
3. **Padrão para Criação de Novos Estilos:**
   * **Justificativa:** Sempre que um novo componente ou estilo for criado, é mandatório mapear e implementar explicitamente as classes correspondentes para ambos os temas (`light` e `dark`), utilizando prefixos do Tailwind (ex: `bg-white dark:bg-slate-900` e `text-emerald-700 dark:text-emerald-400`). É proibido o uso de cores fixas que não se adaptem à mudança de tema.

## Consequências
* **Positivas:** Flexibilidade visual para os operadores e gestores em diferentes ambientes de trabalho, manutenção facilitada da identidade visual e código limpo e padronizado.
* **Negativas / Cuidados:** Dobro da atenção no momento do desenvolvimento de novas telas ou componentes, pois cada elemento visual precisa ser validado e testado tanto no modo claro quanto no modo escuro.