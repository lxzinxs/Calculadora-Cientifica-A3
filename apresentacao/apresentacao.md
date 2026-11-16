# Calculadora Científica A3 — apresentação acadêmica

**Equipe:** Squad Tech Pro · **Disciplina:** Matemática Computacional<br>
**Instituição:** Centro Universitário UNA · Contagem<br>
**Professor:** André Rodrigues<br>
**Formato:** roteiro em Markdown, 17 slides · **Duração:** aproximadamente 18 minutos, incluindo 3 minutos de demonstração; reservar até 2 minutos para perguntas.

## Identificação e divisão das falas

Dados acadêmicos conferidos na página 1 do [PDF original da primeira entrega](../1%C2%AA%20Entrega%20%C2%B7%20Squad%20Tech%20%C2%B7%20Matema%CC%81tica%20Computacional.pdf). O documento identifica o grupo como **Squad Tech**; a interface e esta apresentação usam **Squad Tech Pro**. A divisão abaixo é uma proposta para ensaio, não uma atribuição histórica de autoria do código.

| Integrante                      | RA / matrícula no PDF | Slides principais                 | Participação total estimada |
| ------------------------------- | --------------------- | --------------------------------- | --------------------------- |
| Lucas Nery Miranda              | 4261212244            | 1, 5, 16 e trecho do 13           | 3min15s                     |
| Gustavo Henrique da Silva Cunha | 4261214511            | 2, 6, 14 e trecho do 13           | 3min15s                     |
| Caio de Aquino Lima             | 4261211879            | 3, 9, 15 e trecho do 13           | 3min15s                     |
| Bernardo Benízio de Almeida     | 42621691              | 4, 10 e trecho do 13              | 2min45s                     |
| Lucas Felipe dos Santos Silva   | 4261213698            | 7, 11, parte do 17 e trecho do 13 | 2min45s                     |
| Vitor de Paiva Cleto            | 4261214103            | 8, 12, parte do 17 e trecho do 13 | 2min45s                     |

O RA de Bernardo foi transcrito literalmente, apesar de ter menos dígitos. O PDF registra “Caio de aquino lima”; aqui apenas a capitalização foi normalizada. Não há alteração dos dados no documento original.

## Preparação para a apresentação

- Executar o servidor local conforme o [README](../README.md) e abrir `http://localhost:8000`.
- Manter o modo **RAD** nos exemplos, salvo indicação explícita de DEG.
- Esperar a mensagem **NÚCLEO DISPONÍVEL OFFLINE** antes de demonstrar ausência de rede.
- Abrir cada aba uma vez, conferir os dados e ensaiar as trocas de apresentador.
- Usar ponto para casas decimais. Não depender de internet para fontes, ícones ou motor: esses recursos são locais.
- Os comandos `npm test` e `npm run test:browser` reproduzem a validação descrita no README. Executá-los antes da aula se o código tiver mudado.

---

## Slide 1 — Capa

**Responsável:** Lucas Nery Miranda<br>
**Tempo estimado:** 45 segundos

**Conteúdo visual:**

**Calculadora Científica A3**<br>
Squad Tech Pro · Matemática Computacional<br>
Centro Universitário UNA · Contagem · Prof. André Rodrigues

| Integrante                      | RA         |
| ------------------------------- | ---------- |
| Lucas Nery Miranda              | 4261212244 |
| Gustavo Henrique da Silva Cunha | 4261214511 |
| Caio de Aquino Lima             | 4261211879 |
| Bernardo Benízio de Almeida     | 42621691   |
| Lucas Felipe dos Santos Silva   | 4261213698 |
| Vitor de Paiva Cleto            | 4261214103 |

**Roteiro de fala:**

“Boa noite. Eu sou Lucas Nery Miranda e vou apresentar, com a equipe Squad Tech Pro, a Calculadora Científica A3. Nosso projeto integra conteúdos de Matemática Computacional em uma aplicação web. Além das operações científicas, reunimos funções, gráficos, matrizes, combinatória e cálculo numérico. Durante a apresentação, vamos explicar a organização do sistema e conferir exemplos na própria calculadora.”

**Demonstração:** deixar a tela principal aberta, com tema escuro e sem resultados antigos no display.

---

## Slide 2 — Introdução

**Responsável:** Gustavo Henrique da Silva Cunha<br>
**Tempo estimado:** 45 segundos

