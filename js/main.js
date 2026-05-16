(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Default entry: land at top of #home (intro). */
  function shouldPreserveScrollForHash() {
    var h = (window.location.hash || "").toLowerCase().replace(/\s+/g, "");
    return h === "#projects" || h === "#contact";
  }

  function scrollToIntroIfDefaultEntry() {
    if (shouldPreserveScrollForHash()) {
      return;
    }
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch (e0) {}
    var root = document.documentElement;
    var prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    try {
      var home = document.getElementById("home");
      if (home && typeof home.scrollIntoView === "function") {
        home.scrollIntoView({ block: "start", inline: "nearest" });
      } else {
        try {
          window.scrollTo({ left: 0, top: 0, behavior: "instant" });
        } catch (e1) {
          window.scrollTo(0, 0);
        }
      }
    } finally {
      root.style.scrollBehavior = prevBehavior;
    }
  }

  scrollToIntroIfDefaultEntry();
  window.addEventListener("load", scrollToIntroIfDefaultEntry);
  window.addEventListener("pageshow", function () {
    scrollToIntroIfDefaultEntry();
  });

  if (!shouldPreserveScrollForHash()) {
    [0, 80, 250, 600].forEach(function (ms) {
      window.setTimeout(function () {
        scrollToIntroIfDefaultEntry();
      }, ms);
    });
  }

  (function pageLoader() {
    function isPortfolioHomePage() {
      var path = window.location.pathname.replace(/\\/g, "/");
      var trimmed = path.replace(/\/+$/, "");
      var lower = (trimmed || "/").toLowerCase();
      if (lower === "/" || lower === "") {
        return true;
      }
      if (lower.endsWith("/index.html")) {
        return true;
      }
      var parts = lower.split("/").filter(Boolean);
      var last = parts[parts.length - 1] || "";
      if (last === "portfolio") {
        return true;
      }
      return false;
    }

    if (!isPortfolioHomePage()) {
      return;
    }

    var SESSION_KEY = "tyreik_site_loader_welcome_v1";
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
    } catch (e) {
      /* private mode / blocked storage — show loader once this session */
    }

    var loader = document.createElement("div");
    loader.id = "page-loader";
    loader.className = "page-loader";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-busy", "true");
    loader.setAttribute("aria-label", "Welcome. Loading portfolio.");
    loader.innerHTML =
      '<div class="page-loader__inner">' +
      '<div class="page-loader__welcome">' +
      '<p class="page-loader__welcome-line1">Welcome to my</p>' +
      '<p class="page-loader__welcome-line2"><span class="page-loader__welcome-gradient">Portfolio Website</span></p>' +
      '<div class="page-loader__glowline" aria-hidden="true"></div>' +
      "</div>" +
      '<div class="page-loader__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Load progress">' +
      '<div class="page-loader__bar"></div></div>' +
      '<p class="page-loader__pct">0%</p>' +
      "</div>";

    document.body.insertBefore(loader, document.body.firstChild);
    document.body.classList.add("page-loader-active");

    if (reduceMotion) {
      loader.classList.add("page-loader--reduced-motion");
    }

    var bar = loader.querySelector(".page-loader__bar");
    var track = loader.querySelector(".page-loader__track");
    var pctEl = loader.querySelector(".page-loader__pct");
    var progress = 0;
    var started = Date.now();
    var preloadSpanMs = reduceMotion ? 700 : 8200;
    var preloadCap = 72;
    var finishMs = reduceMotion ? 700 : 3800;
    var rafId = null;
    var loadFinished = false;
    var finishFrom = 0;
    var finishT0 = 0;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function setProgress(p) {
      progress = Math.min(100, Math.max(0, p));
      if (bar) {
        bar.style.width = progress + "%";
      }
      if (pctEl) {
        pctEl.textContent = Math.round(progress) + "%";
      }
      if (track) {
        track.setAttribute("aria-valuenow", String(Math.round(progress)));
      }
    }

    function preloadFrame() {
      if (loadFinished) {
        return;
      }
      var elapsed = Date.now() - started;
      var phase = Math.min(1, elapsed / preloadSpanMs);
      setProgress(preloadCap * phase);
      rafId = window.requestAnimationFrame(preloadFrame);
    }

    function scheduleDismiss() {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch (e2) {}
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          loader.classList.add("page-loader--done");
          loader.setAttribute("aria-busy", "false");
          document.body.classList.remove("page-loader-active");
          scrollToIntroIfDefaultEntry();
          window.setTimeout(function () {
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
            scrollToIntroIfDefaultEntry();
          }, 340);
        });
      });
    }

    function finishFrame() {
      var t = Math.min(1, (Date.now() - finishT0) / finishMs);
      setProgress(finishFrom + (100 - finishFrom) * easeInOutCubic(t));
      if (t < 1) {
        rafId = window.requestAnimationFrame(finishFrame);
      } else {
        rafId = null;
        scheduleDismiss();
      }
    }

    function onWindowLoad() {
      if (loadFinished) {
        return;
      }
      loadFinished = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      finishFrom = progress;
      finishT0 = Date.now();
      rafId = window.requestAnimationFrame(finishFrame);
    }

    rafId = window.requestAnimationFrame(preloadFrame);

    if (document.readyState === "complete") {
      window.setTimeout(onWindowLoad, 0);
    } else {
      window.addEventListener("load", onWindowLoad);
    }
  })();

  if (!reduceMotion) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.insertBefore(glow, document.body.firstChild);

    var lx = window.innerWidth * 0.5;
    var ly = window.innerHeight * 0.5;
    glow.style.setProperty("--cursor-x", lx + "px");
    glow.style.setProperty("--cursor-y", ly + "px");
    var rafId = null;

    function applyGlow() {
      glow.style.setProperty("--cursor-x", lx + "px");
      glow.style.setProperty("--cursor-y", ly + "px");
      rafId = null;
    }

    function queueGlow(clientX, clientY) {
      lx = clientX;
      ly = clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyGlow);
      }
    }

    document.addEventListener("mousemove", function (e) {
      queueGlow(e.clientX, e.clientY);
    });

    document.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches.length) {
          queueGlow(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var filterBar = document.querySelector(".project-filters");
  if (filterBar) {
    var projectGrid = document.getElementById("project-grid");
    var projectCards = projectGrid ? projectGrid.querySelectorAll(".project-card") : [];
    var emptyHint = document.getElementById("project-empty");

    function categoriesFromCard(card) {
      var raw = card.getAttribute("data-category") || "";
      return raw.trim().split(/\s+/).filter(Boolean);
    }

    function applyProjectFilter(slug) {
      var visible = 0;
      for (var i = 0; i < projectCards.length; i++) {
        var card = projectCards[i];
        var cats = categoriesFromCard(card);
        var show = slug === "all" || cats.indexOf(slug) !== -1;
        card.classList.toggle("is-hidden", !show);
        if (show) visible++;
      }
      if (emptyHint) {
        var none = visible === 0;
        emptyHint.classList.toggle("is-visible", none);
        emptyHint.hidden = !none;
      }
    }

    filterBar.querySelectorAll(".project-filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter") || "all";
        filterBar.querySelectorAll(".project-filter").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyProjectFilter(f);
      });
    });
  }

  var showcaseTablist = document.querySelector(".showcase-tabs");
  if (showcaseTablist) {
    var showcaseTabs = showcaseTablist.querySelectorAll(".showcase-tab");
    var panelBySlug = {
      projects: document.getElementById("showcase-panel-projects"),
      certificates: document.getElementById("showcase-panel-certificates"),
      tech: document.getElementById("showcase-panel-tech"),
    };

    function revealShowcasePanel(panel) {
      if (!panel) {
        return;
      }
      panel.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    var showcaseViewAllWrap = document.querySelector(".showcase-view-all-wrap");
    var showcaseViewAllBtn = document.getElementById("showcase-view-all-btn");

    function syncShowcaseViewAll(slug) {
      if (!showcaseViewAllBtn || !showcaseViewAllWrap) {
        return;
      }
      if (slug === "tech") {
        showcaseViewAllWrap.hidden = true;
        return;
      }
      showcaseViewAllWrap.hidden = false;
      if (slug === "certificates") {
        showcaseViewAllBtn.href = "certificates.html";
        showcaseViewAllBtn.textContent = "View all certificates";
        return;
      }
      showcaseViewAllBtn.href = "projects.html";
      showcaseViewAllBtn.textContent = "View all projects";
    }

    function activateShowcaseTab(slug) {
      var panel = panelBySlug[slug];
      if (!panel) {
        return;
      }

      showcaseTabs.forEach(function (tab) {
        var isMatch = tab.getAttribute("data-showcase") === slug;
        tab.classList.toggle("is-active", isMatch);
        tab.setAttribute("aria-selected", isMatch ? "true" : "false");
        tab.setAttribute("tabindex", isMatch ? "0" : "-1");
      });

      Object.keys(panelBySlug).forEach(function (key) {
        var p = panelBySlug[key];
        if (!p) {
          return;
        }
        var show = key === slug;
        p.hidden = !show;
        p.classList.toggle("is-active", show);
        if (show) {
          revealShowcasePanel(p);
        }
      });

      syncShowcaseViewAll(slug);
    }

    showcaseTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var slug = tab.getAttribute("data-showcase") || "projects";
        activateShowcaseTab(slug);
      });
    });

    function showcaseTabFromQuery() {
      try {
        var params = new URLSearchParams(window.location.search);
        var raw = (params.get("tab") || "").toLowerCase();
        var map = {
          projects: "projects",
          certificates: "certificates",
          certificate: "certificates",
          certs: "certificates",
          tech: "tech",
          stack: "tech",
          skills: "tech",
        };
        if (map[raw]) {
          activateShowcaseTab(map[raw]);
        }
      } catch (e) {}
    }

    showcaseTabFromQuery();

    var initialShowcase =
      (document.querySelector(".showcase-tab.is-active") &&
        document.querySelector(".showcase-tab.is-active").getAttribute("data-showcase")) ||
      "projects";
    syncShowcaseViewAll(initialShowcase);
  }

})();
