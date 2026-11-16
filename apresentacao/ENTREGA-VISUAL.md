# Apresentação visual — Calculadora Científica A3

**Squad Tech Pro · 10 slides · 7min35s · widescreen 16:9**

O [roteiro aprovado](apresentacao.md) permanece como fonte das falas, responsabilidades e exemplos. Nenhum código da calculadora ou PDF acadêmico foi alterado nesta entrega.

## Canva oficial

A conta foi conectada pelo plugin oficial Canva. O design foi criado e corrigido por MCP, com textos nativos editáveis e capturas reais da calculadora. Os dez slides foram conferidos pelas prévias retornadas pela integração.

- [Apresentação editável no Canva — link definitivo](https://www.canva.com/design/DAHbGPRwi-o/IQdD9J-uf7H1sjaztFyWLA/edit).
- [Prévia das dez páginas](previa-canva.jpg).

**Correções aprovadas e salvas no Canva**, conforme confirmação do responsável pelo projeto:

- **Slide 1:** montagem defeituosa substituída por captura real da calculadora, com nomes e RAs corretos.
- **Slide 3:** textos corrigidos e reorganizados.
- **Demais slides:** preservados.

Os arquivos locais e a prévia permanecem preservados como entregas da etapa anterior; não foram recriados nem reexportados após essas correções no Canva. O link definitivo acima identifica a versão editável atualizada.

## Arquivos disponíveis

| Arquivo | Uso | Origem e limites |
|---|---|---|
| [HTML animado](apresentacao-animada.html) | Apresentação com navegação manual e notas | Criado localmente; entradas suaves e elementos em sequência |
| [HTML estático](apresentacao-visual.html) | Fonte visual editável e impressão | Texto HTML, CSS, fontes incorporadas e capturas em `recursos/` |
| [PDF](calculadora-a3-visual.pdf) | Consulta e alternativa estática | Dez páginas geradas do HTML local; sem animações |
| [MP4](calculadora-a3-animada.mp4) | Prévia animada com tempos planejados | 455s, 1280×720, H.264, 15fps, sem áudio; gerado localmente |
| [Brief estruturado](brief-visual.json) | Conteúdo, falas aprovadas e rastreabilidade | Fonte integral de cada slide e SHA-256 do roteiro |

O PDF e o MP4 **não são exportações do Canva**. O vídeo mostra os slides e resultados esperados; a demonstração ao vivo deve ser feita na calculadora. As durações são planejadas, sem gravação ou medição das falas dos apresentadores.

Para abrir a versão animada, mantenha a pasta `recursos/` ao lado do HTML. Abra o arquivo em um navegador moderno ou execute `python3 -m http.server 8000` na raiz do projeto (no Windows, `py -m http.server 8000`) e acesse `http://localhost:8000/apresentacao/apresentacao-animada.html`.

**Controles:** setas, PageUp/PageDown e espaço para navegar; Home/End para início/fim; `F` para tela cheia; `N` para mostrar ou ocultar as notas. O avanço é manual, inclusive na demonstração.

## Tempos e participação oral

| Slide | Responsável | Tempo |
|---|---|---:|
| 1 — Abertura | Gustavo | 40s |
| 2 — Introdução e objetivos | Gustavo | 35s |
| 3 — Tecnologias e arquitetura | Bernardo | 50s |
| 4 — Calculadora científica | Caio | 50s |
| 5 — Funções e gráficos | Lucas Felipe | 55s |
| 6 — Versão inicial e matrizes | Vitor | 25s |
| 7 — Cálculo numérico e recursos extras | Bernardo / Caio | 45s |
| 8 — Demonstração prática | Cinco apresentadores | 100s |
| 9 — Resultados e conclusão | Lucas Felipe | 40s |
| 10 — Agradecimentos | Gustavo | 15s |
| **Total** | | **455s / 7min35s** |

Lucas Nery permanece na capa com RA 4261212244 e nas responsabilidades técnicas e de organização, sem fala nem demonstração. Vitor é reconhecido como autor da versão inicial; apresenta 25s no slide 6 e participa por 15s na demonstração. A identificação dos seis integrantes segue o roteiro aprovado.

## Verificações realizadas

- Dez páginas HTML renderizadas em Chromium, com verificação de limites dos elementos e revisão visual.
- Dez páginas do PDF renderizadas e inspecionadas.
- Dez prévias do rascunho Canva inspecionadas; capturas inseridas novamente para corrigir recortes e capa ajustada para evitar sobreposição dos nomes.
- Notas locais comparadas ao conteúdo integral do roteiro aprovado; navegação e acionamento das notas testados no navegador.
- Vídeo verificado com FFprobe: duração exata de 455s, H.264, 1280×720, 15fps, sem áudio; quadros de entrada e conteúdo inspecionados.
- Exemplos visuais: `2+2=4`, `sqrt(81)=9`, `f(x)=x²`, `f(2)=4`, `det([1,2;3,4])=-2`, `f′(3)=6` e integral de `x²` em `[0,1]` igual a `1/3` (aproximações na interface numérica).

## Ajustes manuais no Canva

A integração disponível não expõe comandos para escrever notas, aplicar animações/transições, trocar família tipográfica ou exportar arquivos. Portanto, **nenhuma animação no Canva foi aplicada ou validada** e não foi gerado PPTX.

Para os recursos adicionais ainda não aplicados pela integração:

1. Copie, sem reescrever, o roteiro de fala de cada slide de `apresentacao.md` para as notas do apresentador. A tecla `N` no HTML local já mostra o conteúdo integral correspondente.
2. Para aproximar a tipografia do sistema, selecione Inter nos textos e JetBrains Mono nas fórmulas, caso disponíveis gratuitamente na conta. Não altere nomes e RAs.
3. Aplique uma entrada suave curta aos títulos; revele os nós do diagrama do slide 3, as expressões do slide 4 e as fórmulas do slide 7 em sequência. Use cerca de 0,3–0,5s por entrada quando o editor permitir. Evite efeitos piscantes.
4. Aplique transição de dissolução curta entre páginas, se disponível gratuitamente. Mantenha o avanço manual, especialmente no slide 8. Reproduza a apresentação no editor para conferir os efeitos antes de considerá-los concluídos.
5. Pelo menu de compartilhamento/download do Canva, exporte Microsoft PowerPoint, PDF e MP4 apenas nos formatos disponíveis gratuitamente. Reabra o PPTX para verificar editabilidade, fontes e eventuais efeitos perdidos. PDF é estático; não presuma preservação de animações em PPTX. Não foi validada a exportação manual nesta entrega.

Não foi contratado plano nem utilizado recurso pago.
