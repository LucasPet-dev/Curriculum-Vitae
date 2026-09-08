# SDD — Nova Identidade Visual do Contato (Cabana por Dentro + Personagem 8-bit)

> Especificação para revisão ANTES da execução. Nenhum código do site será
> alterado nesta rodada.
>
> Regra final: ao concluir e validar a última etapa, apagar este arquivo
> (`SDD_CONTATO_VISUAL.md`) do projeto.

## 0. Escopo

1. Substituir a foto de perfil atual (`assets/images/EU MESMO.png`) pela nova
   imagem pixel art (`Eu 8bit.png`) no **Hero** e na página de **Contato**.
2. Transformar a página de Contato (`contato.html`): o fundo passa a ser o
   ambiente interno da cabana (`CABANA FUNDO.png`), com o personagem em pé à
   esquerda e o card de contato sobreposto à direita.

## 1. Análise visual da referência

> Observação: a imagem de composição final não estava disponível em arquivo
> para inspeção direta; a análise abaixo combina a descrição fornecida
> ("cabana por dentro, personagem em pé à esquerda, card de contato
> sobreposto à direita") com a inspeção real dos dois ativos enviados.

### 1.1 `Eu 8bit.png` (personagem — 1024×1536, RGBA, ~2:3 retrato)
- Pixel art de corpo inteiro, em pé, levemente de perfil, segurando um
  notebook com adesivos (.NET, GitHub, VS Code, C#) — reforça a identidade
  dev do site.
- Fundo transparente (alpha), com um brilho dourado quente "assado" na
  imagem ao redor da cabeça/ombros — ou seja, a imagem já carrega a própria
  iluminação; o efeito de raios do site pode conflitar visualmente com ela
  (ver Riscos).
- Paleta: pretos/cinzas da roupa + pele + brilho âmbar — combina com as
  variáveis de cor já existentes (marrom, dourado, verde-escuro).

### 1.2 `CABANA FUNDO.png` (fundo — 1565×1005, RGB, ~1,56:1 paisagem)
- Interior da cabana A-frame em pixel art: paredes de madeira inclinadas,
  mezanino com escada ao centro, cozinha à direita (bancada, banquetas,
  luminária pendente), sofá à esquerda em primeiro plano, janela triangular
  no topo central.
- Paleta inteiramente âmbar/marrom/mel — coesa com o tema "floresta/cabana"
  do site, mas **bem mais clara e detalhada** que o fundo atual (degradê
  verde-escuro quase preto). Isso exige tratamento de contraste no card
  (ver Riscos).
- Composição lateral naturalmente "desejada": sofá (esq) e cozinha (dir)
  emolduram a cena; o centro é mais limpo — piso e escada.
- Sem canal alpha; imagem pesada por natureza (foto/pixel art detalhada) —
  ponto de atenção de performance (ver Riscos).

### 1.3 Composição final esperada
- Fundo: cabana por dentro cobrindo toda a viewport (`cover`).
- Personagem em pé à esquerda, "pisando" na base da viewport (pés alinhados
  ao chão da cena, ou seja, ancorado em `flex-end`/bottom, não centralizado
  verticalmente), ocupando a maior parte da altura visível.
- Card de contato à direita, sobreposto ao fundo, com transparência/
  escurecimento suficiente para manter a leitura sobre madeira clara.
- Hierarquia: card é o foco funcional (texto + botões); o personagem é
  presença visual — proporção aproximada de 40/60 (personagem/card) na
  largura em desktop, sem que o personagem corte o card.

## 2. Inventário do que já existe

### 2.1 Arquivos
| Arquivo | Situação | Ação |
|---|---|---|
| `assets/images/EU MESMO.png` (1024×1536, ~1,6 MB) | Foto atual, usada 2× | **Remover** após a troca |
| `Eu 8bit.png` (raiz, fora de `assets/`) | Novo personagem | Mover para `assets/images/` |
| `CABANA FUNDO.png` (raiz, fora de `assets/`) | Novo fundo | Mover para `assets/images/` |
| Referências em `index.html` (`.hero-foto`) e `contato.html` (`.contato-foto`) | Apontam para `EU MESMO.png` | Atualizar `src` |
| Referência no Hero (`width/height` 227×340) | Proporção da foto antiga | Revisar atributos (nova img é 2:3 também, proporcionalmente igual) |

Decisão de nomenclatura: renomear ao mover para evitar espaços/emojis em
URL → `assets/images/eu-8bit.png` e `assets/images/cabana-fundo.png`
(caso a preferência seja manter o estilo atual com espaços, basta ajustar;
URL com espaço funciona, mas precisa de cuidado em CSS — `url()` aceita).

### 2.2 Código a remover/substituir
- `index.html`: `src="assets/images/EU MESMO.png"` → `src="assets/images/eu-8bit.png"`.
- `contato.html`: `src="assets/images/EU MESMO.png"` → `src="assets/images/eu-8bit.png"`.
- `css/style.css` `.pagina-contato` (linhas ~929-937): hoje é
  `background: linear-gradient(...)` — substituir por `background-image` da
  cabana + overlay escuro.
- Possível remoção do `.foto-raios` no **Contato** (o personagem já tem
  brilho assado na imagem). No **Hero**, o efeito de luz sobre a floresta
  deve ser **preservado** (faz parte da identidade do Hero e a foto nova
  continuará "solta" na cena).
- Regras `.foto-luz-contato` / `.contato-foto` (CSS ~337-372): hoje a foto
  estica junto com o card (`align-self: stretch`); na nova composição o
  personagem precisa **ancorar na base** e não depender da altura do card
  (evita o personagem "flutuando" quando o card for baixo).

### 2.3 O que preservar (não tocar)
- Estrutura e conteúdo do card: `h1`, `contato-intro`, lista
  (`contato-lista`/`contato-rotulo`), botões `btn-cv` (EN/PT) e `btn-voltar`.
- Seletor de idioma e todo o sistema i18n (nenhuma chave nova necessária;
  `foto.alt` já existe — só revisar texto se quisermos mencionar "pixel
  art", opcional).
- Hero: layout, efeito `.foto-luz`/`.foto-raios`, textos.
- Restrições do projeto: HTML/CSS/JS puro, sem libs/CDN,
  `prefers-reduced-motion`, i18n sem texto hardcoded.

## 3. Decisões técnicas propostas

### 3.1 Troca da foto (Hero + Contato)
- Mover `Eu 8bit.png` → `assets/images/eu-8bit.png` e atualizar os dois
  `src`. Manter `data-i18n-alt="foto.alt"`.
- Ajustar `width`/`height` declarados no HTML para a proporção real (2:3 —
  ex.: 227×340 já é 2:3, pode manter) para evitar layout shift.
- Remover `assets/images/EU MESMO.png` do projeto.

### 3.2 Fundo da página de Contato
- Mover `CABANA FUNDO.png` → `assets/images/cabana-fundo.png`.
- `.pagina-contato`:
  ```css
  background: url("../assets/images/cabana-fundo.png") center / cover no-repeat #050d08;
  ```
  (cor sólida de fallback + `cover` para cobrir qualquer viewport; `center`
  mantém escada/janela visíveis.)
- Overlay de escurecimento via pseudo-elemento (`::before`) com
  `background: rgba(5, 13, 8, 0.45)` (valor a calibrar na Etapa 6) para
  garantir contraste sem esconder a cena. `position: relative` no elemento
  e `z-index` para conteúdo acima do overlay.

### 3.3 Composição personagem + card
- `.contato-wrapper`: manter `display: flex; align-items: flex-end`
  (personagem e card ancorados na base), `justify-content: space-between`
  (ou `center` com gap), `position: relative; z-index: 1` (acima do overlay).
- Personagem (`.contato-foto`):
  - `height: clamp(320px, 72vh, 640px)`; `width: auto;`
  - `object-fit: contain; object-position: bottom` → pés sempre na base;
  - manter `filter: drop-shadow(...)` (sombra pixel dura, já existente);
  - remover o vínculo de altura com o card (`align-self: stretch` sai).
- Card (`.contato-caixa`):
  - Fundo `rgba(11, 31, 20, 0.88)` (era 0.96) + manter borda `marrom` e
    sombra pixel — transparência leve deixa o fundo "participar" sem
    prejudicar a leitura; calibrar na Etapa 6.
  - Manter `max-width: 560px`.
- Sem posicionamento absoluto: flexbox resolve e mantém o fluxo/altura
  automáticos (mais simples, sem magic numbers).

### 3.4 Responsividade (mobile ≤600px)
- Manter o empilhamento atual (`.contato-wrapper` vira `column`): personagem
  acima, card abaixo.
- Personagem com `height: clamp(240px, 38vh, 320px)` no mobile e
  `align-self: center` (não há "chão" claro em retrato; centralizar).
- Fundo: `background-position: center` continua funcionando; se a cozinha
  (direita) "sumir" demais em telas estreitas, avaliar `background-position:
  60% center` para valorizar a escada/janela.

### 3.5 Performance
- Otimizar as imagens ao mover (reduzir com `pngquant`/`oxipng` ou exportar
  `cabana-fundo` em JPG/WebP q80 — pixel art aceita bem; meta: fundo ≤ 400
  KB). **Decisão pendente de aprovação**: converter para `.webp/.jpg` muda
  o nome/extensão referenciado — se preferir manter PNG puro, aplicar só
  compressão lossless.
- `loading="eager"` no fundo (é CSS, não há lazy nativo) — aceitável, a
  página de contato é separada e leve.

## 4. Riscos e pontos de atenção

1. **Legibilidade do card sobre fundo claro/detalhado** — madeira âmbar
   clara tem contraste baixo com texto claro. Mitigação: overlay escuro
   global (::before) + card semi-opaco escuro; validar contraste na Etapa 6.
2. **Brilho "assado" na imagem do personagem × efeito `.foto-raios`** — no
   Contato, sobrepor os dois raios (CSS) + glow (PNG) pode ficar "duplo".
   Proposta: remover `.foto-raios` **apenas no Contato** e manter no Hero
   (onde o fundo é floresta e o efeito é identidade). Revalidar no Hero se o
   glow assado da imagem nova conflita com os raios — se sim, ajustar
   opacidade dos raios sem remover.
3. **Escala do personagem em telas menores** — `clamp()` + `vh` para não
   estourar viewport nem sumir; testar 360px de largura.
4. **Peso das imagens** — `Eu 8bit.png` e `CABANA FUNDO.png` são PNG
   grandes; sem otimização, o primeiro carregamento do Contato fica lento.
   Etapa dedicada de otimização (3.5).
5. **Nomes de arquivo com espaço** — padronizar kebab-case ao mover
   (`eu-8bit.png`, `cabana-fundo.png`) para evitar URL-encoded frágil.
6. **Não quebrar o que existe** — Hero, i18n (incl. `foto.alt` nos 3
   idiomas), botões de CV, seletor de idioma, animações e
   `prefers-reduced-motion` precisam continuar funcionais; regressão
   verificada na etapa final.
7. **`cover` pode cortar elementos da cena** — em viewports muito altos/
   estreitos, sofá ou cozinha podem sair de quadro; aceitável esteticamente,
   mas revisar posicionamento (`center` vs `bottom center`).

## 5. Plano de execução em etapas

| # | Etapa | Critério de conclusão |
|---|---|---|
| 1 | Mover e renomear os ativos (`eu-8bit.png`, `cabana-fundo.png` para `assets/images/`) e otimizar | Arquivos no lugar, nomes finais definidos, tamanho do fundo reduzido (meta ≤400 KB ou formato aprovado) |
| 2 | Trocar a foto no Hero e no Contato; remover `EU MESMO.png` | Ambas as páginas exibem o personagem 8-bit; nenhuma referência à imagem antiga resta no código |
| 3 | Aplicar `cabana-fundo.png` como fundo de `.pagina-contato` + overlay escuro | Fundo da cabana cobre a página inteira; conteúdo acima do overlay |
| 4 | Posicionar personagem à esquerda ancorado na base e card à direita; ajustar transparência/borda do card; remover `.foto-raios` do Contato | Composição fiel à referência: personagem "no chão", card legível à direita |
| 5 | Responsividade mobile (empilhar, escala do personagem, position do fundo) | Em ≤600px: nada quebra, nada sai da tela, leitura preservada; testar 360px e 768px |
| 6 | Revisão final comparando com a composição de referência + regressão (i18n 3 idiomas, botões CV, voltar, Hero intacto) | Ajustes finos de overlay/opacidade feitos; checklist de regressão OK |
| 7 | Confirmar com o usuário e **apagar `SDD_CONTATO_VISUAL.md`** | Arquivo removido e usuário avisado |

## 6. Definição de pronto
- [ ] Personagem 8-bit no Hero e no Contato (imagem antiga removida)
- [ ] Fundo da cabana cobrindo a página de Contato, com overlay de contraste
- [ ] Composição: personagem à esquerda (pés na base), card sobreposto à direita
- [ ] Card legível (contraste) sobre o novo fundo
- [ ] Mobile empilhado e funcional
- [ ] i18n, botões de CV, seletor de idioma, Hero e demais seções intactos
- [ ] Imagens otimizadas
- [ ] `SDD_CONTATO_VISUAL.md` removido
