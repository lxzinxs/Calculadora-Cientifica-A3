# Calculadora Científica A3 — apresentação acadêmica

**Equipe:** Squad Tech Pro · **Disciplina:** Matemática Computacional<br>
**Instituição:** Centro Universitário UNA · Contagem<br>
**Professor:** André Rodrigues<br>
**Formato:** roteiro em Markdown, **10 slides** · **Duração prevista: 7min35s (455 segundos)**, incluindo **85 segundos de demonstração**. Perguntas ficam fora desse tempo.

## Integrantes e participação

Nomes e RAs conferidos na página 1 do [PDF original da primeira entrega](../1%C2%AA%20Entrega%20%C2%B7%20Squad%20Tech%20%C2%B7%20Matema%CC%81tica%20Computacional.pdf). O documento identifica o grupo como **Squad Tech**; a interface utiliza **Squad Tech Pro**. O RA de Bernardo foi mantido literalmente e o nome de Caio teve apenas a capitalização normalizada.

| Integrante | RA | Participação oral | Tempo total previsto |
|---|---|---|---|
| Lucas Nery Miranda | 4261212244 | Não apresentará; atuação técnica e de organização descrita abaixo | 0s |
| Gustavo Henrique da Silva Cunha | 4261214511 | Slides 2 e 9; trecho do slide 8 | 1min30s |
| Bernardo Benízio de Almeida | 42621691 | Slide 3; trechos dos slides 7 e 8 | 1min30s |
| Caio de Aquino Lima | 4261211879 | Slide 4; trechos dos slides 7 e 8 | 1min25s |
| Lucas Felipe dos Santos Silva | 4261213698 | Slides 1 e 5; trecho do slide 8 | 1min45s |
| Vitor de Paiva Cleto | 4261214103 | Slides 6 e 10; trecho do slide 8 | 1min25s |

### Responsabilidades técnicas e de organização — Lucas Nery Miranda

**Lucas Nery Miranda — RA 4261212244**, conforme suas responsabilidades informadas para esta entrega:

- Correção de erros e bugs do código.
- Manutenção e melhorias das funcionalidades da calculadora.
- Revisão do funcionamento dos cálculos e do sistema.
- Organização da apresentação acadêmica.
- Elaboração, revisão e distribuição das falas dos integrantes.
- Apoio técnico e preparação do sistema para a demonstração, antes da apresentação.

**Lucas Nery integra oficialmente a equipe, mas não terá falas, slides para apresentar nem participação na demonstração ao vivo.** Toda a exposição oral e a operação do sistema durante a apresentação serão realizadas por Gustavo, Bernardo, Caio, Lucas Felipe e Vitor. As responsabilidades acima são um registro de sua contribuição técnica e organizacional, não uma tarefa de apresentação.

## Cronograma dos 10 slides

| Slide | Tema | Apresentador(es) | Duração | Intervalo acumulado |
|---|---|---|---|---|
| 1 | Abertura | Lucas Felipe | 35s | 0:00–0:35 |
| 2 | Problema e objetivo | Gustavo | 45s | 0:35–1:20 |
| 3 | Tecnologias e arquitetura | Bernardo | 50s | 1:20–2:10 |
| 4 | Calculadora científica | Caio | 50s | 2:10–3:00 |
| 5 | Funções e gráficos | Lucas Felipe | 55s | 3:00–3:55 |
| 6 | Matrizes e combinatória | Vitor | 55s | 3:55–4:50 |
| 7 | Cálculo numérico e recursos extras | Bernardo (20s) e Caio (20s) | 40s | 4:50–5:30 |
| 8 | Demonstração prática | Os cinco apresentadores | 85s | 5:30–6:55 |
| 9 | Resultados e conclusão | Gustavo | 35s | 6:55–7:30 |
| 10 | Agradecimentos | Vitor | 5s | 7:30–7:35 |

Os tempos incluem fala, transições e ações na tela. São uma previsão para ensaio, não uma medição de uma apresentação já realizada.