**Conteúdo visual:**

- Ferramenta web para calcular e explorar conceitos matemáticos.
- Uma expressão pode gerar resultado, tabela ou gráfico.
- Organização por seis módulos e ferramentas avançadas recolhíveis.
- Resultados acompanhados de validação e mensagens específicas.

**Roteiro de fala:**

“Eu sou Gustavo Henrique. Uma calculadora científica trabalha com operações que vão além das quatro operações básicas, como potências, raízes e trigonometria. Aqui, a proposta é reunir essas operações com ferramentas que usamos na disciplina. Por exemplo, podemos calcular um valor de uma função e depois observar o seu gráfico. O problema que buscamos resolver é a fragmentação dessas atividades em ferramentas diferentes, mantendo uma interface acessível no navegador.”

**Demonstração:** indicar brevemente as seis abas, sem executar cálculos nesta etapa.

---

## Slide 3 — Objetivos

**Responsável:** Caio de Aquino Lima<br>
**Tempo estimado:** 45 segundos

**Conteúdo visual:**

| Dimensão    | Objetivo                                                         |
| ----------- | ---------------------------------------------------------------- |
| Acadêmica   | Relacionar conceitos da disciplina a implementações verificáveis |
| Matemática  | Respeitar precedência, domínios e limites numéricos              |
| Tecnológica | Integrar interface, motor, armazenamento e testes                |
| Uso         | Preservar a identidade Cyberpunk Neon e facilitar a navegação    |

**Roteiro de fala:**

“Eu sou Caio de Aquino Lima. Nosso objetivo acadêmico é tornar os conceitos da disciplina observáveis em uma aplicação. No aspecto matemático, precisamos respeitar regras de precedência e distinguir uma resposta válida de uma entrada incompleta. No aspecto tecnológico, a interface e os módulos devem compartilhar regras de avaliação. Também queremos que uma falha no armazenamento do navegador não impeça uma conta correta. Os testes com resultados conhecidos ajudam a verificar esses objetivos.”

**Demonstração:** nenhuma; apresentar os critérios de qualidade que serão retomados no slide 15.

---

## Slide 4 — Tecnologias

**Responsável:** Bernardo Benízio de Almeida<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

- **HTML5:** estrutura, campos, botões e seis módulos.
- **CSS3 e Tailwind CSS compilado:** layout responsivo, temas e efeitos neon.
- **JavaScript:** eventos, validação e integração dos cálculos.
- **Math.js:** expressões matemáticas, complexos, unidades e álgebra linear.
- **Canvas, localStorage e PWA:** gráficos, persistência e cache offline.
- **Node.js e Playwright:** testes do motor e da interface.

**Roteiro de fala:**

“Eu sou Bernardo Benízio. O HTML organiza os elementos que o usuário vê e utiliza. O CSS e o Tailwind definem o layout e preservam os efeitos visuais originais. O JavaScript conecta os botões às operações. Para os cálculos, usamos Math.js, com uma camada própria que restringe as expressões aceitas. O Canvas desenha os gráficos. O armazenamento local guarda histórico e preferências quando está disponível. Por fim, o service worker mantém os recursos necessários em cache para uso offline após o primeiro carregamento.”

**Demonstração:** mostrar a lista de arquivos no README, se necessário; não abrir código extenso durante a fala.

---

## Slide 5 — Arquitetura

**Responsável:** Lucas Nery Miranda<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

```text
Entrada e botões → validação da árvore matemática → motor Math.js
                                         ↓
             resultados / matrizes / funções / cálculo numérico
                         ↓                         ↓
                   display e histórico        tabela e Canvas
```

- `math-engine.js`: funções permitidas, tipos e limites.
- Arquivos próprios para gráficos, matrizes, combinatória e cálculo.
- `storage.js`: persistência tolerante a falhas e exibição segura.

**Roteiro de fala:**

“Vou explicar o caminho de uma expressão. Primeiro, o sistema recebe o texto digitado ou os botões pressionados. Em seguida, o motor analisa a árvore da expressão e aceita somente os elementos previstos. A expressão é calculada e o resultado segue para o display ou para o módulo correspondente. O histórico é uma etapa separada: se não puder ser salvo, o cálculo continua válido. Gráficos e cálculo numérico usam o mesmo mecanismo, mas exigem resultados reais e finitos nos pontos avaliados.”

