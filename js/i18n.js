/* ============================================================
   Portfólio Lucas Petito — Internacionalização (i18n)
   Seletor de idioma PT-BR / EN / ES com troca instantânea de
   todo o conteúdo textual do site, sem recarregar a página.

   Estrutura:
   - translations: dicionário central com as strings dos 3 idiomas;
   - setLanguage(lang): percorre os elementos marcados no HTML
     (data-i18n, data-i18n-html, data-i18n-aria, data-i18n-alt) e
     aplica os textos do idioma escolhido;
   - o idioma escolhido é salvo em localStorage e reaplicado ao
     carregar qualquer página do site.
   ============================================================ */

(function () {
  'use strict';

  var translations = {

    /* -------------------- PORTUGUÊS (padrão) -------------------- */
    pt: {
      'idioma.seletor': 'Selecionar idioma',
      'menu.pular': 'Pular para o conteúdo',
      'menu.rotulo': 'Navegação principal',
      'menu.inicio': 'Início',
      'menu.abrir': 'Abrir menu de navegação',
      'menu.sobre': 'Sobre',
      'menu.experiencia': 'Experiência',
      'menu.formacao': 'Formação',
      'menu.contato': 'Contato',

      'hero.saudacao': '> iniciando trilha_',
      'hero.cargo': 'Full Stack .NET Developer',
      'hero.local': 'Cabo Frio, RJ, Brasil',
      'hero.descer': 'Rolar para a seção Sobre',
      'foto.alt': 'Foto de Lucas Petito',

      'sobre.titulo': 'Sobre mim',
      'sobre.texto': 'Sou brasileiro 🇧🇷 e sempre fui apaixonado por tecnologia — dos jogos aos sistemas que facilitavam minha vida. Na época dos estudos, desenvolvi programas para resolver minhas próprias fórmulas de física e química, e depois criei um sistema para me ajudar a organizar a vida financeira e economizar para comprar meu primeiro computador (afinal, é preciso saber economizar para conquistar as próprias coisas). Hoje, sou <strong>Full Stack .NET Developer</strong> focado em <strong>arquitetura de sistemas escaláveis</strong>, <strong>APIs REST</strong> e <strong>otimização de banco de dados</strong>, aplicando os princípios <strong>SOLID</strong> e <strong>Clean Architecture</strong>. Integro <strong>IA ao ciclo de desenvolvimento</strong> — refatoração assistida, análise estática e geração de testes — e utilizo <strong>Spec-Driven Development</strong> para melhorar a consistência arquitetural e reduzir retrabalho. Amo minha área, amo desenvolver conhecimento e ser produtivo, mas nunca sozinho — afinal, ninguém nessa vida cresce sozinho.',
      'sobre.bandeira': 'Bandeira do Brasil em pixel art',
      'cv.en': '> Baixar CV (EN)',
      'cv.pt': '> Baixar CV (PT-BR)',

      'skills.titulo': 'Skills & Tecnologias',
      'skills.carrossel': 'Carrossel de skills e tecnologias',
      'skill.abrir': 'Abrir site oficial de {nome} (nova aba)',

      'exp.titulo': 'Experiência',
      'xp1.cargo': 'Full Stack .NET Software Developer',
      'xp1.periodo': 'Estagiário (2023) → Trainee (2024–2025) → Dev Pleno (2026)',
      'xp1.i1': 'Desenvolvimento de sistemas corporativos escaláveis em C# 12, ASP.NET Core 8, EF Core e SQL Server, com foco em performance e confiabilidade.',
      'xp1.i2': 'APIs REST em camadas, aplicando os princípios SOLID (SRP, OCP, DIP, LSP, ISP).',
      'xp1.i3': 'Modelagem relacional normalizada (3NF), otimização de consultas SQL e LINQ.',
      'xp1.i4': 'Git com Git Flow e Azure DevOps, incluindo pipelines de CI/CD.',
      'xp1.i5': 'Refatoração de código com padrões de projeto e eliminação de code smells.',
      'xp1.i6': 'Spec-Driven Development para guiar o desenvolvimento assistido por IA.',
      'xp1.i7': 'Uso de IA para análise crítica, refatoração, análise estática e documentação técnica.',
      'xp1.i8': 'Code review estruturado e participação ativa em decisões de arquitetura.',

      'xp2.cargo': 'Instrutor — Projeto de Extensão',
      'xp2.periodo': '"Introdução à Programação Aplicada à Automação Residencial"',
      'xp2.i1': 'Aulas de lógica computacional para alunos do projeto de extensão.',
      'xp2.i2': 'Ensino de estruturas de controle, funções, arrays e POO.',
      'xp2.i3': 'Demonstrações práticas com tecnologias IoT e sistemas embarcados.',
      'xp2.i4': 'Mentoria com foco em pensamento crítico e resolução de problemas.',

      'form.titulo': 'Formação',
      'form.curso': 'Bacharelado em Sistemas de Informação',
      'form.detalhe': 'Universidade Estácio de Sá — concluído em 2025',
      'form.diplomaAlt': 'Diploma de Bacharelado em Sistemas de Informação',
      'form.diplomaAbrir': 'Abrir diploma do Bacharelado em Sistemas de Informação',
      'form.diplomaLegenda': 'Diploma — clique para ampliar',
      'form.modalFechar': 'Fechar visualização do diploma',

      'contato.titulo': 'Contato',
      'contato.aviso': 'Você chegou ao coração da floresta. Bata na porta da cabana…',
      'cabana.aria': 'Cabana de contato — clique na porta para abrir a página de contato',
      'cabana.dica': '[ clique na porta ]',

      'contato.intro': 'Você bateu na porta da cabana certa!',
      'contato.nome': 'Nome',
      'contato.cargo': 'Cargo',
      'contato.local': 'Local',
      'contato.email': 'E-mail',
      'contato.telefone': 'Telefone',
      'contato.voltar': '<- Voltar para a floresta',

      'rodape': 'Feito com HTML, CSS e JavaScript puro — no meio do mato. © Lucas Petito'
    },

    /* -------------------------- ENGLISH -------------------------- */
    en: {
      'idioma.seletor': 'Select language',
      'menu.pular': 'Skip to content',
      'menu.rotulo': 'Main navigation',
      'menu.inicio': 'Home',
      'menu.abrir': 'Open navigation menu',
      'menu.sobre': 'About',
      'menu.experiencia': 'Experience',
      'menu.formacao': 'Education',
      'menu.contato': 'Contact',

      'hero.saudacao': '> starting trail_',
      'hero.cargo': 'Full Stack .NET Developer',
      'hero.local': 'Cabo Frio, RJ, Brazil',
      'hero.descer': 'Scroll to the About section',
      'foto.alt': 'Photo of Lucas Petito',

      'sobre.titulo': 'About me',
      'sobre.texto': "I'm Brazilian 🇧🇷 and I've always been passionate about technology — from games to systems that made my life easier. During my studies, I developed programs to solve my own physics and chemistry formulas, and later created a system to help me manage my financial life and save up to buy my first computer (after all, you have to know how to save to earn your own things). Today, I'm a <strong>Full Stack .NET Developer</strong> focused on <strong>scalable systems architecture</strong>, <strong>REST APIs</strong> and <strong>database optimization</strong>, applying <strong>SOLID</strong> principles and <strong>Clean Architecture</strong>. I integrate <strong>AI into the development lifecycle</strong> — assisted refactoring, static analysis and test generation — and use <strong>Spec-Driven Development</strong> to improve architectural consistency and reduce rework. I love my field, I love developing knowledge and being productive, but never alone — after all, no one in this life grows alone.",
      'sobre.bandeira': 'Brazilian flag in pixel art',
      'cv.en': '> Download CV (EN)',
      'cv.pt': '> Download CV (PT-BR)',

      'skills.titulo': 'Skills & Technologies',
      'skills.carrossel': 'Skills and technologies carousel',
      'skill.abrir': 'Open the official {nome} website (new tab)',

      'exp.titulo': 'Experience',
      'xp1.cargo': 'Full Stack .NET Software Developer',
      'xp1.periodo': 'Intern (2023) → Trainee (2024–2025) → Mid-level Developer (2026)',
      'xp1.i1': 'Development of scalable enterprise systems in C# 12, ASP.NET Core 8, EF Core and SQL Server, with a focus on performance and reliability.',
      'xp1.i2': 'Layered REST APIs applying SOLID principles (SRP, OCP, DIP, LSP, ISP).',
      'xp1.i3': 'Normalized relational modeling (3NF), SQL query optimization and LINQ.',
      'xp1.i4': 'Git with Git Flow and Azure DevOps, including CI/CD pipelines.',
      'xp1.i5': 'Code refactoring with design patterns and code smell elimination.',
      'xp1.i6': 'Spec-Driven Development to guide AI-assisted development.',
      'xp1.i7': 'Use of AI for critical analysis, refactoring, static analysis and technical documentation.',
      'xp1.i8': 'Structured code reviews and active participation in architecture decisions.',

      'xp2.cargo': 'Instructor — Extension Project',
      'xp2.periodo': '"Introduction to Programming Applied to Home Automation"',
      'xp2.i1': 'Computational logic classes for extension project students.',
      'xp2.i2': 'Teaching control structures, functions, arrays and OOP.',
      'xp2.i3': 'Hands-on demonstrations with IoT technologies and embedded systems.',
      'xp2.i4': 'Mentoring focused on critical thinking and problem solving.',

      'form.titulo': 'Education',
      'form.curso': "Bachelor's Degree in Information Systems",
      'form.detalhe': 'Universidade Estácio de Sá — graduated in 2025',
      'form.diplomaAlt': "Bachelor's Degree in Information Systems diploma",
      'form.diplomaAbrir': "Open Bachelor's Degree in Information Systems diploma",
      'form.diplomaLegenda': 'Diploma — click to enlarge',
      'form.modalFechar': 'Close diploma view',

      'contato.titulo': 'Contact',
      'contato.aviso': 'You have reached the heart of the forest. Knock on the cabin door…',
      'cabana.aria': 'Contact cabin — click the door to open the contact page',
      'cabana.dica': '[ knock on the door ]',

      'contato.intro': 'You knocked on the right cabin door!',
      'contato.nome': 'Name',
      'contato.cargo': 'Role',
      'contato.local': 'Location',
      'contato.email': 'E-mail',
      'contato.telefone': 'Phone',
      'contato.voltar': '<- Back to the forest',

      'rodape': 'Built with pure HTML, CSS and JavaScript — in the middle of the woods. © Lucas Petito'
    },

    /* -------------------------- ESPAÑOL -------------------------- */
    es: {
      'idioma.seletor': 'Seleccionar idioma',
      'menu.pular': 'Saltar al contenido',
      'menu.rotulo': 'Navegación principal',
      'menu.inicio': 'Inicio',
      'menu.abrir': 'Abrir menú de navegación',
      'menu.sobre': 'Sobre mí',
      'menu.experiencia': 'Experiencia',
      'menu.formacao': 'Formación',
      'menu.contato': 'Contacto',

      'hero.saudacao': '> iniciando sendero_',
      'hero.cargo': 'Full Stack .NET Developer',
      'hero.local': 'Cabo Frio, RJ, Brasil',
      'hero.descer': 'Ir a la sección Sobre mí',
      'foto.alt': 'Foto de Lucas Petito',

      'sobre.titulo': 'Sobre mí',
      'sobre.texto': 'Soy brasileño 🇧🇷 y siempre me ha apasionado la tecnología — desde los videojuegos hasta los sistemas que facilitaban mi vida. En la época de los estudios, desarrollé programas para resolver mis propias fórmulas de física y química, y después creé un sistema que me ayudó a organizar mi vida financiera y ahorrar para comprar mi primera computadora (al fin y al cabo, hay que saber ahorrar para conquistar las propias cosas). Hoy soy <strong>Full Stack .NET Developer</strong> enfocado en <strong>arquitectura de sistemas escalables</strong>, <strong>APIs REST</strong> y <strong>optimización de bases de datos</strong>, aplicando los principios <strong>SOLID</strong> y <strong>Clean Architecture</strong>. Integro <strong>IA en el ciclo de desarrollo</strong> — refactorización asistida, análisis estático y generación de pruebas — y utilizo <strong>Spec-Driven Development</strong> para mejorar la consistencia arquitectónica y reducir el retrabajo. Amo mi área, amo desarrollar conocimiento y ser productivo, pero nunca solo — al fin y al cabo, nadie en esta vida crece solo.',
      'sobre.bandeira': 'Bandera de Brasil en pixel art',
      'cv.en': '> Descargar CV (EN)',
      'cv.pt': '> Descargar CV (PT-BR)',

      'skills.titulo': 'Skills y Tecnologías',
      'skills.carrossel': 'Carrusel de skills y tecnologías',
      'skill.abrir': 'Abrir el sitio oficial de {nome} (nueva pestaña)',

      'exp.titulo': 'Experiencia',
      'xp1.cargo': 'Full Stack .NET Software Developer',
      'xp1.periodo': 'Becario (2023) → Trainee (2024–2025) → Desarrollador Pleno (2026)',
      'xp1.i1': 'Desarrollo de sistemas corporativos escalables en C# 12, ASP.NET Core 8, EF Core y SQL Server, con enfoque en rendimiento y confiabilidad.',
      'xp1.i2': 'APIs REST en capas, aplicando los principios SOLID (SRP, OCP, DIP, LSP, ISP).',
      'xp1.i3': 'Modelado relacional normalizado (3NF), optimización de consultas SQL y LINQ.',
      'xp1.i4': 'Git con Git Flow y Azure DevOps, incluyendo pipelines de CI/CD.',
      'xp1.i5': 'Refactorización de código con patrones de diseño y eliminación de code smells.',
      'xp1.i6': 'Spec-Driven Development para guiar el desarrollo asistido por IA.',
      'xp1.i7': 'Uso de IA para análisis crítico, refactorización, análisis estático y documentación técnica.',
      'xp1.i8': 'Code review estructurado y participación activa en decisiones de arquitectura.',

      'xp2.cargo': 'Instructor — Proyecto de Extensión',
      'xp2.periodo': '"Introducción a la Programación Aplicada a la Automatización Residencial"',
      'xp2.i1': 'Clases de lógica computacional para estudiantes del proyecto de extensión.',
      'xp2.i2': 'Enseñanza de estructuras de control, funciones, arrays y POO.',
      'xp2.i3': 'Demostraciones prácticas con tecnologías IoT y sistemas embebidos.',
      'xp2.i4': 'Mentoría con enfoque en pensamiento crítico y resolución de problemas.',

      'form.titulo': 'Formación',
      'form.curso': 'Licenciatura en Sistemas de Información',
      'form.detalhe': 'Universidade Estácio de Sá — graduado en 2025',
      'form.diplomaAlt': 'Diploma de Licenciatura en Sistemas de Información',
      'form.diplomaAbrir': 'Abrir diploma de Licenciatura en Sistemas de Información',
      'form.diplomaLegenda': 'Diploma — haz clic para ampliar',
      'form.modalFechar': 'Cerrar vista del diploma',

      'contato.titulo': 'Contacto',
      'contato.aviso': 'Has llegado al corazón del bosque. Toca la puerta de la cabaña…',
      'cabana.aria': 'Cabaña de contacto — haz clic en la puerta para abrir la página de contacto',
      'cabana.dica': '[ toca la puerta ]',

      'contato.intro': '¡Tocaste la puerta de la cabaña correcta!',
      'contato.nome': 'Nombre',
      'contato.cargo': 'Cargo',
      'contato.local': 'Ubicación',
      'contato.email': 'E-mail',
      'contato.telefone': 'Teléfono',
      'contato.voltar': '<- Volver al bosque',

      'rodape': 'Hecho con HTML, CSS y JavaScript puro — en medio del bosque. © Lucas Petito'
    }
  };

  var IDIOMAS = ['pt', 'en', 'es'];
  var CHAVE_STORAGE = 'portfolio-idioma';

  /* Lê o idioma salvo no localStorage; devolve 'pt' (padrão) se
     não houver nada salvo ou o valor for inválido. */
  function idiomaSalvo() {
    try {
      var salvo = localStorage.getItem(CHAVE_STORAGE);
      if (IDIOMAS.indexOf(salvo) !== -1) { return salvo; }
    } catch (e) { /* storage indisponível: segue com o padrão */ }
    return 'pt';
  }

  /* Busca uma string no idioma pedido, com fallback para PT. */
  function t(lang, chave) {
    var dic = translations[lang] || translations.pt;
    return dic[chave] !== undefined ? dic[chave] : translations.pt[chave];
  }

  /* Aplica o idioma em todo o DOM: textos simples, textos com
     HTML interno, aria-labels, alts de imagem e os rótulos dos
     links de skill. Também marca o botão ativo do seletor e salva
     a escolha no localStorage. */
  function setLanguage(lang) {
    if (IDIOMAS.indexOf(lang) === -1) { lang = 'pt'; }

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

    /* Textos simples: textContent */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(lang, el.getAttribute('data-i18n'));
    });

    /* Textos com marcação HTML interna (ex: <strong>) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(lang, el.getAttribute('data-i18n-html'));
    });

    /* Atributos aria-label */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(lang, el.getAttribute('data-i18n-aria')));
    });

    /* Atributos alt de imagens */
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.setAttribute('alt', t(lang, el.getAttribute('data-i18n-alt')));
    });

    /* aria-label dos links de skill: o nome da tecnologia NÃO se traduz,
       apenas a frase ao redor ("Abrir site oficial de X...") */
    document.querySelectorAll('.skill-link[aria-label]').forEach(function (link) {
      var nome = link.querySelector('.skill-nome');
      if (nome) {
        link.setAttribute('aria-label', t(lang, 'skill.abrir').replace('{nome}', nome.textContent));
      }
    });

    /* Estado visual/acessível dos botões do seletor */
    document.querySelectorAll('.seletor-idioma button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(CHAVE_STORAGE, lang); } catch (e) { /* sem storage: ok */ }
  }

  /* Liga os botões do seletor ao setLanguage. */
  document.querySelectorAll('.seletor-idioma button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  /* Idioma inicial: o salvo (localStorage) ou PT-BR */
  setLanguage(idiomaSalvo());

  /* Expõe para uso via console/testes */
  window.setLanguage = setLanguage;
})();
