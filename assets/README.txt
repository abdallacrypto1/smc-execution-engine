================================================================
SMC EXECUTION ENGINE — Sistema de Identidade Visual
================================================================

Sistema de wordmark composto por 4 variações que cobrem todos os
casos de uso. Cada uma tem um propósito específico — não use a
errada por economia, vai parecer amador.


----------------------------------------------------------------
PALETA OFICIAL
----------------------------------------------------------------

#030a06   Preto-base       — fundos escuros, texto sobre claro
#00ff64   Verde neon       — primária, accent dot, texto sobre escuro
#f4f4f0   Off-white        — fundo claro padrão (impressão, slides claros)

NUNCA use outras cores. Sem gradiente. Sem brilho. Sem sombra.
A força da marca está na austeridade da paleta.


----------------------------------------------------------------
NAMING CONVENTION
----------------------------------------------------------------

  smc-engine_{numero}_{variante}_{modo}{escala}.{ext}

  numero    01–04, ordem fixa do sistema
  variante  primary-vertical | horizontal-lockup | icon-mark
  modo      dark (verde sobre preto) | light (preto sobre claro)
  escala    @1x / @2x / @4x para PNG (SVG não usa, é vetorial)
            icon-mark usa _256 / _512 / _1024 (formato quadrado)


----------------------------------------------------------------
01 — PRIMARY VERTICAL (DARK)
----------------------------------------------------------------

Arquivos:
  smc-engine_01_primary-vertical_dark.svg
  smc-engine_01_primary-vertical_dark@1x.png   (600w)
  smc-engine_01_primary-vertical_dark@2x.png   (1200w)
  smc-engine_01_primary-vertical_dark@4x.png   (2400w)

Quando usar:
  - Capa de manual em PDF
  - End-screen do YouTube
  - Watermark em screenshots de gráfico (Twitter, Instagram)
  - Capa de relatórios de backtest enviados pra clientes
  - Hero de página de venda (substituindo o "SMC EXECUTION ENGINE"
    empilhado atual da landing)
  - Splash screen / loading
  - Capa de carrossel no Instagram

Quando NÃO usar:
  - Espaços horizontais estreitos (use 02)
  - Tamanhos abaixo de 120px de largura (use 03)
  - Fundos claros (use 04)

Tamanho mínimo:  120px de largura
Clearspace:      altura da letra "S" em todos os lados


----------------------------------------------------------------
02 — HORIZONTAL LOCKUP (DARK)
----------------------------------------------------------------

Arquivos:
  smc-engine_02_horizontal-lockup_dark.svg
  smc-engine_02_horizontal-lockup_dark@1x.png  (600w)
  smc-engine_02_horizontal-lockup_dark@2x.png  (1200w)
  smc-engine_02_horizontal-lockup_dark@4x.png  (2400w)

Quando usar:
  - Header/navbar do site (substitui o título empilhado atual,
    libera espaço vertical e melhora a versão mobile)
  - Assinatura de e-mail
  - Cabeçalho de invoice, contrato ou recibo
  - Rodapé de relatório
  - Banner do canal do YouTube (formato horizontal extremo)
  - Cover de LinkedIn / Twitter / Facebook

Quando NÃO usar:
  - Espaços quadrados ou verticais (use 01 ou 03)
  - Tamanhos abaixo de 200px de largura (perde legibilidade
    do "EXECUTION ENGINE")

Tamanho mínimo:  200px de largura
Clearspace:      altura da letra "S" em todos os lados


----------------------------------------------------------------
03 — ICON MARK (DARK)
----------------------------------------------------------------

Arquivos:
  smc-engine_03_icon-mark_dark.svg
  smc-engine_03_icon-mark_dark_256.png         (avatar / favicon)
  smc-engine_03_icon-mark_dark_512.png         (avatar HD)
  smc-engine_03_icon-mark_dark_1024.png        (avatar 4K, App Store)

Quando usar:
  - Avatar do canal do YouTube
  - Foto de perfil do TradingView
  - Foto de perfil do Instagram, Twitter, LinkedIn
  - Favicon do site (use o _256, ou exporte um .ico do SVG)
  - Ícone do app (caso lance um)
  - Selo/badge em qualquer espaço quadrado pequeno
  - Watermark discreto em screenshots

Quando NÃO usar:
  - Onde houver espaço pra a versão completa (sempre prefira 01 ou 02)
  - Como header principal do site (parece preguiça)