**Demonstração:** usar o diagrama; mencionar que atribuições, acesso a propriedades e execução arbitrária não são sintaxe da calculadora.

---

## Slide 6 — Calculadora científica

**Responsável:** Gustavo Henrique da Silva Cunha<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

| Expressão          | Resultado |
| ------------------ | --------- |
| `2+2`              | `4`       |
| `(5+3)*2`          | `16`      |
| `sqrt(81)`         | `9`       |
| `5!`               | `120`     |
| `log(100)`         | `2`       |
| `ln(e)`            | `1`       |
| `sin(pi/2)` em RAD | `1`       |

**Roteiro de fala:**

“A calculadora aceita tanto o teclado virtual quanto uma expressão digitada. Os parênteses e a precedência dos operadores são respeitados. Neste sistema, log sem base significa base dez, e ln significa logaritmo natural. A trigonometria começa em radianos, com opção de graus. Também definimos a porcentagem de forma explícita: dez por cento é 0,1, portanto duzentos vezes dez por cento resulta em vinte. Uma entrada incompleta recebe uma mensagem, e o usuário pode corrigi-la sem perder a expressão.”

**Demonstração:** se houver tempo, mostrar `log(100)=2` e a seleção RAD/DEG; reservar a sequência principal para o slide 13.

---

## Slide 7 — Funções e gráficos

**Responsável:** Lucas Felipe dos Santos Silva<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

- Entrada `f(x)=x^2`; avaliação em `x=2` produz `4`.
- Tabela de `−2` a `2`, passo `1`: `4, 1, 0, 1, 4`.
- Canvas desenha amostras da função.
- Zoom, movimentação horizontal e exportação PNG.
- Até quatro funções separadas por `;`; tabela da primeira.

**Roteiro de fala:**

“Eu sou Lucas Felipe. No módulo de funções, escrevemos uma expressão usando x. O sistema pode avaliá-la em um ponto, gerar uma tabela e desenhar o gráfico. Para x ao quadrado, esperamos uma parábola e valores simétricos em torno do zero. O desenho é produzido por amostragem numérica; ele não é uma prova de todas as propriedades da função. Em pontos como zero na função um sobre x, o sistema apresenta valor indefinido e evita conectar amostras através de lacunas detectadas.”

**Demonstração:** abrir **02//FUNÇÕES & GRÁFICO**, informar `x^2`, x `2`, mínimo `-2`, máximo `2`, passo `1`; atualizar e conferir os cinco pares.

---

## Slide 8 — Matrizes e álgebra

**Responsável:** Vitor de Paiva Cleto<br>
**Tempo estimado:** 1min15s

**Conteúdo visual:**

```text
A = [1 2]   B = [5 6]   A+B = [ 6  8]   A×B = [19 22]
    [3 4]       [7 8]         [10 12]         [43 50]
```

- `det(A)=−2`; inversa `[[−2,1],[1.5,−0.5]]`.
- Soma, subtração, escalar, produto, transposta e inversa.
- Traço, posto, escalonamento e sistemas `Ax=B`.
- Campos de 1×1 até 12×12; validação de dimensões e singularidade.

**Roteiro de fala:**

“Eu sou Vitor de Paiva. As matrizes representam dados e transformações e também permitem resolver sistemas lineares. A soma combina elementos da mesma posição, enquanto o produto usa linhas de A e colunas de B. Por isso, as dimensões precisam ser compatíveis. Para a matriz deste exemplo, o determinante é menos dois, então ela tem inversa. Uma matriz singular não pode ser invertida e recebe uma mensagem. Também ampliamos o módulo com traço, posto, escalonamento e solução de sistemas com uma coluna de termos independentes.”

**Demonstração:** preencher A com `1,2;3,4`, calcular determinante e comparar com `−2`; a soma será repetida na demonstração integrada.

---

## Slide 9 — Combinatória e estatística

**Responsável:** Caio de Aquino Lima<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

| Exemplo                                    | Resultado |
| ------------------------------------------ | --------- |
| Fatorial de 5                              | `120`     |
| Arranjo A(5,3)                             | `60`      |
| Combinação C(5,3)                          | `10`      |
| Permutação de 5 com grupos repetidos 2 e 2 | `30`      |
| Média de `1,2,3`                           | `2`       |
| Variância amostral de `1,2,3`              | `1`       |

Estatística inclui mediana, moda, quartis, desvios, pesos, covariância e regressão linear.

