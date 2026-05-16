(function () {
  var DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

  var PROJECT_CATALOG = {
    "personal-portfolio": {
      title: "Personal portfolio site",
      description:
        "A polished one-page portfolio that highlights coursework, projects, and contact in a single scroll experience. Built with semantic HTML, layered CSS, and lightweight JavaScript for reveal animations, showcase tabs, and project filtering — all tuned for readability and accessibility on a vibrant blue–purple gradient.",
      image: "../images/projects/portfolio.png?v=3",
      imageAlt: "Personal portfolio hero: bio, profile photo, and stat highlights on a dark gradient",
      liveUrl: "index.html#home",
      githubUrl: "https://github.com/Tyreik-917/personal_website",
      technologies: [
        { name: "HTML", icon: "html5/html5-original.svg" },
        { name: "CSS", icon: "css3/css3-original.svg" },
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      ],
      features: [
        "Responsive layout with showcase tabs for projects, certificates, and tech stack.",
        "Category filters on the project grid with an empty-state when no cards match.",
        "Reveal-on-scroll and staggered motion for a calm, intentional first impression.",
        "Guestbook and mailto contact flow without a backend dependency.",
      ],
    },
    "bmo-game-boy": {
      title: "BMO Game Boy System",
      description:
        "A custom handheld inspired by Adventure Time’s BMO, built around a Raspberry Pi 5 and RetroPie. The build focuses on a cohesive boot-to-game experience: themed UI, mapped controls, and reliable save/load to SD so sessions pick up where you left off.",
      image: "../images/projects/bmo.jpg",
      imageAlt: "Pixel T-Rex from Chrome's offline dinosaur game",
      liveUrl: null,
      githubUrl: null,
      technologies: [
        { name: "Python", icon: "python/python-original.svg" },
        { name: "Raspberry Pi", icon: "raspberrypi/raspberrypi-original.svg" },
        { name: "Linux", icon: "linux/linux-original.svg" },
      ],
      features: [
        "RetroPie-based emulation with a tailored launcher and asset set.",
        "GPIO / controller mapping tuned for comfortable play sessions.",
        "Persistent storage for saves and configuration on removable media.",
        "Hardware–software integration focused on stability and polish.",
      ],
    },
    "call-listener-portal": {
      title: "CLP (Call Listener Portal)",
      description:
        "A B2B-oriented concept for ingesting call and chat transcripts and surfacing structured insight. NeuralSeek-style AI is used to summarize themes, risks, and follow-ups so teams can review conversations faster than reading raw logs end to end.",
      image: "../images/projects/CLP.jpg",
      imageAlt: "Call Listener Portal project",
      liveUrl: null,
      githubUrl: "https://github.com/wwwwwwwwwwwwwmmmmmm/SBUHacks2025",
      technologies: [
        { name: "TypeScript", icon: "typescript/typescript-original.svg" },
        { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
        { name: "React", icon: "react/react-original.svg" },
      ],
      features: [
        "Transcript ingestion pipeline with clear separation of parsing vs analysis.",
        "LLM-backed summaries aimed at managers and support leads.",
        "Role-based views for scanning many conversations in one sitting.",
        "Extensible service layout for swapping models or storage later.",
      ],
    },
    "phishing-chrome-extension": {
      title: "Phishing Chrome Extension",
      description:
        "A browser extension that inspects email-like content and flags likely phishing using a trained classifier. A small Flask service and SQLite store support lightweight training workflows and quick iteration on new phishing patterns.",
      image: "../images/projects/Phishing.jpg",
      imageAlt: "Phishing detection project",
      liveUrl: null,
      githubUrl: "https://github.com/ThePayneBringer/PhishingDetector-StackHacks",
      technologies: [
        { name: "Python", icon: "python/python-original.svg" },
        { name: "Flask", icon: "flask/flask-original.svg" },
        { name: "SQLite", icon: "sqlite/sqlite-original.svg" },
      ],
      features: [
        "Chrome extension UI for on-page warnings and explanations.",
        "ML model focused on phishing vs legitimate message features.",
        "Flask API for inference and simple dataset management.",
        "SQLite persistence for low-friction local deployment.",
      ],
    },
    "financial-market-watch": {
      title: "Financial Market Watch System",
      description:
        "A distributed-style market data experiment using Python services and RabbitMQ for message passing. Docker packages dependencies so the pipeline can be reproduced on a laptop or small cluster without manual broker setup.",
      image: "../images/projects/market_watch.jpg",
      imageAlt: "Market data project",
      liveUrl: null,
      githubUrl: null,
      technologies: [
        { name: "Python", icon: "python/python-original.svg" },
        { name: "RabbitMQ", icon: "rabbitmq/rabbitmq-original.svg" },
        { name: "Docker", icon: "docker/docker-original.svg" },
      ],
      features: [
        "Producer–consumer flow for ticks or batches over a message bus.",
        "Containerized services for repeatable builds across machines.",
        "Separation of ingestion, transform, and notification stages.",
        "Room to plug in dashboards or persistence without rewriting core workers.",
      ],
    },
    fundpath: {
      title: "FundPath",
      description:
        "FundPath streamlines procurement for fundraisers by combining automated price research with mapping views of vendors and timelines. The goal is fewer spreadsheets and clearer decisions when teams shop for events, trips, or programs.",
      image: "../images/projects/fundpath.jpg",
      imageAlt: "FundPath project",
      liveUrl: null,
      githubUrl: "https://github.com/Tyreik-917",
      technologies: [
        { name: "React", icon: "react/react-original.svg" },
        { name: "TypeScript", icon: "typescript/typescript-original.svg" },
        { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
      ],
      features: [
        "React front end with flows tuned for organizer workflows.",
        "TypeScript end-to-end for safer refactors as features grow.",
        "Research helpers that compare options before committing spend.",
        "Extensible data model for campaigns, line items, and vendors.",
      ],
    },
    "mom-ai": {
      title: "M.O.M. AI",
      description:
        "M.O.M. AI is a personal assistant concept that bundles scheduling, lightweight email triage, and carbon footprint analytics. The emphasis is on practical day-to-day automation with transparent summaries rather than a black-box chat-only interface.",
      image: "../images/projects/MOM_AI.jpg",
      imageAlt: "M.O.M. AI project",
      liveUrl: "https://devpost.com/software/m-o-m-87m2uy",
      githubUrl: null,
      technologies: [
        { name: "React", icon: "react/react-original.svg" },
        { name: "FastAPI", icon: "fastapi/fastapi-original.svg" },
        { name: "SQLite", icon: "sqlite/sqlite-original.svg" },
      ],
      features: [
        "Unified dashboard for calendar blocks and follow-up tasks.",
        "Email triage helpers with human-readable rationale snippets.",
        "Footprint estimates tied to routine actions and travel assumptions.",
        "FastAPI backend with clear routes for each assistant capability.",
      ],
    },
    "escape-room-game": {
      title: "Escape Room Game",
      description:
        "A four-level Pygame escape room with progressive puzzles, inventory-style interactions, and readable level data. Each stage introduces a new mechanic so difficulty ramps without opaque pixel hunting.",
      image: "../images/projects/Escape.jpg",
      imageAlt: "Escape room game",
      liveUrl: null,
      githubUrl: "https://github.com/Tyreik-917/Escape_Room",
      technologies: [
        { name: "Python", icon: "python/python-original.svg" },
        { name: "Pygame", icon: "python/python-original.svg" },
      ],
      features: [
        "Four handcrafted levels with distinct puzzle themes.",
        "State machine–friendly structure for doors, keys, and triggers.",
        "Sprite-based rendering with simple collision feedback.",
        "Readable module layout for adding levels or assets later.",
      ],
    },
  };

  function appendTechPill(listEl, tech) {
    var li = document.createElement("li");
    li.className = "project-detail__tech-pill";
    if (tech.icon) {
      var img = document.createElement("img");
      img.className = "project-detail__tech-pill-img";
      img.src = DEVICON + tech.icon;
      img.alt = "";
      img.width = 22;
      img.height = 22;
      img.loading = "lazy";
      img.decoding = "async";
      li.appendChild(img);
    } else {
      var span = document.createElement("span");
      span.className = "project-detail__tech-pill-fallback";
      span.textContent = (tech.name || "?").slice(0, 2).toUpperCase();
      li.appendChild(span);
    }
    li.appendChild(document.createTextNode(tech.name));
    listEl.appendChild(li);
  }

  function render() {
    var params = new URLSearchParams(window.location.search);
    var slug = (params.get("slug") || "").trim().toLowerCase();
    var data = PROJECT_CATALOG[slug];

    var article = document.getElementById("project-detail-article");
    var missing = document.getElementById("project-detail-not-found");
    if (!article || !missing) {
      return;
    }

    if (!data) {
      missing.hidden = false;
      document.title = "Project not found · Tyreik Rogers";
      return;
    }

    article.hidden = false;
    document.title = data.title + " · Tyreik Rogers";

    var titleEl = document.getElementById("pd-title");
    var descEl = document.getElementById("pd-desc");
    var imgEl = document.getElementById("pd-image");
    var techList = document.getElementById("pd-tech-list");
    var featuresEl = document.getElementById("pd-features");
    var statTech = document.getElementById("pd-stat-tech");
    var statFeat = document.getElementById("pd-stat-features");
    var liveBtn = document.getElementById("pd-live");
    var ghBtn = document.getElementById("pd-github");

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.imageAlt || "";
    }

    if (statTech) statTech.textContent = String((data.technologies || []).length);
    if (statFeat) statFeat.textContent = String((data.features || []).length);

    if (techList) {
      techList.textContent = "";
      (data.technologies || []).forEach(function (t) {
        appendTechPill(techList, t);
      });
    }

    if (featuresEl) {
      featuresEl.textContent = "";
      (data.features || []).forEach(function (line) {
        var li = document.createElement("li");
        li.textContent = line;
        featuresEl.appendChild(li);
      });
    }

    if (liveBtn) {
      if (data.liveUrl) {
        liveBtn.href = data.liveUrl;
        liveBtn.hidden = false;
        if (/^https?:\/\//i.test(data.liveUrl)) {
          liveBtn.target = "_blank";
          liveBtn.rel = "noopener";
        } else {
          liveBtn.removeAttribute("target");
          liveBtn.removeAttribute("rel");
        }
      } else {
        liveBtn.hidden = true;
        liveBtn.removeAttribute("href");
      }
    }

    if (ghBtn) {
      if (data.githubUrl) {
        ghBtn.href = data.githubUrl;
        ghBtn.hidden = false;
      } else {
        ghBtn.hidden = true;
        ghBtn.removeAttribute("href");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
