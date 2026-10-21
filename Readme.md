# 🚀 Squad Tech Pro — Calculadora Científica & Tech Engine

Uma calculadora científica web de alto desempenho desenvolvida com uma estética **Cyberpunk Neon / Dark Tech**, estruturada em múltiplos módulos de computação avançada e suporte completo a **Modo Escuro (Dark) e Modo Claro (Light)**.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3** (Com variáveis dinâmicas de tema e efeitos visuais *Scanlines*).
* **Tailwind CSS** (Estilização utilitária e mapeamento de variáveis de tema claro/escuro).
* **JavaScript Moderno (ES6+)** (Motores de cálculo personalizados, suporte a `BigInt` para combinatória exata e manipulação de `Canvas`).
* **FontAwesome & Google Fonts** (Ícones e fontes monoespaciadas *JetBrains Mono*).
* **PWA (Progressive Web App)** (Suporte a instalação e execução offline).

---

## 📦 Estrutura do Projeto

O projeto está modularizado nos seguintes ficheiros essenciais:
1. **`index.html`** — Estrutura de marcação HTML, abas de navegação, controlos de tema e interface HUD.
2. **`style.css`** — Folha de estilos customizada baseada em variáveis CSS (`:root` e `.dark`) para transição fluida entre os modos claro e escuro.
3. **`script.js`** — Núcleo lógico de processamento matemático, gestor de temas com persistência (`localStorage`), motores numéricos, manipulação do Canvas e registo de histórico.

---

## 🌓 Alternância de Tema (Modo Escuro / Modo Claro).
* O sistema conta com um botão dedicado no canto superior direito (`DARK` / `LIGHT`).
* As preferências do utilizador são memorizadas automaticamente no navegador através do `localStorage`.
* Os gráficos em `Canvas` e as cores de destaque adaptam-se dinamicamente conforme o modo selecionado.

---

## ⚡ Módulos e Funcionalidades

O sistema está dividido em **6 módulos principais**:

1. **01// Calculadora Científica (`#module-calc`)** — Operações científicas completas, trigonométricas, logarítmicas, fatoriais, teclado virtual/físico e histórico rápido.
2. **02// Funções & Gráfico (`#module-graph`)** — Avaliador de $f(x)$, gerador dinâmico de tabelas e HUD Plotter interativo no Canvas com suporte a Pan e Zoom.
3. **03// Matrizes (`#module-matrix`)** — Álgebra matricial completa até $5 \times 5$ (Soma, Subtração, Multiplicação por escalar, Produto matricial, Determinante, Transposta e Inversa).
4. **04// Combinatória (`#module-combinatorics`)** — Processamento exato com `BigInt` para Fatorial, Permutação Simples/Repetição, Arranjo e Combinação.
5. **05// Cálculo Numérico (`#module-calculus`)** — Derivadas de 1ª e 2ª ordem por diferenças finitas e integrais definidas por quadratura numérica.
6. **06// Histórico (`#module-history`)** — Registo persistente de logs de cálculos efetuados na sessão.

---

## ⚙️ Como Executar o Projeto Localmente

1. Mantenha os três ficheiros (`index.html`, `style.css` e `script.js`) na mesma pasta.
3. Abra o ficheiro **`index.html`** diretamente em qualquer navegador moderno.