**Roteiro de fala:**

“Na combinatória, a diferença entre arranjo e combinação é considerar ou não a ordem dos elementos escolhidos. Para escolher três entre cinco, temos dez combinações e sessenta arranjos. O módulo usa BigInt para preservar inteiros exatos nos limites definidos. Na estatística, podemos fornecer uma lista de dados e obter medidas descritivas. É importante distinguir a variância populacional, que divide por n, da amostral, que divide por n menos um. Quando fornecemos duas listas, o painel também calcula correlação e regressão linear.”

**Demonstração:** indicar o módulo 04 e o painel **ESTATÍSTICA** na calculadora; usar `1,2,3` se houver tempo.

---

## Slide 10 — Cálculo numérico

**Responsável:** Bernardo Benízio de Almeida<br>
**Tempo estimado:** 1min15s

**Conteúdo visual:**

Para `f(x)=x^2`:

- `f′(3)=6`; `f″(3)=2`.
- Integral definida de 0 a 1: `1/3 ≈ 0.3333333333`.
- Diferenças finitas para as duas derivadas.
- Integração por Simpson ou trapézios, com 1000 subdivisões.
- Bisseção, Newton e secante para raízes.
- Derivada simbólica disponível em RAD: `2*x`.

**Roteiro de fala:**

“No cálculo numérico, aproximamos a derivada observando valores próximos de um ponto. Para x ao quadrado em três, a primeira derivada deve ser seis e a segunda deve ser dois. Para a integral, o sistema divide o intervalo em partes e utiliza Simpson ou trapézios. Esses resultados são aproximações e dependem da função e da discretização. Não tratamos uma aproximação como uma integral simbólica exata. Também oferecemos métodos para encontrar raízes, com limite de iterações e mensagem quando não ocorre convergência.”

**Demonstração:** preparar `x^2`, x₀ `3`, a `0`, b `1`; explicar os valores antes de executar no slide 13.

---

## Slide 11 — Funcionalidades adicionais

**Responsável:** Lucas Felipe dos Santos Silva<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

| Área          | Exemplo validado                                      |
| ------------- | ----------------------------------------------------- |
| Complexos     | `sqrt(-4) = 2i`                                       |
| Unidades      | `to(unit(0,"degC"),"degF") = 32 degF`                 |
| Bases         | Decimal `255` → hexadecimal `FF`                      |
| Finanças      | `compoundInterest(1000,0.1,2) = 1210`                 |
| Probabilidade | `binomial(10,3,0.5) = 0.1171875`                      |
| Uso diário    | Ans, M+/M−/MR/MC, favoritos e exportação do histórico |

**Roteiro de fala:**

“As ferramentas adicionais ficam em painéis recolhíveis para manter o teclado principal simples. Os números complexos permitem, por exemplo, representar a raiz quadrada de menos quatro como dois i. Nas conversões, verificamos a compatibilidade das unidades. A conversão de bases usa inteiros exatos. As funções financeiras trabalham com taxas decimais e períodos consistentes; são simulações matemáticas. O catálogo também oferece exemplos de probabilidade e permite localizar uma função pela busca.”

**Demonstração:** mostrar a busca do catálogo e o exemplo de conversão de bases; evitar percorrer todos os exemplos ao vivo.

---

## Slide 12 — Interface do sistema

**Responsável:** Vitor de Paiva Cleto<br>
**Tempo estimado:** 45 segundos

**Conteúdo visual:**

- Cyberpunk Neon: ciano, magenta, vermelho e efeitos de brilho originais.
- Temas claro e escuro com preferência persistida quando possível.
- Seis abas principais preservadas.
- Recursos avançados em painéis expansíveis.
- Layout responsivo e recursos locais para uso offline.

**Roteiro de fala:**

“A identidade visual original foi preservada: os painéis, as cores e os efeitos neon continuam reconhecíveis. O usuário pode alternar entre os temas claro e escuro. As seis abas mantêm a divisão principal do sistema, enquanto as ferramentas novas ficam recolhidas até serem necessárias. Em telas menores, os painéis se reorganizam e a navegação pode ser rolada horizontalmente. A instalação como PWA depende do suporte do navegador e de uma origem segura.”

**Demonstração:** alternar o tema e voltar ao escuro; indicar um painel recolhível.

---

## Slide 13 — Demonstração prática integrada

