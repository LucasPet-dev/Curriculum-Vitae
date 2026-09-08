/* ============================================================
   Portfólio Lucas Petito — "Floresta Pixelada"
   Efeitos e interações: parallax da floresta, escurecimento no
   scroll, folhas caindo, correção de foco no carrossel de skills
   e a cabana de contato (som de porta + abertura de contato.html).
   ============================================================ */

(function () {
  'use strict';

  /* Referências aos elementos da floresta manipulados no scroll. */
  const camadaFundo = document.querySelector('.camada-fundo');
  const camadaMeio = document.querySelector('.camada-meio');
  const camadaFrente = document.querySelector('.camada-frente');
  const nevoa = document.querySelector('.nevoa');
  const escurecer = document.getElementById('escurecer');

  /* Velocidade de parallax de cada camada: quanto maior, mais
     "perto" a camada aparenta estar (ela se desloca mais rápido). */
  const VELOCIDADE_FUNDO = 0.12;
  const VELOCIDADE_MEIO = 0.28;
  const VELOCIDADE_FRENTE = 0.5;

  let ultimaPosicao = -1;
  let executando = false;

  /* Altura total rolável da página (usada para saber em que ponto do
     "mergulho na floresta" o usuário está, de 0 a 1). */
  function alturaRolavel() {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
  }

  /* Aplica o parallax e o escurecimento com base na posição do scroll.
     As camadas sobem em velocidades diferentes (profundidade) e a
     floresta escurece progressivamente até a cabana. */
  function atualizarParallax() {
    const scrollY = window.scrollY || window.pageYOffset;

    camadaFundo.style.transform = 'translateY(' + scrollY * -VELOCIDADE_FUNDO + 'px)';
    camadaMeio.style.transform = 'translateY(' + scrollY * -VELOCIDADE_MEIO + 'px)';
    camadaFrente.style.transform = 'translateY(' + scrollY * -VELOCIDADE_FRENTE + 'px)';

    // A névoa sobe um pouco mais devagar que a camada da frente
    nevoa.style.transform = 'translateY(' + scrollY * -0.35 + 'px)';

    // Escurecimento: 0 no topo -> até 0.72 no fim da página
    const progresso = Math.min(scrollY / alturaRolavel(), 1);
    escurecer.style.opacity = (progresso * 0.72).toFixed(3);
  }

  /* Agenda a atualização via requestAnimationFrame, evitando rodar
     mais de uma vez por frame (otimização de performance no scroll). */
  function aoRolar() {
    if (!executando) {
      executando = true;
      window.requestAnimationFrame(function () {
        atualizarParallax();
        executando = false;
      });
    }
  }

  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar);

  // Estado inicial
  atualizarParallax();

  /* ==========================================================
     Folhas caindo: um quadradinho pixel aparece no topo e cai
     com balanço lateral até sumir (Web Animations API).
     ========================================================== */

  var containerFolhas = document.getElementById('folhas');
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cria e anima uma folha; remove o elemento ao fim da animação. */
  function criarFolha() {
    if (!containerFolhas) { return; }

    var folha = document.createElement('div');
    folha.className = 'folha';

    // Tons de verde e dourado (folhagem + poeira de luz)
    var cores = ['#57A773', '#8EE6A0', '#A9814F', '#B8E986', '#FFD866', '#FFEFAD'];
    folha.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];

    var tamanho = 4 + Math.floor(Math.random() * 4); // 4 a 7 px (visual pixel)
    folha.style.width = tamanho + 'px';
    folha.style.height = tamanho + 'px';
    folha.style.left = Math.random() * 100 + 'vw';

    var duracao = 6 + Math.random() * 5; // 6 a 11 s
    var desvioX = (Math.random() * 120 - 60).toFixed(0); // balanço lateral

    var animacao = folha.animate(
      [
        { transform: 'translate(0, -10vh) rotate(0deg)', opacity: 0.9 },
        { transform: 'translate(' + desvioX + 'px, 50vh) rotate(180deg)', opacity: 0.8 },
        { transform: 'translate(0, 110vh) rotate(360deg)', opacity: 0 }
      ],
      { duration: duracao * 1000, easing: 'linear' }
    );

    containerFolhas.appendChild(folha);
    animacao.onfinish = function () { folha.remove(); };
  }

  // Solta uma folha a cada ~1,6 s, respeitando prefers-reduced-motion
  if (!reduzMovimento) {
    setInterval(criarFolha, 1600);
  }

  /* ==========================================================
     Correção de UX no carrossel: após clicar num link de skill
     (abre em nova aba), remove o foco do link — senão o foco
     residual pausaria a roleta ao voltar para a página.
     ========================================================== */

  var linksSkills = document.querySelectorAll('.skill-link');
  linksSkills.forEach(function (link) {
    link.addEventListener('click', function () { link.blur(); });
  });

  /* ==========================================================
     Cabana interativa: clique (ou Enter/Espaço) toca o som de
     porta rangendo e abre contato.html em nova aba.
     ========================================================== */

  var cabana = document.getElementById('cabana-interativa');

  /* Sintetiza um rangido de porta com Web Audio API (oscilador
     sawtooth com queda de frequência + filtro passa-baixa), sem
     precisar de arquivo de áudio. Falhas são ignoradas com
     segurança: a navegação nunca é bloqueada pelo som. */
  function tocarSomDaPorta() {
    try {
      var Contexto = window.AudioContext || window.webkitAudioContext;
      if (!Contexto) { return; }

      var audio = new Contexto();
      var agora = audio.currentTime;

      // Rangido: oscilador "sawtooth" com varredura de frequência descendente
      var osc = audio.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, agora);
      osc.frequency.exponentialRampToValueAtTime(140, agora + 0.55);

      // Ganho com ataque rápido e decaimento (som curto)
      var ganho = audio.createGain();
      ganho.gain.setValueAtTime(0.0001, agora);
      ganho.gain.exponentialRampToValueAtTime(0.18, agora + 0.05);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.6);

      // Filtro passa-baixa para deixar o som mais "amadeirado"
      var filtro = audio.createBiquadFilter();
      filtro.type = 'lowpass';
      filtro.frequency.value = 900;

      osc.connect(filtro);
      filtro.connect(ganho);
      ganho.connect(audio.destination);

      osc.start(agora);
      osc.stop(agora + 0.65);

      // Fecha o contexto ao terminar para liberar recursos
      osc.onended = function () { audio.close(); };
    } catch (erro) {
      // Som indisponível não deve bloquear a navegação
    }
  }

  /* Ação do clique na cabana: toca o som e abre a página de contato. */
  function abrirContato() {
    tocarSomDaPorta();
    window.open('contato.html', '_blank', 'noopener');
  }

  if (cabana) {
    cabana.addEventListener('click', abrirContato);

    // Acessibilidade: Enter/Espaço também abrem a porta
      cabana.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        abrirContato();
      }
    });
  }
})();