Tamanho mínimo:  28px (favicon padrão)
Clearspace:      metade da altura do "S" em todos os lados
                 (clearspace mais apertado é OK aqui porque
                 o icon mark já é a versão "concentrada")


----------------------------------------------------------------
04 — PRIMARY VERTICAL (LIGHT)
----------------------------------------------------------------

Arquivos:
  smc-engine_04_primary-vertical_light.svg
  smc-engine_04_primary-vertical_light@1x.png  (600w)
  smc-engine_04_primary-vertical_light@2x.png  (1200w)
  smc-engine_04_primary-vertical_light@4x.png  (2400w)

Quando usar:
  - Papel timbrado / contratos impressos
  - Slides em fundo branco (apresentação corporativa)
  - Capa de PDF formal pra cliente institucional
  - Materiais impressos em geral (folders, business cards)
  - Press kit pra revistas/sites de notícia
  - Qualquer fundo claro onde o verde neon não funcionaria

Atenção: o accent dot mantém o verde neon (#00ff64) mesmo na
versão light. Esse é o detalhe que amarra a versão clara ao resto
do sistema. NÃO remova o dot pra "ficar mais limpo" — sem ele a
marca perde a assinatura.

Quando NÃO usar:
  - Fundos escuros (use 01)
  - Espaços horizontais (atualmente não há versão horizontal light;
    se precisar, peça pra eu gerar)

Tamanho mínimo:  120px de largura
Clearspace:      altura da letra "S" em todos os lados


----------------------------------------------------------------
SVG vs PNG — QUAL USAR?
----------------------------------------------------------------

USE O SVG quando:
  - For aplicar em Figma, Illustrator, Photoshop, Canva, etc
  - For editar/customizar (cor, tamanho, layout)
  - For aplicar no código de um site (HTML inline ou <img src>)
  - Quiser qualidade infinita em qualquer escala
  - For imprimir (gráfica sempre prefere vetor)

USE O PNG quando:
  - Precisar de uso rápido sem editor (anexar em e-mail,
    upload direto em rede social, capa de YouTube)
  - A plataforma de destino não aceita SVG
  - Quiser garantir que ninguém vai mexer/quebrar o arquivo

Regra prática: SVG é o source-of-truth, PNG é o derivado.
Se mudar algo, mude no SVG e exporte PNG novo.


----------------------------------------------------------------
TIPOGRAFIA
----------------------------------------------------------------

Os SVGs estão configurados com font-family genérica
(ui-sans-serif e ui-monospace) pra renderização rápida em browser.

Pra produção definitiva, substitua por:

  "SMC"               — Bebas Neue (já no design system da landing)
                        ou Druk, ou JetBrains Mono Bold
  "EXECUTION ENGINE"  — Space Mono (já no design system da landing)
                        ou IBM Plex Mono, ou JetBrains Mono Regular

Mantenha letter-spacing positivo (3 no SMC, 6 no EXECUTION ENGINE
da versão vertical, 3 no horizontal). Esse spacing aberto é parte
da identidade — não comprima.


----------------------------------------------------------------
NOTAS TÉCNICAS
----------------------------------------------------------------

- Os SVGs são "limpos": sem background embutido, transparentes,
  prontos pra você aplicar em qualquer fundo. O background visível
  nos PNGs é renderizado só pra preview/uso direto.

- Os PNGs já vêm com o background apropriado embutido (#030a06
  pros dark, #f4f4f0 pro light) — pronto pra usar.

- Se precisar de PNG com fundo transparente, exporte do SVG no
  Figma/Illustrator com a fonte que você escolheu.

- O accent dot no canto superior direito é o "selo" do sistema.
  Está presente nas 4 variações (incluindo a light, em verde neon).
  Não remova.


----------------------------------------------------------------
PRÓXIMAS VARIAÇÕES POSSÍVEIS (caso precise)
----------------------------------------------------------------

- Horizontal lockup em LIGHT mode (pra header de PDF claro)
- Icon mark em LIGHT mode (pra favicon sobre fundo claro)
- Versão monochrome 100% branca (pra impressão sobre cor sólida)
- Versão monochrome 100% preta (pra impressão B&W)
- Lockup com tagline ("by @abdallacrypto" ou "v3.0")
- Animação de assinatura (logo desenhando-se em SVG animado,
  pra intro de vídeo do YouTube)

É só pedir.