**Responsáveis:** todos, em seis trechos de aproximadamente 30 segundos<br>
**Tempo estimado:** 3 minutos

**Conteúdo visual:** roteiro e resultados de referência.

| Trecho | Responsável                     | Ações no sistema                                                               | Resultado esperado                                        |
| ------ | ------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| 1      | Lucas Nery Miranda              | Abrir `http://localhost:8000`, aba 01, limpar com C; digitar `2+2` e Enter     | `4`                                                       |
| 2      | Gustavo Henrique da Silva Cunha | Calcular `sqrt(81)` e depois `ln(e)`                                           | `9` e `1`                                                 |
| 3      | Lucas Felipe dos Santos Silva   | Aba 02: `x^2`, x `2`, intervalo `−2` a `2`, passo `1`; atualizar               | `f(2)=4`; tabela `4,1,0,1,4`; parábola                    |
| 4      | Vitor de Paiva Cleto            | Aba 03, ambas 2×2: A=`[[1,2],[3,4]]`, B=`[[5,6],[7,8]]`; A+B e det(A)          | `[[6,8],[10,12]]` e `−2`                                  |
| 5      | Bernardo Benízio de Almeida     | Aba 05: `x^2`, x₀ `3`, a `0`, b `1`, Simpson; calcular                         | Derivadas ≈ `6` e `2`; integral ≈ `0.3333333333`          |
| 6      | Caio de Aquino Lima             | Aba 06, localizar `2+2` e `ln(e)`; reutilizar `2+2` pelo botão ↶; pressionar = | Registros corretos; retorno à calculadora e resultado `4` |

**Roteiro de fala:**

**Lucas Nery:** “Vou abrir a calculadora e começar pela operação mais simples. Ao calcular dois mais dois, o resultado é quatro. Esse caso também verifica o funcionamento básico do display e dos eventos.”

**Gustavo:** “Agora eu verifico duas operações científicas. A raiz quadrada de oitenta e um é nove. O logaritmo natural da constante e é um, um dos casos que usamos na regressão dos erros corrigidos.”

**Lucas Felipe:** “Vou representar x ao quadrado. A avaliação em dois retorna quatro. A tabela mostra valores simétricos e o gráfico apresenta a parábola esperada.”

**Vitor:** “Nas matrizes, somo os elementos correspondentes e obtenho seis, oito, dez e doze. O determinante de A deve ser menos dois.”

**Bernardo:** “Para a mesma função x ao quadrado, verifico a derivada em três e a integral de zero a um. Os resultados se aproximam de seis, dois e um terço.”

**Caio:** “Para concluir a sequência, mostro que as operações da calculadora foram registradas. Vou reutilizar dois mais dois. A expressão volta para o campo e pode ser calculada novamente.”

**Demonstração:** seguir a tabela na ordem. O histórico registra operações da calculadora; não afirmar que gráficos ou matrizes geram registros automaticamente. Para as aproximações, aceitar pequenas diferenças nos últimos dígitos. Se o projetor falhar, usar os exemplos e as capturas do README como apoio, sem alegar execução ao vivo.

---

## Slide 14 — Desafios do desenvolvimento

**Responsável:** Gustavo Henrique da Silva Cunha<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:** problemas reproduzidos durante a revisão técnica.

| Problema observado                                   | Correção aplicada                                    |
| ---------------------------------------------------- | ---------------------------------------------------- |
| `style.css` e `script.js` retornavam 404 no Linux    | Nomes e referências padronizados em minúsculas       |
| `ln(e)` virava uma expressão inválida                | Substituição do avaliador baseado em trocas de texto |
| Falha no armazenamento fazia `2+2` exibir ERRO       | Separação entre avaliação e persistência             |
| Fatorial decimal era truncado                        | Validação explícita de inteiro não negativo          |
| Continuação de resultado complexo perdia precedência | Agrupamento do resultado antes do operador           |

**Roteiro de fala:**

“Os desafios que apresento aqui foram reproduzidos na revisão técnica do projeto. Em sistemas que diferenciam maiúsculas de minúsculas, os nomes dos arquivos impediam o carregamento dos recursos. O avaliador também transformava o logaritmo natural em uma chamada inválida. Outro erro era confundir falha no histórico com falha matemática: uma conta correta podia terminar com a mensagem ERRO se o armazenamento falhasse. A correção separou essas responsabilidades e acrescentou testes específicos. Não estamos atribuindo esses problemas a integrantes individuais.”

