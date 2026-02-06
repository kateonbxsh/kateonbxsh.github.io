// src/data/starsData.ts

type lang = 'fr' | 'en';

interface ContentData {
    
    description: string;
    items: Array<{
        title: string;
        subtitle?: string;
        description: string;
        images?: string[];
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
  metalness?: number;
  roughness?: number;
  content: {
    [P in lang]: ContentData;
  };
}

export const starsData: StarData[] = [
  {
    id: 'whoami',
    position: [0, 23, 8],
    title: { en: 'Who am I?', fr: 'Qui suis-je?' },
    code: 'WHOAMI-001',
    texture: '/textures/Venusian.png',
    color: '#ffcf5f',
    content: {
      en: {
        description: "[pulse]Hello! Get to know me![/pulse]",
        items: [
          {
            title: 'Aouab Admou',
            subtitle: 'Computer Science Student',
            description: "[img=/img/me.jpeg]\nHello, my name is Aouab (pronounced ah-web, yes, just like the web you're surfing on), I'm an enthusiastic computer science student. I love working on whatever speaks to me, I like to create and innovate, and I hide behind that excuse to make stupid things sometimes.\nI've been teaching myself how to code, draw and play music since middle school, now I'm good at neither.\n\nIf this is your first time here, feel free to check out my projects, and learn more about me, thanks for stopping by!\n\nOh and I'm a big fan of astronomy and aviation, if you're wondering why I made this website like this.",
            links: [
              { text: 'Download English Resume', link: '/resume/Aouab Admou - English Resume.pdf' },
              { text: 'Download French Resume', link: '/resume/Aouab Admou - CV FR.pdf' },
            ],
          },
        ],
      },
      fr: {
        description: "[greenpoint] [pulse][color=lightgreen]Salut ! Viens découvrir qui je suis ![/color][/pulse]",
        items: [
          {
            title: 'Aouab Admou',
            subtitle: 'Étudiant en informatique',
            description: "[img=/img/me.jpeg]\nSalut, moi c’est Aouab (prononcé ah-web, oui comme le web sur lequel tu surfes), étudiant en informatique super motivé. J’adore bosser sur tout ce qui me parle, créer, innover… et parfois je me sers de ça comme excuse pour faire des trucs un peu débiles.\n\nJe me suis auto-appris à coder, dessiner et faire de la musique depuis le collège, et maintenant je suis moyen dans tout ça haha.\n\nSi c’est ta première fois ici, n’hésite pas à aller voir mes projets et à en apprendre plus sur moi. Merci d’être passé·e !\n\nEt au fait, je suis fan d’astronomie et d’aviation, ça explique peut-être pourquoi le site ressemble à ça.",
            links: [
              { text: 'Télécharger mon CV en Francais', link: '/resume/Aouab Admou - CV FR.pdf' },
              { text: 'Télécharger mon CV en Anglais', link: '/resume/Aouab Admou - English Resume.pdf' }
            ],
          },
        ],
      },
    },
  },
  {
    id: 'experience',
    position: [-12, 10, -8],
    title: { en: 'Work Experience', fr: 'Expérience professionnelle' },
    code: 'WORK-002',
    texture: '/textures/mars.png',
    color: '#ff6b6b',
    content: {
      en: {
        description: "From [color=lightgreen]Tokyo[/color] to [color=lightgreen]Brussels[/color] to [color=lightgreen]my bedroom[/color] — I've shipped code across continents and time zones. Here's where I've managed not to break production (mostly).",
        items: [
          {
            title: 'Freelance Software Engineer',
            subtitle: 'Part-time, Online',
            description: "[orangepoint][color=orange] MISSION IN PROGRESS[/color]\n\nAs a student, I work with some clients in my free time on a lot of software projects, most involve games (as that happens to be one of my hobbies), implementing websites, managing databases, and more... one of the most interesting tasks I had to work on was implemeting a custom-made data interchange format, inspired by Relaxed JSON.",
            images: [""],
            links: [],
          },
          {
            title: 'Fullstack Space Mission Control Software Engineer',
            subtitle: 'JAOPS, Tokyo, Japan',
            description: "[greenpoint][color=lightgreen] MISSION COMPLETE[/color]\n\nAt JAOPS, I worked as a Fullstack Software Developer on space mission telemetry software, I implemented a powerful visualization tool to assist mission control offiers in space missions, the tool was implemented as a Grafana 11 plugin with Commands Panels, Real-time visualizations, and much more...\n\n[color=#2774d9][pulse]HIGHLIGHT[/pulse][/color] [color=lightblue]These tasks were similar to ones I had completed at another company (Space Apps). After my internship with them in Brussels, the CEO of JAOPS was impressed by my work and hired me. [/color]\n\n[img=/img/jaops-grafana.jpeg]",
            links: [
                { text: 'View Project GitHub Repo', link: 'https://github.com/jaops-space/grafana-yamcs-jaops' },
            ],
          },
          {
            title: 'Fullstack Software Intern',
            subtitle: 'Space Apps, Brussels, Belgium',
            description: "[greenpoint][color=lightgreen] MISSION COMPLETE[/color]\n\nAt Space Apps, I built a Grafana 11 plugin for spacecraft telemetry and commanding using Yamcs. I implemented real-time 3D spacecraft visualization with Three.js just [i]because I convinced my team that looking at graphs that represent coordinates is useless.[/i]\n\n[img=/img/spaceapps.png]",
            links: [],
          },
          {
            title: 'Production Assistant',
            subtitle: 'ADVEEZ, Toulouse, France',
            description: "[purplepoint][color=violet] INITIAL MISSION (COMPLETE)[/color]\n\nAaah, my first ever internship, it was such an interesting experience, where I learned about how a company that provides electronic solutions to major airports in the world, manages inventory, shipping, production and even programming of the solutions.",
            links: [],
          },
        ],
      },
      fr: {
        description: "De Tokyo à Bruxelles jusqu’à ma chambre — j’ai déployé du code sur plusieurs continents et fuseaux horaires. Voici les endroits où je n’ai (presque) pas fait planter la prod.",
        items: [
          {
            title: 'Freelance Software Engineer',
            subtitle: 'À temps partiel, en ligne',
            description: "[orangepoint][color=orange] MISSION EN COURS[/color]\n\nEn tant qu’étudiant, je bosse avec quelques clients sur mon temps libre. Plein de projets logiciels, souvent des jeux (vu que c’est un de mes hobbies), des sites web, gestion de bases de données… Le truc le plus cool : j’ai implémenté un format d’échange de données custom, inspiré de Relaxed JSON.",
            links: [],
          },
          {
            title: 'Fullstack Space Mission Control Software Engineer',
            subtitle: 'JAOPS, Tokyo, Japon',
            description: "[greenpoint][color=lightgreen] MISSION TERMINÉE[/color]\n\nChez JAOPS, j’ai bossé en fullstack sur des logiciels de télémétrie pour missions spatiales. J’ai créé un outil de visu puissant pour aider les opérateurs en salle de contrôle : plugin Grafana 11 avec panneaux de commandes, visu en temps réel, etc.\n\n[color=#2774d9][pulse]HIGHLIGHT[/pulse][/color] [color=lightblue]C’était assez proche de ce que j’avais fait chez Space Apps. Après mon stage à Bruxelles, le CEO de JAOPS a kiffé mon travail et m’a embauché direct.[/color]\n\n[img=/img/jaops-grafana.jpeg]",
            links: [
              { text: 'Voir le repo GitHub du projet', link: 'https://github.com/jaops-space/grafana-yamcs-jaops' },
            ],
          },
          {
            title: 'Stagiaire fullstack',
            subtitle: 'Space Apps, Bruxelles, Belgique',
            description: "[greenpoint][color=lightgreen] MISSION TERMINÉE[/color]\n\nChez Space Apps, j’ai développé un plugin Grafana 11 pour la télémétrie et les commandes de satellites avec Yamcs. J’ai ajouté une visu 3D temps réel du vaisseau avec Three.js, juste parce que j’ai convaincu l’équipe que regarder des graphs de coordonnées c’était nul.\n\n[img=/img/spaceapps.png]",
            links: [],
          },
          {
            title: 'Assitant en Production',
            subtitle: 'ADVEEZ, Toulouse, France',
            description: "[purplepoint][color=violet] PREMIÈRE MISSION (TERMINÉE)[/color]\n\nMon tout premier stage, une expérience géniale. J’ai découvert comment une boîte qui fournit des solutions électroniques aux gros aéroports gère stocks, expéditions, production et même programmation des équipements.",
            links: [],
          },
        ],
      },
    }
  },
  {
    id: 'projects',
    position: [2, 0, 0],
    title: { en: 'Projects', fr: 'Projets' },
    code: 'PROJ-003',
    texture: '/textures/jupiter.png',
    color: '#fff8f3',
    metalness: 1,
    content: {
      en: {
        description: "Things I've built when I should have been sleeping. From multiplayer games to AI libraries, here's my digital graveyard of ambitious ideas (that actually work).",
        items: [
          {
            title: 'Cherry',
            subtitle: "Programming Language",
            description: "Yes, you read it correctly. Because there weren't enough programming languages in the world, I made another one. This is an open-source interpreted and typed language with C-style syntax. It compiles, it runs, it probably has bugs. I made it just to show how bored I can get.",
            links: [
              { text: 'Online Playground & Compiler', link: 'https://github.com/kateonbxsh/Cherry' },
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/Cherry' },
            ],
          },
          {
            title: 'Grafana-Yamcs Integration',
            subtitle: "Open-Source space telemetry plugin for Grafana",
            description: "This is a plugin I have worked with JAOPS for visualization telemetry and telecommands from space missions using Yamcs, it includes a lot of high-end features like powerful real-time graphs, commanding panels, acknowledgements, and is fully optimized to be used by multiple space mission operators.\n\n[img=/img/jaops-grafana.jpeg]",
            links: [
              { text: 'GitHub Repository', link: 'https://github.com/yamcs/grafana-yamcs-app' },
            ],
          },
          {
            title: 'Rivalium',
            subtitle: "Multiplayer Competitive Platformer",
            description: "5 years of my life condensed into a competitive multiplayer platformer. \n\nThis is a video game I have been working on for the longest time, it includes features like account server with WebSocket API, MongoDB database, dual TCP/UDP game server, Godot client in C#, Next.js website, and React admin panel. It's basically a distributed systems textbook, with a bunch of moving parts working together, truly a marvel in my eyes. \n\n[color=lightgreen]Tech: C#, TypeScript, Express.js, MongoDB, Next.js[/color]\n\n[img=/img/cool.png]",
            links: [
              { text: 'Official website', link: 'https://rivalium.online' },
            ],
          },
          {
            title: 'MiniGPT',
            subtitle: "AI Library",
            description: "I have always wanted to know how AIs worked, so I went ahead and researched about the GPT model and implemented it from scratch. I used this project as a learning opportunity about AIs and LLMs.",
            links: [
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/MiniGPT' },
            ],
          },
          {
            title: 'Tunewave',
            subtitle: "Online Musical Quiz",
            description: "Open-source online musical quiz with persistent leaderboard. For when you want to prove you have better music taste than your friends (you probably don't). Tech: HTML, CSS, JavaScript\n\n[img=/img/tunewave.png]",
            links: [
              { text: 'Play', link: 'https://kateonbxsh.github.io/Tunewave' },
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/Tunewave' },
            ],
          },
          {
            title: 'VersionFlow',
            subtitle: "CLI Tool",
            description: "CLI tool for project version management integrated with Git and npm. Because manually updating version numbers is for people with too much time. Tech: JavaScript, Node.js",
            links: [
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/VersionFlow' },
              { text: 'NPM Package', link: 'https://www.npmjs.com/package/versionflow' },
            ],
          },
          {
            title: 'DiscordPresency',
            subtitle: "DLL Extension",
            description: "DLL wrapper for Discord SDK enabling Rich Presence in GameMaker. Now your Discord friends can see you're debugging for the 47th hour straight. Tech: GML, C++",
            links: [
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/DiscordPresency' },
            ],
          },
          {
            title: 'Blue Pulse',
            subtitle: "3D Web Application (just like this one)",
            description: "3D web application for Nuit de l'Informatique 2024. Human body visualization with GLSL ocean shader and interactive UI. Built in 24 hours with way too much caffeine. Tech: JavaScript, Three.js, GLSL\n\n[img=/img/bluepulse.png]",
            links: [
              { text: 'Live Demo', link: 'https://kateonbxsh.github.io/BluePulse/' },
              { text: 'GitHub Repo', link: 'https://github.com/kateonbxsh/BluePulse'}
            ],
          },
          {
            title: 'Culture Lock',
            subtitle: "Online Interactive Escape Game",
            description: "Interactive escape-game-like web experience focused on intercultural learning. It's educational AND fun, which is apparently possible. Tech: JavaScript, GML\n\n[img=/img/culturelock.png]",
            links: [
              { text: 'Play', link: 'https://kateonbxsh.github.io/CultureLock/' },
            ],
          },
        ],
      },
      fr: {
        description: "Des trucs que j’ai codés au lieu de dormir. Des jeux multijoueurs aux petites libs IA, voici mon cimetière numérique d’idées trop ambitieuses (mais qui marchent vraiment).",
        items: [
          {
            title: 'Cherry',
            subtitle: 'Langage de programmation',
            description: "Oui t’as bien lu. Y’avait pas assez de langages, j’en ai fait un de plus. Un langage interprété, typé, avec une syntaxe style C. Il compile, il tourne, il a sûrement des bugs. Fait juste pour voir jusqu’où va mon ennui.",
            links: [
              { text: 'Playground & compilateur en ligne', link: 'https://github.com/kateonbxsh/Cherry' },
              { text: 'Repo GitHub', link: 'https://github.com/kateonbxsh/Cherry' },
            ],
          },
          {
            title: 'Grafana-Yamcs Integration',
            subtitle: 'Plugin open-source télémétrie spatiale pour Grafana',
            description: "Plugin que j’ai bossé avec JAOPS pour visualiser télémétrie et télécommandes de missions spatiales via Yamcs. Plein de features costaudes : graphs temps réel, panneaux de commandes, accusés de réception, optimisé pour plusieurs opérateurs en même temps.\n\n[img=/img/jaops-grafana.jpeg]",
            links: [
              { text: 'Repo GitHub', link: 'https://github.com/jaops-space/grafana-yamcs-jaops' },
            ],
          },
          {
            title: 'Rivalium',
            subtitle: 'Plateformer compétitif multijoueur',
            description: "Cinq ans de ma vie condensés dans un plateformer compétitif en multi.\n\nLe projet que j’ai le plus bossé : serveur de comptes avec API WebSocket, base MongoDB, serveur de jeu TCP+UDP, client Godot en C#, site Next.js et panel admin React. C’est carrément un manuel de systèmes distribués vivant. Un bijou à mes yeux.\n\n[color=lightgreen]Technos : C#, TypeScript, Express.js, MongoDB, Next.js[/color]\n\n[img=/img/cool.png]",
            links: [
              { text: 'Site officiel', link: 'https://rivalium.online' },
            ],
          },
          {
            title: 'MiniGPT',
            subtitle: 'Librairie IA',
            description: "J’ai toujours voulu comprendre comment marchaient les IA, du coup j’ai bossé sur le modèle GPT from scratch. Projet parfait pour apprendre les rouages des LLMs.",
            links: [
              { text: 'Repo GitHub', link: 'https://github.com/kateonbxsh/MiniGPT' },
            ],
          },
          {
            title: 'Tunewave',
            subtitle: 'Quiz musical en ligne',
            description: "Quiz musical open-source avec classement persistant. Pour prouver que t’as meilleur goût que tes potes (spoiler : probablement pas). Technos : HTML, CSS, JavaScript\n\n[img=/img/tunewave.png]",
            links: [
              { text: 'Jouer', link: 'https://kateonbxsh.github.io/Tunewave/' },
              { text: 'Repo GitHub', link: 'https://github.com/kateonbxsh/Tunewave' },
            ],
          },
          {
            title: 'VersionFlow',
            subtitle: 'Outil CLI',
            description: "Outil CLI pour gérer les versions de projet avec Git et npm. Parce que mettre à jour les numéros à la main c’est pour les gens qui ont trop de temps libre. Technos : JavaScript, Node.js",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/VersionFlow' },
              { text: 'NPM Package', link: 'https://www.npmjs.com/package/versionflow' },
            ],
          },
          {
            title: 'DiscordPresency',
            subtitle: 'Extension DLL',
            description: "Wrapper DLL pour le SDK Discord qui ajoute le Rich Presence dans GameMaker. Maintenant tes potes Discord voient que tu débugges depuis 47 heures d’affilée. Technos : GML, C++",
            links: [
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/DiscordPresency' },
            ],
          },
          {
            title: 'Blue Pulse',
            subtitle: 'Appli web 3D (comme ce site)',
            description: "Appli web 3D pour la Nuit de l’Informatique 2024. Visu du corps humain avec shader GLSL océan et UI interactive. Fait en 24 h avec trop de caféine. Technos : JavaScript, Three.js, GLSL\n\n[img=/img/bluepulse.png]",
            links: [
              { text: 'Démo live', link: 'https://kateonbxsh.github.io/BluePulse/' },
              { text: 'GitHub', link: 'https://github.com/kateonbxsh/BluePulse' },
            ],
          },
          {
            title: 'Culture Lock',
            subtitle: 'Escape game interactif en ligne',
            description: "Expérience web style escape game axée sur l’apprentissage interculturel. C’est éducatif ET fun, qui l’aurait cru. Technos : JavaScript, GML\n\n[img=/img/culturelock.png]",
            links: [
              { text: 'Jouer', link: 'https://kateonbxsh.github.io/CultureLock/' },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'skills',
    position: [-12, -20, -12],
    title: { en: 'Technical Skills', fr: 'Compétences Techniques' },
    code: 'TECH-004',
    texture: '/textures/Savannah.png',
    color: '#ffffff',
    content: {
      en: {
        description: "My digital toolbox. I don't know how I got here, but I promise I know how to use all that's listed here.",
        items: [
          {
            title: 'Languages I Actually Use',
            description: "C++, C, Java, C#, JavaScript, TypeScript, Python, Go, GML. Yes, I know GML is niche. Yes, it's useful. No, I won't explain why.",
            links: [],
          },
          {
            title: 'Front-End Magic',
            description: "React, Next.js, Tailwind CSS, Vue, Bootstrap, Three.js.",
            links: [],
          },
          {
            title: 'Back-End Wizardry',
            description: "Express.js, Java Spring, MongoDB, PostgreSQL, TCP/UDP, WebSockets, REST APIs.",
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
        description: "Ma boîte à outils numérique. Je sais pas trop comment j’en suis arrivé là, mais promis je sais me servir de tout ce qui est listé.",
        items: [
          {
            title: 'Langages que j’utilise vraiment',
            description: "C++, C, Java, C#, JavaScript, TypeScript, Python, Go, GML. Oui je sais GML c’est niche. Oui c’est utile. Non je t’expliquerai pas pourquoi.",
            links: [],
          },
          {
            title: 'Front-end',
            description: "React, Next.js, Tailwind CSS, Vue, Bootstrap, Three.js.",
            links: [],
          },
          {
            title: 'Back-end',
            description: "Express.js, Java Spring, MongoDB, PostgreSQL, TCP/UDP, WebSockets, APIs REST.",
            links: [],
          },
          {
            title: 'DevOps & outils',
            description: "Git, GitHub Actions, Docker, Kubernetes, CI/CD, Linux, Jira, Agile. Je peux containeriser ton app et la faire scaler. Est-ce que ce sera joli ? Ça c’est une autre histoire.",
            links: [],
          },
          {
            title: 'Compétences spéciales',
            description: "Systèmes temps réel, architectures distribuées, télémétrie spatiale (oui vraiment), networking multijoueur, programmation 3D. Tout ce qui fait bouger les données vite et qui rend bien.",
            links: [],
          },
        ],
      },
    },
  },
  {
    id: 'contact',
    position: [8, -35, -12],
    title: { en: 'Get In Touch', fr: 'Contact' },
    code: 'COMM-005',
    texture: '/textures/Icy.png',
    color: '#a4f3ff',
    metalness: 1,
    roughness: .4,
    content: {
      en: {
        description: "Want to build something cool? Need someone who can debug production at 3 AM? Looking for an intern who won't crash your server? Let's talk.",
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
            description: "Based in Toulouse, France. Home of Airbus, great wine, and questionable amounts of cassoulet. Open to remote work but also relocating for the right opportunity.",
            links: [],
          },
          {
            title: 'Availability',
            description: "Seeking a 4-month internship starting June 2026. Interested in: software development, AI development, embedded systems, distributed architectures, real-time applications, 3D graphics, or anything that makes me say 'wait, we can DO that?'",
            links: [],
          },
          {
            title: 'Resume (CV)',
            description: "If you wanna summarize all of this website into one document, feel free to download my resume.",
            links: [
              { text: 'Download French Resume', link: '/resume/Aouab Admou - CV FR.pdf' },
              { text: 'Download English Resume', link: '/resume/Aouab Admou - English Resume.pdf' }
            ],
          },
        ],
      },
      fr: {
        description: "Envie de créer un truc cool ensemble ? Besoin de quelqu’un qui debug la prod à 3h du mat’ ? À la recherche d’un stagiaire qui ne fera pas crasher ton serveur? On discute !",
        items: [
          {
            title: 'Email',
            description: "La bonne vieille méthode. Je check vraiment celui-là, promis.",
            links: [
              { text: 'aouabadmou@gmail.com', link: 'mailto:aouabadmou@gmail.com' },
            ],
          },
          {
            title: 'LinkedIn',
            description: "Pour faire sérieux. J’accepte ta demande sauf si tu vends des formations crypto.",
            links: [
              { text: 'linkedin.com/in/aouab', link: 'https://linkedin.com/in/aouab' },
            ],
          },
          {
            title: 'GitHub',
            description: "Là où vit tout mon code. Juges mes messages de commit à tes risques et périls.",
            links: [
              { text: 'github.com/kateonbxsh', link: 'https://github.com/kateonbxsh' },
            ],
          },
          {
            title: 'Localisation',
            description: "Basé à Toulouse, France. Maison d’Airbus, de bon vin et de quantités discutables de cassoulet. Ouvert au remote ou à la relocalisation pour la bonne opportunité.",
            links: [],
          },
          {
            title: 'Disponibilité',
            description: "Dispo pour un stage de 4 mois à partir de juin 2026. Intéressé par : dev logiciel, IA, systèmes embarqués, architectures distribuées, applis temps réel, 3D, ou tout ce qui fait dire « attends, on peut faire ÇA ? »",
            links: [
              { text: 'Download English Resume', link: '/resume/Aouab Admou - English Resume.pdf' },
              { text: 'Download French Resume', link: '/resume/Aouab Admou - CV FR.pdf' },
            ],
          },
          {
            title: 'CV',
            description: "Si tu veux resumer tout ce site dans un seul document, voici mon CV :)",
            links: [
              { text: 'Télécharger mon CV en Francais', link: '/resume/Aouab Admou - CV FR.pdf' },
              { text: 'Télécharger mon CV en Anglais', link: '/resume/Aouab Admou - English Resume.pdf' }
            ],
          },
        ],
      },
    },
  },
];