# 🚀 Squad Tech Pro — Calculadora Científica & Tech Engine

Uma calculadora científica web de alto desempenho desenvolvida com uma estética **Cyberpunk Neon / Dark Tech**, estruturada em múltiplos módulos de computação avançada e suporte completo a **Modo Escuro (Dark) e Modo Claro (Light)**[cite: 1].

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3** (Com variáveis dinâmicas de tema e efeitos visuais *Scanlines*)[cite: 1].
* **Tailwind CSS** (Estilização utilitária e mapeamento de variáveis de tema claro/escuro)[cite: 1].
* **JavaScript Moderno (ES6+)** (Motores de cálculo personalizados, suporte a `BigInt` para combinatória exata e manipulação de `Canvas`)[cite: 1].
* **FontAwesome & Google Fonts** (Ícones e fontes monoespaciadas *JetBrains Mono*)[cite: 1].
* **PWA (Progressive Web App)** (Suporte a instalação e execução offline)[cite: 1].

---

## 📦 Estrutura do Projeto

O projeto está modularizado nos seguintes ficheiros essenciais:
1. **`index.html`** — Estrutura de marcação HTML, abas de navegação, controlos de tema e interface HUD[cite: 1].
2. **`style.css`** — Folha de estilos customizada baseada em variáveis CSS (`:root` e `.dark`) para transição fluida entre os modos claro e escuro[cite: 1].
3. **`script.js`** — Núcleo lógico de processamento matemático, gestor de temas com persistência (`localStorage`), motores numéricos, manipulação do Canvas e registo de histórico[cite: 1].

---

## 🌓 Alternância de Tema (Modo Escuro / Modo Claro)
* O sistema conta com um botão dedicado no canto superior direito (`DARK` / `LIGHT`)[cite: 1].
* As preferências do utilizador são memorizadas automaticamente no navegador através do `localStorage`[cite: 1].
* Os gráficos em `Canvas` e as cores de destaque adaptam-se dinamicamente conforme o modo selecionado[cite: 1].

---

## ⚡ Módulos e Funcionalidades

O sistema está dividido em **6 módulos principais**:

1. **01// Calculadora Científica (`#module-calc`)** — Operações científicas completas, trigonométricas, logarítmicas, fatoriais, teclado virtual/físico e histórico rápido[cite: 1].
2. **02// Funções & Gráfico (`#module-graph`)** — Avaliador de $f(x)$, gerador dinâmico de tabelas e HUD Plotter interativo no Canvas com suporte a Pan e Zoom[cite: 1].
3. **03// Matrizes (`#module-matrix`)** — Álgebra matricial completa até $5 \times 5$ (Soma, Subtração, Multiplicação por escalar, Produto matricial, Determinante, Transposta e Inversa)[cite: 1].
4. **04// Combinatória (`#module-combinatorics`)** — Processamento exato com `BigInt` para Fatorial, Permutação Simples/Repetição, Arranjo e Combinação[cite: 1].
5. **05// Cálculo Numérico (`#module-calculus`)** — Derivadas de 1ª e 2ª ordem por diferenças finitas e integrais definidas por quadratura numérica[cite: 1].
6. **06// Histórico (`#module-history`)** — Registo persistente de logs de cálculos efetuados na sessão[cite: 1].

---

## ⚙️ Como Executar o Projeto Localmente

1. Mantenha os três ficheiros (`index.html`, `style.css` e `script.js`) na mesma pasta[cite: 1].
2. Abra o ficheiro **`index.html`** diretamente em qualquer navegador moderno.