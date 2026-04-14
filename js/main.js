(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
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

      var SESSION_KEY = "tyreik_site_loader_seen";
      try {
        if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
          return;
        }
      } catch (e) {
        /* private mode / blocked storage — show loader once this load only */
      }

      var loader = document.createElement("div");
      loader.id = "page-loader";
      loader.className = "page-loader";
      loader.setAttribute("role", "status");
      loader.setAttribute("aria-busy", "true");
      loader.setAttribute("aria-label", "Loading Tyreik's website");
      loader.innerHTML =
        '<div class="page-loader__inner">' +
        '<p class="page-loader__wordmark"><span>Tyreik\'s</span> Website</p>' +
        '<p class="page-loader__status">Loading <span class="page-loader__dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span></p>' +
        '<div class="page-loader__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Load progress">' +
        '<div class="page-loader__bar"></div></div>' +
        '<p class="page-loader__pct">0%</p>' +
        "</div>";

      document.body.insertBefore(loader, document.body.firstChild);
      document.body.classList.add("page-loader-active");

      var bar = loader.querySelector(".page-loader__bar");
      var track = loader.querySelector(".page-loader__track");
      var pctEl = loader.querySelector(".page-loader__pct");
      var progress = 0;
      var started = Date.now();
      var minVisibleMs = 3000;
      var preloadSpanMs = 3200;
      var preloadCap = 92;
      var finishMs = 900;
      var rafId = null;
      var loadFinished = false;
      var finishFrom = 0;
      var finishT0 = 0;

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function setProgress(p) {
        progress = Math.min(100, Math.max(0, p));
        bar.style.width = progress + "%";
        pctEl.textContent = Math.round(progress) + "%";
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
        setProgress(preloadCap * easeOutCubic(phase));
        rafId = window.requestAnimationFrame(preloadFrame);
      }

      function scheduleDismiss() {
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch (e) {}
        var elapsed = Date.now() - started;
        var extra = Math.max(0, minVisibleMs - elapsed);
        window.setTimeout(function () {
          loader.classList.add("page-loader--done");
          loader.setAttribute("aria-busy", "false");
          document.body.classList.remove("page-loader-active");
          window.setTimeout(function () {
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 600);
        }, extra + 120);
      }

      function finishFrame() {
        var t = Math.min(1, (Date.now() - finishT0) / finishMs);
        setProgress(finishFrom + (100 - finishFrom) * easeOutCubic(t));
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
  }

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

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
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
})();