**Demonstração:** usar os exemplos documentados; não reintroduzir os defeitos no sistema funcionando.

---

## Slide 15 — Resultados alcançados

**Responsável:** Caio de Aquino Lima<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

- Quinze expressões matemáticas obrigatórias verificadas no motor e na interface.
- Testes para os seis módulos e os exemplos do catálogo.
- Histórico corrompido/bloqueado, memória, temas, viewport móvel e recarga offline verificados.
- Entradas inválidas recebem mensagens; valores não finitos são rejeitados.
- Documentação separa funcionalidades disponíveis de expansões futuras.

**Roteiro de fala:**

“Os resultados são sustentados por testes com respostas conhecidas. As quinze expressões obrigatórias incluem operações básicas, raízes, logaritmos, trigonometria e fatorial. Também verificamos o comportamento da interface e condições como armazenamento indisponível. O uso offline foi testado recarregando a página sem rede, depois de preparar o cache. Isso não significa que qualquer navegador ou sistema operacional foi testado fisicamente. Os ambientes efetivamente executados e os limites estão registrados no README. Integração simbólica geral e gráficos tridimensionais, por exemplo, continuam fora desta versão.”

**Demonstração:** mostrar o resumo dos testes executados no terminal ou README; evitar repetir toda a bateria durante a aula.

---

## Slide 16 — Conclusão

**Responsável:** Lucas Nery Miranda<br>
**Tempo estimado:** 1 minuto

**Conteúdo visual:**

- Matemática computacional exige modelo, implementação e verificação.
- Uma interface correta precisa informar domínios e aproximações.
- O motor central facilita a integração dos módulos.
- Próximos passos: métodos adaptativos, mais recursos simbólicos e gráficos especializados.

**Roteiro de fala:**

“A principal conclusão é que transformar uma fórmula em software exige mais do que escrever a operação. Precisamos definir a entrada, conhecer o domínio e conferir a saída. Ao relacionar expressões, matrizes, gráficos e métodos numéricos, conseguimos observar como conteúdos da disciplina se conectam. O projeto também nos permite discutir a diferença entre um resultado exato e uma aproximação. Como continuidade, propomos métodos numéricos adaptativos e ferramentas simbólicas adicionais, sempre acompanhados de testes e sem abandonar a identidade visual do sistema.”

**Demonstração:** voltar à tela inicial, com um resultado correto no display.

---

## Slide 17 — Agradecimentos

**Responsáveis:** Lucas Felipe dos Santos Silva e Vitor de Paiva Cleto<br>
**Tempo estimado:** 30 segundos, 15 segundos para cada um

**Conteúdo visual:**

**Obrigado!**<br>
Squad Tech Pro · Calculadora Científica A3<br>
Agradecimentos ao professor André Rodrigues e à turma de Matemática Computacional.<br>
Código, instruções e testes: [vtvpc/Calculadora-Cientifica-A3](https://github.com/vtvpc/Calculadora-Cientifica-A3).

**Roteiro de fala:**

**Lucas Felipe:** “Eu agradeço ao professor André Rodrigues e à turma pela atenção. Esperamos que os exemplos tenham mostrado como os conteúdos matemáticos podem ser aplicados em uma ferramenta interativa.”

**Vitor:** “Eu agradeço em nome da Squad Tech Pro. O repositório reúne o código, as instruções e os testes para que os resultados possam ser reproduzidos. Estamos à disposição para perguntas e sugestões.”

**Demonstração:** manter o endereço do repositório visível para consulta.

---

## Notas para ensaio e conferência

- Tempo dos slides: `45+45+45+60+60+60+60+75+60+75+60+45+180+60+60+60+30 = 1080 segundos`, ou **18 minutos**.
- A participação de cada integrante inclui sua passagem no slide 13. O slide 17 é compartilhado.
- A identificação acadêmica tem como fonte o PDF original, preservado. Os perfis GitHub de todos os integrantes não foram confirmados; isso não impede a divisão nominal das falas.
- As falas sobre arquitetura e correções descrevem o código entregue e problemas reproduzidos. A equipe pode ajustar expressões pessoais após ensaio, sem atribuir experiências não documentadas a integrantes específicos.
- Limites numéricos e funções futuras devem ser consultados no README antes de adicionar qualquer demonstração ao roteiro.