## Preparação anterior à apresentação

- Executar o servidor conforme o [README](../README.md) e abrir `http://localhost:8000`. Deixar a aba 01 selecionada, com display e histórico limpos.
- Manter **RAD** e preparar a aba 02 com `x^2`, x `2`, mínimo `-2`, máximo `2` e passo `1`.
- Preparar a matriz A 2×2 como `[[1,2],[3,4]]`. Na aba 05, deixar `x^2`, x₀ `3`, a `0`, b `1` e método Simpson.
- Retornar à aba 01. Os cinco apresentadores devem ensaiar a operação e as trocas; a preparação técnica anterior não cria participação de Lucas Nery na demonstração ao vivo.
- Usar ponto nos decimais. Os exemplos já integram os testes do projeto; conferir novamente antes da aula se houver mudanças. Pequenas diferenças nos últimos dígitos de aproximações são esperadas.
- Reservar os cliques para o slide 8. Nos demais slides, usar os exemplos escritos ou as [capturas reais](../README.md#-capturas-reais-do-sistema), sem repetir a demonstração.

---

## Slide 1 — Abertura

**Responsável:** Lucas Felipe dos Santos Silva<br>
**Tempo estimado:** 35 segundos

**Conteúdo visual:**

- **Calculadora Científica A3 — Squad Tech Pro**.
- Matemática Computacional · Centro Universitário UNA · Contagem.
- Professor André Rodrigues.
- Exibir a lista dos seis integrantes e respectivos RAs da identificação acima; a lista representa a equipe completa, não a escala de falas.

**Roteiro de fala — Lucas Felipe:**

“Boa noite. Eu sou Lucas Felipe e apresento, com a Squad Tech Pro, a Calculadora Científica A3. O projeto reúne conteúdos de Matemática Computacional em uma aplicação web. Nossa equipe tem seis integrantes. Hoje, Gustavo, Bernardo, Caio, Vitor e eu faremos a apresentação oral. Vamos explicar o funcionamento e demonstrar cálculos, gráficos, matrizes e derivadas.”

**Demonstração:** nenhuma neste slide; manter a capa visível.

---

## Slide 2 — Problema e objetivo

**Responsável:** Gustavo Henrique da Silva Cunha<br>
**Tempo estimado:** 45 segundos

**Conteúdo visual:**

- Integrar cálculos científicos e ferramentas da disciplina em um só sistema.
- Corrigir falhas reais: arquivos não carregados, `ln(e)` inválido e erro de histórico que afetava contas simples.
- Conferir resultados conhecidos e informar entradas inválidas.
- Preservar a interface Cyberpunk Neon e seus temas.

**Roteiro de fala — Gustavo:**

“Eu sou Gustavo. O objetivo é reunir diferentes atividades matemáticas em uma ferramenta acessível no navegador. Durante a revisão, foram reproduzidos problemas de carregamento dos arquivos, de avaliação do logaritmo natural e de gravação do histórico. Nesse último caso, uma conta correta podia terminar mostrando ERRO. A correção separou o cálculo da persistência e acrescentou validações. Queremos que o usuário obtenha um resultado verificável ou uma mensagem que permita corrigir a entrada.”

**Demonstração:** nenhuma; os casos são problemas documentados, sem atribuição de culpa a integrantes.

---

## Slide 3 — Tecnologias e arquitetura

**Responsável:** Bernardo Benízio de Almeida<br>
**Tempo estimado:** 50 segundos

**Conteúdo visual:**

| Tecnologia | Papel |
|---|---|
| HTML5 | Estrutura, campos e botões |
| CSS3 e Tailwind compilado | Temas, layout responsivo e efeitos neon |
| JavaScript e Math.js | Eventos, validação e processamento matemático |
| Canvas e localStorage | Gráficos e persistência tolerante a falhas |
| Manifest e service worker | Recursos locais e cache offline |

```text
Entrada → validação da expressão → motor matemático
                                → resultado / tabela / gráfico
                                → histórico, quando disponível
```

**Roteiro de fala — Bernardo:**

“Eu sou Bernardo. O HTML organiza a interface, enquanto o CSS e o Tailwind mantêm o layout e o estilo neon. O JavaScript conecta os controles aos módulos. O motor usa Math.js com uma camada que limita a sintaxe e as funções aceitas, sem executar comandos JavaScript fornecidos pelo usuário. O Canvas desenha os gráficos e o armazenamento local guarda os registros quando está disponível. Se esse armazenamento falhar, o cálculo continua funcionando. Os arquivos também são organizados por responsabilidade para facilitar a manutenção.”

**Demonstração:** nenhuma; apontar o fluxo no diagrama.

---

## Slide 4 — Calculadora científica

**Responsável:** Caio de Aquino Lima<br>
**Tempo estimado:** 50 segundos

**Conteúdo visual:**

| Expressão | Resultado |
|---|---|
| `2+2` | `4` |
| `(5+3)*2` | `16` |
| `sqrt(81)` | `9` |
| `5!` | `120` |
| `log(100)` / `ln(e)` | `2` / `1` |
| `sin(pi/2)` em RAD | `1` |

- Parênteses, precedência, teclado virtual/físico e mensagens de erro.
- RAD/DEG e porcentagem explícita: `200*10% = 20`.

**Roteiro de fala — Caio:**

“Eu sou Caio. A calculadora aceita expressões digitadas e os botões da interface. Ela respeita os parênteses e a precedência: cinco mais três, entre parênteses, vezes dois resulta em dezesseis. Também oferece raízes, fatoriais, logaritmos e trigonometria. Log sem base usa base dez, enquanto ln é o logaritmo natural. O modo inicial é radianos, com opção de graus. Quando a expressão está incompleta ou a operação não tem resultado finito, uma mensagem orienta a correção, sem registrar um resultado inválido no histórico.”

**Demonstração:** nenhuma neste momento; executar a conta básica e a raiz no slide 8.

---

## Slide 5 — Funções e gráficos

**Responsável:** Lucas Felipe dos Santos Silva<br>
**Tempo estimado:** 55 segundos

**Conteúdo visual:**

Para `f(x)=x^2`:

| x | −2 | −1 | 0 | 1 | 2 |
|---|---|---|---|---|---|
| f(x) | 4 | 1 | 0 | 1 | 4 |

- Avaliação em `x=2`: `4`.
- Gráfico esperado: parábola com vértice na origem.
- Até quatro curvas, zoom, movimentação horizontal e exportação PNG.
- Pontos indefinidos são tratados; o desenho é uma amostragem.

**Roteiro de fala — Lucas Felipe:**

“No módulo de funções, eu posso escrever uma expressão em x, avaliar um ponto e gerar uma tabela. Para x ao quadrado, o valor em dois é quatro. A tabela mostra a simetria: menos dois e dois produzem quatro, enquanto menos um e um produzem um. O gráfico representa essa relação como uma parábola. Podemos ajustar a visualização e exportar a imagem. É importante lembrar que o desenho usa amostras numéricas: ele ajuda a interpretar a função, mas não substitui uma análise matemática completa, especialmente perto de descontinuidades.”

**Demonstração:** usar a tabela escrita; o gráfico será gerado no slide 8 com os campos previamente preparados.

---

## Slide 6 — Matrizes e combinatória

**Responsável:** Vitor de Paiva Cleto<br>
**Tempo estimado:** 55 segundos

**Conteúdo visual:**

```text
A = [1 2]     det(A) = 1×4 − 2×3 = −2
    [3 4]
```

- Matrizes: soma, subtração, produto, escalar, transposta, determinante e inversa.
- Também há traço, posto, escalonamento e sistemas `Ax=B`.
- Combinatória: `5!=120`, `A(5,3)=60`, `C(5,3)=10`.
- Validação de dimensões, singularidade e inteiros; BigInt na combinatória.

**Roteiro de fala — Vitor:**

“Eu sou Vitor. As matrizes permitem organizar dados e representar sistemas lineares. Neste exemplo, o determinante é um vezes quatro menos dois vezes três, portanto menos dois. O módulo também faz as demais operações indicadas e avisa quando as dimensões são incompatíveis ou a matriz não tem inversa. Na combinatória, distinguimos arranjos e combinações: escolher três entre cinco gera sessenta arranjos quando a ordem importa e dez combinações quando ela não importa. O uso de BigInt preserva os resultados inteiros dentro dos limites definidos.”

**Demonstração:** nenhuma neste slide; o determinante será conferido ao vivo no slide 8.

---

## Slide 7 — Cálculo numérico e recursos extras

**Responsáveis:** Bernardo Benízio de Almeida e Caio de Aquino Lima<br>
**Tempo estimado:** 40 segundos, divididos em 20 segundos para cada um

**Conteúdo visual:**

- Para `f(x)=x^2`: `f′(3)=6`, `f″(3)=2` e integral de 0 a 1 igual a `1/3`.
- Derivadas e integrais numéricas são aproximações; Simpson e trapézios disponíveis.
- Complexos: `sqrt(-4)=2i`; estatística: média de `1,2,3` igual a `2`.
- Conversões, finanças, memória, favoritos e histórico.

**Roteiro de fala — Bernardo (20s):**

“No cálculo numérico, aproximamos derivadas e integrais a partir de valores da função. Para x ao quadrado, esperamos primeira derivada seis em três e integral de zero a um próxima de um terço. A interface distingue essas aproximações de resultados simbólicos.”

**Roteiro de fala — Caio (20s):**

“Nos painéis extras, eu também encontro números complexos, estatística, conversões e fórmulas financeiras. A raiz de menos quatro é dois i, e a média de um, dois e três é dois. Memória, favoritos e histórico ajudam a reutilizar os cálculos.”

**Demonstração:** nenhuma; a derivada será calculada na sequência.

---

## Slide 8 — Demonstração prática

**Responsáveis:** Gustavo, Caio, Lucas Felipe, Vitor e Bernardo, nos trechos abaixo<br>
**Tempo estimado:** 85 segundos, com campos preparados antes do início

**Conteúdo visual e ações no sistema:**

| Ordem | Apresentador | Tempo | Ação | Resultado esperado |
|---|---|---|---|---|
| 1 | Gustavo Henrique da Silva Cunha | 10s | Na aba 01, digitar `2+2` e pressionar Enter | `4` |
| 2 | Caio de Aquino Lima | 10s | Substituir a expressão por `sqrt(81)` e pressionar Enter | `9` |
| 3 | Lucas Felipe dos Santos Silva | 15s | Aba 02: conferir `x^2`, x `2`, intervalo `−2` a `2`, passo `1`; clicar em **GERAR TABELA & PLOTAR** | `f(2)=4`, tabela `4,1,0,1,4` e parábola |
| 4 | Vitor de Paiva Cleto | 25s | Aba 03: conferir A=`[[1,2],[3,4]]`; clicar em **det(A)** | `−2` |
| 5 | Bernardo Benízio de Almeida | 20s | Aba 05: conferir `x^2`, x₀ `3`, a `0`, b `1`, Simpson; clicar em calcular | Primeira derivada ≈ `6`, segunda ≈ `2`, integral ≈ `0.3333333333` |
| 6 | Caio de Aquino Lima | 5s | Aba 06: apontar os registros da conta básica e da raiz | `2+2 = 4` e `sqrt(81) = 9` |

**Falas individuais durante os cliques:**

- **Gustavo:** “Começo com dois mais dois: o resultado é quatro.”
- **Caio, raiz:** “Agora, a raiz quadrada de oitenta e um retorna nove.”
- **Lucas Felipe:** “Aqui está x ao quadrado: valor quatro em dois e a parábola esperada.”
- **Vitor:** “Nesta matriz, o determinante calculado é menos dois, como conferimos pela fórmula.”
- **Bernardo:** “A primeira derivada em três se aproxima de seis; a integral se aproxima de um terço.”
- **Caio, histórico:** “As duas contas ficaram registradas no histórico.”

**Demonstração:** seguir a ordem da tabela, incluindo as trocas de aba no tempo de cada trecho. O navegador já estará aberto. Mostrar o histórico, sem acrescentar reutilização ou novas contas para não ultrapassar o tempo. O histórico registra as operações da calculadora; não afirmar que ele registra automaticamente gráficos, matrizes ou derivadas. Todos os trechos ao vivo pertencem exclusivamente aos cinco apresentadores identificados acima.

---

## Slide 9 — Resultados e conclusão

**Responsável:** Gustavo Henrique da Silva Cunha<br>
**Tempo estimado:** 35 segundos

**Conteúdo visual:**

- Validação registrada: **26 testes matemáticos** e **26 testes de interface**, em Chromium e Firefox.
- Seis módulos, temas, armazenamento e recarga offline verificados na revisão.
- Aprendizado: combinar implementação, domínio matemático e conferência de resultados.
- Limites documentados: aproximações numéricas e recursos simbólicos/gráficos ainda futuros.

**Roteiro de fala — Gustavo:**

“Na validação registrada, passaram vinte e seis testes matemáticos e vinte e seis testes de interface, distribuídos entre Chromium e Firefox. Isso inclui os módulos demonstrados e situações de falha no armazenamento. O principal aprendizado é que implementar uma fórmula exige conferir entradas, domínio e resultado. A versão preserva a identidade visual e documenta seus limites, para que aproximações numéricas não sejam confundidas com soluções exatas.”

**Demonstração:** nenhuma; o resumo dos testes e as limitações estão no README.

---

## Slide 10 — Agradecimentos

**Responsável:** Vitor de Paiva Cleto<br>
**Tempo estimado:** 5 segundos

**Conteúdo visual:**

**Obrigado! — Squad Tech Pro**<br>
Professor André Rodrigues e turma de Matemática Computacional.<br>
[Repositório do projeto](https://github.com/vtvpc/Calculadora-Cientifica-A3).

**Roteiro de fala — Vitor:**

“Obrigado, professor André e turma. Estamos à disposição para perguntas.”

**Demonstração:** nenhuma.

---

## Conferência do roteiro e orientações de ensaio

- **Slides:** 10. **Soma:** `35+45+50+50+55+55+40+85+35+5 = 455 segundos = 7min35s`.
- **Demonstração:** `10+10+15+25+20+5 = 85 segundos`; os cliques estão incluídos, não são tempo adicional.
- **Participação oral:** Gustavo `45+10+35=90s`; Bernardo `50+20+20=90s`; Caio `50+20+10+5=85s`; Lucas Felipe `35+55+15=105s`; Vitor `55+25+5=85s`. Total: `455s`.
- A lista oficial mantém os seis integrantes e seus RAs. **Lucas Nery não apresenta nenhum slide, não tem fala e não participa da demonstração ao vivo**; sua contribuição técnica e organizacional está registrada separadamente.
- Ensaiar com cronômetro, campos prontos e somente os exemplos da tabela. Não acrescentar instalação da PWA, execução completa de testes ou outras ferramentas durante o tempo reservado.
- Exemplos matemáticos correspondem aos testes existentes. A revisão do roteiro deve conferir também as ações reais no navegador; resultados numéricos podem variar nos últimos dígitos.
- Se houver falha de projeção, usar as capturas do README como apoio e informar que se trata de uma captura, sem alegar execução ao vivo.
- O PDF acadêmico permanece preservado; as responsabilidades atualizadas de Lucas Nery foram informadas por ele para esta entrega.
