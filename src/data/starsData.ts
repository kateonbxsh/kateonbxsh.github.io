// src/data/starsData.ts

type lang = 'fr' | 'en';

interface ContentData {
    
    description: string;
    items: Array<{
        title: string;
        subtitle?: string;
        description: string;
        links: Array<{
            text: string;
            link: string;
        }>;
    }>;
}

export interface StarData {
  id: string;
  position: [number, number, number];
  title: {
    en: string;
    fr: string;
  };
  code: string;
  texture: string;
  color: string;
  content: {
    [P in lang]: ContentData;
  };
}

export const starsData: StarData[] = [
  {
    id: 'experience',
    position: [-40, 10, -15],
    title: { en: 'Work Experience', fr: 'Expérience professionnelle' },
    code: 'WORK-002',
    texture: '/textures/mars.png',
    color: '#ff6b6b',
    content: {
      en: {
        description: "From Tokyo to Brussels to my bedroom — I've shipped code across continents and time zones. Here's where I've managed not to break production (mostly).",
        items: [
          {
            title: 'Fullstack Space Mission Control Software Developer',
            subtitle: 'JAOPS, Tokyo, Japan',
            description: "At JAOPS, I worked as a Fullstack Software Developer on space mission telemetry software, I implemented a powerful visualization tool to assist mission control offiers in space missions, the tool was implemented as a Grafana 11 plugin with Commands Panels, Real-time visualizations, and much more...\n\nThese were the same tasks I had completed in Belgium, after my internship at Space Apps in Brussels, the CEO of JAOPS was impressed by my work and hired me.",
            links: [
                { text: 'GitHub Repo', link: 'https://github.com/yamcs/grafana-yamcs-app' },
            ],
          },
          {
            title: 'Fullstack Software Intern',
            subtitle: 'Space Apps, Brussels, Belgium',
            description: "At Space Apps, I built a Grafana 11 plugin for spacecraft telemetry and commanding using Yamcs. I implemented real-time 3D spacecraft visualization with Three.js just because I convinced my team that looking at graphs that represent coordinates is useless. Space Apps work with a lot of space agencies in Europe.",
            links: [],
          },
          {
            title: 'Freelance',
            subtitle: 'Part-time, Online',
            description: "As a student, I work with some clients in my free time on a lot of software projects, most involve games (as that happens to be one of my hobbies), implementing websites, managing databases, and more... one of the most interesting tasks I had to work on was implemeting a custom-made data interchange format, inspired by Relaxed JSON.",
            links: [],
          },
          {
            title: 'ADVEEZ',
            subtitle: 'Toulouse, France',
            description: "Aaah, my first ever internship, it was such an interesting experience, where I learned about how a company that provides electronic solutions to major airports in the world, manages inventory, shipping, production and even programming of the solutions.",
            links: [],
          },
        ],
      },
      fr: {
        description: "De Tokyo à Bruxelles en passant par ma chambre—j'ai livré du code à travers les continents et les fuseaux horaires. Voici où j'ai réussi à ne pas casser la production (la plupart du temps).",
        items: [
          {
            title: 'JAOPS — Tokyo, Japon (À distance)',
            description: "Développeur Logiciel Fullstack | Déc 2024 – Jul 2025 | Développé un plugin Grafana App open-source intégrant Yamcs pour la télémétrie spatiale. Construit des panneaux de commande, des panneaux d'images de télémétrie, et des outils de contrôle de mission que de vrais laboratoires de robotique spatiale utilisent. Oui, de vrais vaisseaux spatiaux. Pas de pression. Tech: React.js, Go, Grafana",
            links: [
              { text: 'GitHub', link: 'https://github.com/yamcs/grafana-yamcs-app' },
            ],
          },
          {
            title: 'Space Applications Services — Bruxelles, Belgique',
            description: "Stagiaire Développeur Logiciel Fullstack | Jul 2024 – Oct 2024 | Construit un plugin Grafana 11 pour la télémétrie et la commande de vaisseaux spatiaux utilisant Yamcs. Implémenté une visualisation 3D en temps réel de vaisseaux spatiaux avec Three.js parce que les UI plates c'est tellement 2010. Déployé au Centre de Contrôle de Mission ICE Cubes—ce qui sonne plus cool que ça devrait probablement. Tech: React.js, Three.js, Go, Grafana, Yamcs",
            links: [],
          },
          {
            title: 'Freelance — En ligne',
            description: "Développeur Logiciel (Temps partiel) | Jan 2023 – Présent | Conçu et livré des logiciels, des infrastructures de jeux multijoueurs, et des plateformes web pour des clients qui ont fait confiance à un étudiant avec leurs systèmes de production (âmes courageuses). Construit des architectures back-end évolutives et des systèmes en réseau temps réel. Tech: C, Java, Java Spring, Next.js, Tailwind, C++",
            links: [],
          },
          {
            title: 'ADVEEZ — Toulouse, France',
            description: "Assistant de Production | Jan 2022 – Fév 2022 | Assisté dans la production de systèmes électroniques utilisés par de grands aéroports internationaux. Appris que les flux de travail de production sont plus complexes que n'importe quel code que j'ai jamais écrit. Soutenu la logistique interne et n'ai rien cassé de critique.",
            links: [],
          },
        ],
      },
    },
  },
  {
    id: 'projects',
    position: [18, -8, -20],
    title: { en: 'Projects', fr: 'Projets' },
    code: 'PROJ-003',
    texture: '/textures/jupiter.png',
    color: '#51cf66',
    content: {
      en: {
        description: "Things I've built when I should have been sleeping. From multiplayer games to AI libraries, here's my digital graveyard of ambitious ideas (that actually work).",
        items: [
          {
            title: 'Rivalium — Multiplayer Competitive Platformer',
            description: "5 years of my life condensed into a competitive multiplayer platformer. Features account server with WebSocket API, MongoDB database, dual TCP/UDP game server, GameMaker client, Next.js website, and React admin panel. It's basically a distributed systems textbook, but with jumping. Tech: C#, TypeScript, Express.js, MongoDB, Next.js",
            links: [
              { text: 'Play Now', link: 'https://rivalium.online' },
            ],
          },
          {
            title: 'Grafana-Yamcs Integration — Open Source',
            description: "Grafana App plugin providing real-time telemetry and commanding for Yamcs. Custom data source, spacecraft visualization panel, and command interface. Used by actual space missions. No big deal. Tech: React.js, Go, Grafana",
            links: [
              { text: 'GitHub', link: 'https://github.com/yamcs/grafana-yamcs-app' },
            ],
          },
          {
            title: 'Cherry — Programming Language',
            description: "Because there weren't enough programming languages in the world, I made another one. Open-source interpreted and typed language with C-style syntax. It compiles, it runs, it probably has bugs. Tech: C++",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/cherry' },
            ],
          },
          {
            title: 'MiniGPT — AI Library',
            description: "Modular AI library implementing MLPs, attention blocks, and GPT prototype from scratch. Trained on MNIST and custom datasets. Turns out neural networks are just really fancy matrix multiplication. Who knew? Tech: TypeScript",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/minigpt' },
            ],
          },
          {
            title: 'Tunewave — Online Musical Quiz',
            description: "Open-source online musical quiz with persistent leaderboard. For when you want to prove you have better music taste than your friends (you probably don't). Tech: HTML, CSS, JavaScript",
            links: [
              { text: 'Play', link: 'https://tunewave.live' },
            ],
          },
          {
            title: 'VersionFlow — CLI Tool',
            description: "CLI tool for project version management integrated with Git and npm. Because manually updating version numbers is for people with too much time. Tech: JavaScript, Node.js",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/versionflow' },
            ],
          },
          {
            title: 'DiscordPresency — DLL Extension',
            description: "DLL wrapper for Discord SDK enabling Rich Presence in GameMaker. Now your Discord friends can see you're debugging for the 47th hour straight. Tech: GML, C++",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/discordpresency' },
            ],
          },
          {
            title: 'Blue Pulse — 3D Web Experience',
            description: "3D web application for Nuit de l'Informatique 2024. Human body visualization with GLSL ocean shader and interactive UI. Built in 24 hours with way too much caffeine. Tech: JavaScript, Three.js, GLSL",
            links: [
              { text: 'Live Demo', link: 'https://blue-pulse.vercel.app' },
            ],
          },
          {
            title: 'Culture Lock — Interactive Escape Game',
            description: "Interactive escape-game-like web experience focused on intercultural learning. It's educational AND fun, which is apparently possible. Tech: JavaScript",
            links: [
              { text: 'Play', link: 'https://culture-lock.vercel.app' },
            ],
          },
        ],
      },
      fr: {
        description: "Choses que j'ai construites quand j'aurais dû dormir. Des jeux multijoueurs aux bibliothèques IA, voici mon cimetière numérique d'idées ambitieuses (qui fonctionnent réellement).",
        items: [
          {
            title: 'Rivalium — Platformer Compétitif Multijoueur',
            description: "5 ans de ma vie condensés dans un platformer compétitif multijoueur. Comprend un serveur de comptes avec API WebSocket, base de données MongoDB, serveur de jeu TCP/UDP dual, client GameMaker, site web Next.js, et panneau d'administration React. C'est essentiellement un manuel de systèmes distribués, mais avec du saut. Tech: C#, TypeScript, Express.js, MongoDB, Next.js",
            links: [
              { text: 'Jouer Maintenant', link: 'https://rivalium.online' },
            ],
          },
          {
            title: 'Intégration Grafana-Yamcs — Open Source',
            description: "Plugin Grafana App fournissant télémétrie et commande en temps réel pour Yamcs. Source de données personnalisée, panneau de visualisation de vaisseaux spatiaux, et interface de commande. Utilisé par de vraies missions spatiales. Pas grand-chose. Tech: React.js, Go, Grafana",
            links: [
              { text: 'GitHub', link: 'https://github.com/yamcs/grafana-yamcs-app' },
            ],
          },
          {
            title: 'Cherry — Langage de Programmation',
            description: "Parce qu'il n'y avait pas assez de langages de programmation dans le monde, j'en ai fait un autre. Langage open-source interprété et typé avec syntaxe de style C. Ça compile, ça tourne, ça a probablement des bugs. Tech: C++",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/cherry' },
            ],
          },
          {
            title: 'MiniGPT — Bibliothèque IA',
            description: "Bibliothèque IA modulaire implémentant des MLPs, blocs d'attention, et prototype GPT à partir de zéro. Entraîné sur MNIST et des ensembles de données personnalisés. Il s'avère que les réseaux neuronaux ne sont que de la multiplication matricielle vraiment fancy. Qui savait ? Tech: TypeScript",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/minigpt' },
            ],
          },
          {
            title: 'Tunewave — Quiz Musical en Ligne',
            description: "Quiz musical en ligne open-source avec classement persistant. Pour quand vous voulez prouver que vous avez meilleur goût musical que vos amis (vous ne l'avez probablement pas). Tech: HTML, CSS, JavaScript",
            links: [
              { text: 'Jouer', link: 'https://tunewave.live' },
            ],
          },
          {
            title: 'VersionFlow — Outil CLI',
            description: "Outil CLI pour la gestion des versions de projet intégré avec Git et npm. Parce que mettre à jour manuellement les numéros de version c'est pour les gens avec trop de temps. Tech: JavaScript, Node.js",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/versionflow' },
            ],
          },
          {
            title: 'DiscordPresency — Extension DLL',
            description: "Wrapper DLL pour Discord SDK permettant Rich Presence dans GameMaker. Maintenant vos amis Discord peuvent voir que vous déboguez pour la 47ème heure consécutive. Tech: GML, C++",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/discordpresency' },
            ],
          },
          {
            title: 'Blue Pulse — Expérience Web 3D',
            description: "Application web 3D pour Nuit de l'Informatique 2024. Visualisation du corps humain avec shader océan GLSL et UI interactive. Construit en 24 heures avec beaucoup trop de caféine. Tech: JavaScript, Three.js, GLSL",
            links: [
              { text: 'Démo en Direct', link: 'https://blue-pulse.vercel.app' },
            ],
          },
          {
            title: 'Culture Lock — Jeu d\'Évasion Interactif',
            description: "Expérience web interactive de type escape-game axée sur l'apprentissage interculturel. C'est éducatif ET amusant, ce qui est apparemment possible. Tech: JavaScript",
            links: [
              { text: 'Jouer', link: 'https://culture-lock.vercel.app' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'skills',
    position: [-12, -12, -12],
    title: { en: 'Technical Skills', fr: 'Compétences Techniques' },
    code: 'TECH-004',
    texture: '/textures/Savannah.png',
    color: '#ffd43b',
    content: {
      en: {
        description: "My digital toolbox. From low-level systems programming to making buttons look pretty—I've probably broken it at least once.",
        items: [
          {
            title: 'Languages I Actually Use',
            description: "C++, C, Java, C#, JavaScript, TypeScript, Python, Go, GML. Yes, I know GML is niche. Yes, it's useful. No, I won't explain why.",
            links: [],
          },
          {
            title: 'Front-End Magic',
            description: "React, Next.js, Tailwind CSS, Vue, Bootstrap, Three.js. Making pixels do cool things since 2023. Responsive design? More like responsive to my caffeine levels.",
            links: [],
          },
          {
            title: 'Back-End Wizardry',
            description: "Express.js, Java Spring, MongoDB, PostgreSQL, TCP/UDP, WebSockets, REST APIs. Building servers that (usually) don't fall over under load. The secret? Panic and Stack Overflow.",
            links: [],
          },
          {
            title: 'DevOps & Tools',
            description: "Git, GitHub Actions, Docker, Kubernetes, CI/CD, Linux, Jira, Agile. I can containerize your app and make it scale. Will it be pretty? That's a different question.",
            links: [],
          },
          {
            title: 'Specialized Skills',
            description: "Real-time systems, distributed architectures, spacecraft telemetry (yes, really), multiplayer game networking, 3D graphics programming. Basically anything that involves data moving fast and looking good.",
            links: [],
          },
        ],
      },
      fr: {
        description: "Ma boîte à outils numérique. De la programmation système bas niveau à rendre les boutons jolis—je l'ai probablement cassé au moins une fois.",
        items: [
          {
            title: 'Langages Que J\'Utilise Vraiment',
            description: "C++, C, Java, C#, JavaScript, TypeScript, Python, Go, GML. Oui, je sais que GML est de niche. Oui, c'est utile. Non, je n'expliquerai pas pourquoi.",
            links: [],
          },
          {
            title: 'Magie Front-End',
            description: "React, Next.js, Tailwind CSS, Vue, Bootstrap, Three.js. Faire faire des trucs cool aux pixels depuis 2023. Design responsive ? Plutôt responsive à mes niveaux de caféine.",
            links: [],
          },
          {
            title: 'Sorcellerie Back-End',
            description: "Express.js, Java Spring, MongoDB, PostgreSQL, TCP/UDP, WebSockets, REST APIs. Construire des serveurs qui (généralement) ne s'effondrent pas sous la charge. Le secret ? Panique et Stack Overflow.",
            links: [],
          },
          {
            title: 'DevOps & Outils',
            description: "Git, GitHub Actions, Docker, Kubernetes, CI/CD, Linux, Jira, Agile. Je peux conteneuriser votre application et la faire évoluer. Est-ce que ce sera joli ? C'est une autre question.",
            links: [],
          },
          {
            title: 'Compétences Spécialisées',
            description: "Systèmes temps réel, architectures distribuées, télémétrie spatiale (oui, vraiment), réseau de jeux multijoueurs, programmation graphique 3D. Essentiellement tout ce qui implique des données qui bougent vite et qui ont l'air bien.",
            links: [],
          },
        ],
      },
    },
  },
  {
    id: 'contact',
    position: [15, 10, -25],
    title: { en: 'Get In Touch', fr: 'Contact' },
    code: 'COMM-005',
    texture: '/textures/Icy.png',
    color: '#a4f3ff',
    content: {
      en: {
        description: "Want to build something cool? Need someone who can debug production at 3 AM? Looking for an intern who won't crash your spacecraft telemetry system? Let's talk.",
        items: [
          {
            title: 'Email',
            description: "The old-fashioned way. I actually check this one, promise.",
            links: [
              { text: 'aouabadmou@gmail.com', link: 'mailto:aouabadmou@gmail.com' },
            ],
          },
          {
            title: 'LinkedIn',
            description: "For when you want to be professional about it. I'll accept your connection request unless you're selling crypto courses.",
            links: [
              { text: 'linkedin.com/in/aouab', link: 'https://linkedin.com/in/aouab' },
            ],
          },
          {
            title: 'GitHub',
            description: "Where all my code lives. Judge my commit messages at your own risk.",
            links: [
              { text: 'github.com/kateonbxsh', link: 'https://github.com/kateonbxsh' },
            ],
          },
          {
            title: 'Location',
            description: "Based in Toulouse, France. Home of Airbus, great wine, and questionable amounts of cassoulet. Open to remote work and relocating for the right opportunity.",
            links: [],
          },
          {
            title: 'Availability',
            description: "Seeking a 4-month internship starting June 2026. Interested in: spacecraft systems, distributed architectures, real-time applications, 3D graphics, or anything that makes me say 'wait, we can DO that?'",
            links: [],
          },
        ],
      },
      fr: {
        description: "Envie de construire quelque chose de cool ? Besoin de quelqu'un qui peut déboguer la production à 3h du matin ? Vous cherchez un stagiaire qui ne va pas planter votre système de télémétrie spatiale ? Discutons.",
        items: [
          {
            title: 'Email',
            description: "La méthode à l'ancienne. Je vérifie vraiment celui-ci, promis.",
            links: [
              { text: 'aouabadmou@gmail.com', link: 'mailto:aouabadmou@gmail.com' },
            ],
          },
          {
            title: 'LinkedIn',
            description: "Pour quand vous voulez être professionnel à ce sujet. J'accepterai votre demande de connexion sauf si vous vendez des cours de crypto.",
            links: [
              { text: 'linkedin.com/in/aouab', link: 'https://linkedin.com/in/aouab' },
            ],
          },
          {
            title: 'GitHub',
            description: "Où tout mon code vit. Jugez mes messages de commit à vos risques et périls.",
            links: [
              { text: 'github.com/kateonbxsh', link: 'https://github.com/kateonbxsh' },
            ],
          },
          {
            title: 'Localisation',
            description: "Basé à Toulouse, France. Maison d'Airbus, de bon vin, et de quantités discutables de cassoulet. Ouvert au travail à distance et à la relocalisation pour la bonne opportunité.",
            links: [],
          },
          {
            title: 'Disponibilité',
            description: "Je cherche un stage de 4 mois à partir de juin 2026. Intéressé par : systèmes spatiaux, architectures distribuées, applications temps réel, graphismes 3D, ou tout ce qui me fait dire 'attends, on peut FAIRE ça ?'",
            links: [],
          },
        ],
      },
    },
  },
];