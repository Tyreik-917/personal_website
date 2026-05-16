(function () {
  var CERTIFICATE_CATALOG = {
    "code-next": {
      title: "Code Next",
      meta: "Google · 2022–2025 · New York, NY",
      description:
        "Google Code Next is a multi-year computer science program for teens that blends technical instruction with mentorship and community. Through workshops, projects, and peer collaboration, participants build a foundation in software development while learning how to present work and grow as builders.",
      image: "../images/certifications/codenext.jpg",
      imageAlt: "Code Next certificate of completion — Google",
      skills: [
        "Web development",
        "Python",
        "Collaboration & teamwork",
        "Technical presentations",
        "Problem solving",
      ],
      highlights: [
        "Hands-on coding workshops led by Google engineers and facilitators.",
        "Project-based learning spanning web, scripting, and creative tech.",
        "Mentorship and career exposure in the NYC tech ecosystem.",
        "Certificate of completion recognizing sustained program participation.",
      ],
    },
    teamedge: {
      title: "TeamEdge",
      meta: "Google · 2024–2025 · New York, NY",
      description:
        "TeamEdge is a Google program focused on teamwork, leadership, and applied technology skills. Participants work through structured challenges that mirror how real product teams plan, build, and iterate — strengthening communication alongside technical execution.",
      image: "../images/certifications/teamedge.jpg",
      imageAlt: "TeamEdge certificate of completion — Google",
      skills: [
        "Team leadership",
        "Agile workflows",
        "Product thinking",
        "Technical communication",
        "Project delivery",
      ],
      highlights: [
        "Team-based sprints with defined roles and deliverables.",
        "Exposure to how engineers and PMs coordinate on real initiatives.",
        "Emphasis on feedback, iteration, and clear documentation.",
        "Certificate of completion from Google’s TeamEdge cohort.",
      ],
    },
    "tech-flex-leaders": {
      title: "Tech Flex Leaders",
      meta: "America On Tech · 2024–2025 · Virtual",
      description:
        "Tech Flex Leaders (TFL) is an America On Tech program that prepares students for internships and early careers in technology. The virtual format combines technical depth with professional skills — from résumés and interviewing to building portfolio-ready projects.",
      image: "../images/certifications/tfl.jpg",
      imageAlt: "Tech Flex Leaders certificate of completion — America On Tech",
      skills: [
        "Full-stack fundamentals",
        "Career readiness",
        "Professional networking",
        "Technical interviewing",
        "Portfolio development",
      ],
      highlights: [
        "Virtual instruction with industry-aligned curriculum and mentors.",
        "Career coaching covering internships, LinkedIn, and interview prep.",
        "Capstone-style work aimed at real-world tech roles.",
        "Certificate of completion from America On Tech’s TFL program.",
      ],
    },
  };

  function appendSkillPill(listEl, name) {
    var li = document.createElement("li");
    li.className = "project-detail__tech-pill";
    var span = document.createElement("span");
    span.className = "project-detail__tech-pill-fallback";
    span.textContent = (name || "?").slice(0, 2).toUpperCase();
    li.appendChild(span);
    li.appendChild(document.createTextNode(name));
    listEl.appendChild(li);
  }

  function render() {
    var params = new URLSearchParams(window.location.search);
    var slug = (params.get("slug") || "").trim().toLowerCase();
    var data = CERTIFICATE_CATALOG[slug];

    var article = document.getElementById("certificate-detail-article");
    var missing = document.getElementById("certificate-detail-not-found");
    if (!article || !missing) {
      return;
    }

    if (!data) {
      missing.hidden = false;
      document.title = "Certificate not found · Tyreik Rogers";
      return;
    }

    article.hidden = false;
    document.title = data.title + " · Tyreik Rogers";

    var titleEl = document.getElementById("cd-title");
    var metaEl = document.getElementById("cd-meta");
    var descEl = document.getElementById("cd-desc");
    var imgEl = document.getElementById("cd-image");
    var skillsList = document.getElementById("cd-skills-list");
    var highlightsEl = document.getElementById("cd-highlights");
    var statSkills = document.getElementById("cd-stat-skills");
    var statHighlights = document.getElementById("cd-stat-highlights");
    if (titleEl) titleEl.textContent = data.title;
    if (metaEl) metaEl.textContent = data.meta || "";
    if (descEl) descEl.textContent = data.description;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.imageAlt || "";
    }

    var skills = data.skills || [];
    var highlights = data.highlights || [];

    if (statSkills) statSkills.textContent = String(skills.length);
    if (statHighlights) statHighlights.textContent = String(highlights.length);

    if (skillsList) {
      skillsList.textContent = "";
      skills.forEach(function (name) {
        appendSkillPill(skillsList, name);
      });
    }

    if (highlightsEl) {
      highlightsEl.textContent = "";
      highlights.forEach(function (line) {
        var li = document.createElement("li");
        li.textContent = line;
        highlightsEl.appendChild(li);
      });
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