/* ============================================================
   Modal/lightbox do diploma (seção Formação)
   Miniatura abre overlay com a imagem ampliada; fecha pelo botão
   X, pela tecla Escape ou clicando fora da imagem. Somente
   visualização — sem link ou botão de download.
   ============================================================ */
(function () {
  'use strict';

  var modal = document.getElementById('modal-diploma');
  var botaoAbrir = document.getElementById('diploma-abrir');
  var botaoFechar = document.getElementById('modal-fechar');

  if (!modal || !botaoAbrir || !botaoFechar) { return; }

  function abrirModal() {
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    botaoFechar.focus();
  }

  function fecharModal() {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    botaoAbrir.focus();
  }

  botaoAbrir.addEventListener('click', abrirModal);
  botaoFechar.addEventListener('click', fecharModal);

  /* Clique fora da imagem (no overlay escuro) fecha o modal. */
  modal.addEventListener('click', function (evento) {
    if (evento.target === modal) { fecharModal(); }
  });

  /* Escape fecha a qualquer momento enquanto o modal está aberto. */
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && modal.classList.contains('aberto')) {
      fecharModal();
    }
  });
})();

/* ============================================================
   Barra lateral de navegação
   1) Marca o item ativo conforme a seção visível na tela
      (IntersectionObserver, com margens que "focam" no centro
      da viewport);
   2) No mobile, abre/fecha o menu lateral pelo botão hambúrguer,
      pelo backdrop, pela tecla Escape ou ao clicar em um item.
   ============================================================ */
(function () {
  'use strict';

  var menu = document.getElementById('menu-lateral');
  var toggle = document.getElementById('menu-toggle');
  var backdrop = document.getElementById('menu-backdrop');

  if (!menu) { return; }

  /* ---- Item ativo conforme a seção visível ---- */
  var links = menu.querySelectorAll('a[href^="#"]');
  var mapa = new Map();

  links.forEach(function (link) {
    var secao = document.querySelector(link.getAttribute('href'));
    if (secao) { mapa.set(secao, link); }
  });

  function marcarAtivo(secao) {
    links.forEach(function (link) { link.classList.remove('ativo'); });
    var link = mapa.get(secao);
    if (link) {
      link.classList.add('ativo');
    }
  }

  if ('IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) { marcarAtivo(entrada.target); }
      });
    }, {
      /* Só conta seções cruzando a faixa central da tela */
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    });

    mapa.forEach(function (link, secao) { observador.observe(secao); });
  }

  /* ---- Drawer mobile (hambúrguer) ---- */
  if (!toggle || !backdrop) { return; }

  function abrirMenu() {
    menu.classList.add('aberto');
    backdrop.classList.add('visivel');
    backdrop.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  function fecharMenu() {
    menu.classList.remove('aberto');
    backdrop.classList.remove('visivel');
    toggle.setAttribute('aria-expanded', 'false');
    /* Espera a transição de fade antes de esconder o backdrop */
    setTimeout(function () {
      if (!menu.classList.contains('aberto')) { backdrop.hidden = true; }
    }, 250);
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('aberto')) { fecharMenu(); }
    else { abrirMenu(); }
  });

  backdrop.addEventListener('click', fecharMenu);

  /* Ao clicar num item, o menu fecha (o scroll suave segue a âncora) */
  links.forEach(function (link) {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
      fecharMenu();
      toggle.focus();
    }
  });
})();
