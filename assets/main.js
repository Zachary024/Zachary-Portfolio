/* ==========================================================================
   main.js — Zachary Programming
   --------------------------------------------------------------------------
   1. DATA            (assets/projects.js — loaded before this file)
   2. RENDERING       cards, filter chips, quick-view dialog
   3. NAVIGATION
   4. HEADER + ACTIVE LINK
   5. SCROLL REVEAL
   6. BACK TO TOP
   7. CONTACT FORM (EmailJS)
   8. UTILITIES

   HOW TO ADD A PROJECT
     1. Put a 3:2 screenshot (900×600, WebP) in assets/img/.
     2. Add an object to assets/projects.js.
     3. Run tools/build-case-studies.py to generate work/<slug>.html.
     4. Save — the grid reflows 1 → 2 → 3 columns and the filter picks up the
        new category automatically.
   ========================================================================== */

/* ==========================================
   1. DATA
   ========================================== */

/** @type {Array} Loaded from assets/projects.js. Empty grid if it is missing. */
const PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

/* ==========================================
   2. RENDERING
   ========================================== */

/** Escapes a string for safe interpolation into HTML. */
const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Builds one project card.
 * @param {object} p
 * @param {number} i Zero-based index, shown as P.01.
 * @returns {string} HTML
 */
const projectCard = (p, i) => `
  <article class="project" data-reveal data-category="${esc(p.category)}" style="--i:${i % 3}">
    <button
      class="project__media"
      type="button"
      data-quickview="${esc(p.slug)}"
      aria-label="Quick view: ${esc(p.title)}"
    >
      <img
        class="project__img"
        src="${p.image}"
        alt="${esc(p.imageAlt)}"
        width="900"
        height="600"
        loading="lazy"
        decoding="async"
      />
      <span class="project__zoom" aria-hidden="true">
        <i class="ri-zoom-in-line"></i>
        Quick view
      </span>
    </button>

    <div class="project__body">
      <div class="project__top">
        <span class="project__category">${esc(p.category)} · ${esc(p.year)}</span>
        <span class="project__index">P.${String(i + 1).padStart(2, "0")}</span>
      </div>

      <h3 class="project__title">
        <a href="${p.detailUrl}">${esc(p.title)}</a>
      </h3>

      <p class="project__desc">${esc(p.description)}</p>

      <div class="project__footer">
        <a
          class="project__link project__link--detail"
          href="${p.detailUrl}"
        >
          Case study
          <i class="ri-arrow-right-line" aria-hidden="true"></i>
        </a>

        <span class="project__links">
          <a
            class="project__link"
            href="${p.repoUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source code for ${esc(p.title)}"
          >
            <i class="ri-github-fill" aria-hidden="true"></i>
            Code
          </a>

          <a
            class="project__link"
            href="${p.liveUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live demo of ${esc(p.title)}"
          >
            <i class="ri-external-link-line" aria-hidden="true"></i>
            Live
          </a>
        </span>
      </div>
    </div>
  </article>
`;

/** Builds the filter bar from the categories present in the data. */
function filterBar() {
  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];

  const chips = categories
    .map((category, i) => {
      const value = i === 0 ? "all" : category;
      const count =
        i === 0
          ? PROJECTS.length
          : PROJECTS.filter((p) => p.category === category).length;

      return `
        <button
          class="chip"
          type="button"
          data-filter="${esc(value)}"
          aria-pressed="${i === 0}"
        >
          ${esc(category)}
          <span class="chip__count">${count}</span>
        </button>`;
    })
    .join("");

  return `
    <div class="work-filter">
      <div class="work-filter__chips" role="group" aria-label="Filter projects by type">
        ${chips}
      </div>
      <p class="work-filter__status" role="status" aria-live="polite"></p>
    </div>`;
}

/** Builds the quick-view <dialog> once. */
function quickViewDialog() {
  return `
    <dialog class="qv" id="quick-view" aria-labelledby="qv-title">
      <div class="qv__panel">
        <button class="qv__close" type="button" data-qv-close aria-label="Close quick view">
          <i class="ri-close-line" aria-hidden="true"></i>
        </button>
        <div class="qv__media">
          <img class="qv__img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" width="900" height="600" />
        </div>
        <div class="qv__body">
          <p class="qv__meta"></p>
          <h2 class="qv__title" id="qv-title"></h2>
          <p class="qv__desc"></p>
          <dl class="qv__facts">
            <div><dt>Role</dt><dd data-fact="role"></dd></div>
            <div><dt>Timeline</dt><dd data-fact="timeline"></dd></div>
            <div><dt>Stack</dt><dd data-fact="stack"></dd></div>
          </dl>
          <div class="qv__actions">
            <a class="btn btn--primary btn--sm" data-qv-detail href="#">
              Read the case study
              <i class="ri-arrow-right-line" aria-hidden="true"></i>
            </a>
            <button class="btn btn--ghost btn--sm" type="button" data-qv-close>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>`;
}

/** Renders filters + PROJECTS into #work-grid. No-op if the grid is absent. */
function renderProjects() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;

  grid.insertAdjacentHTML("beforebegin", filterBar());
  grid.innerHTML = PROJECTS.map(projectCard).join("");
  document.body.insertAdjacentHTML("beforeend", quickViewDialog());

  initFilter(grid);
  initQuickView();
}

/** Chip filtering. Buttons carry aria-pressed; the result count is announced. */
function initFilter(grid) {
  const chips = [...document.querySelectorAll("[data-filter]")];
  const status = document.querySelector(".work-filter__status");
  const cards = [...grid.querySelectorAll(".project")];
  if (!chips.length) return;

  const apply = (value) => {
    let shown = 0;

    cards.forEach((card) => {
      const match = value === "all" || card.dataset.category === value;
      card.hidden = !match;
      if (match) shown += 1;
    });

    chips.forEach((chip) => {
      chip.setAttribute(
        "aria-pressed",
        String(chip.dataset.filter === value)
      );
    });

    if (status) {
      const label = value === "all" ? "all projects" : `${value} projects`;
      status.textContent = `Showing ${shown} of ${cards.length} — ${label}.`;
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => apply(chip.dataset.filter));
  });

  apply("all");
}

/** Quick view: native <dialog>, so focus trapping and Escape come free. */
function initQuickView() {
  const dialog = document.getElementById("quick-view");
  if (!dialog) return;

  const img = dialog.querySelector(".qv__img");
  const meta = dialog.querySelector(".qv__meta");
  const title = dialog.querySelector(".qv__title");
  const desc = dialog.querySelector(".qv__desc");
  const detail = dialog.querySelector("[data-qv-detail]");
  const facts = {
    role: dialog.querySelector('[data-fact="role"]'),
    timeline: dialog.querySelector('[data-fact="timeline"]'),
    stack: dialog.querySelector('[data-fact="stack"]'),
  };

  let lastTrigger = null;

  const open = (project, trigger) => {
    lastTrigger = trigger;
    img.src = project.image;
    img.alt = project.imageAlt;
    meta.textContent = `${project.category} · ${project.year}`;
    title.textContent = project.title;
    desc.textContent = project.description;
    facts.role.textContent = project.role || "—";
    facts.timeline.textContent = project.timeline || "—";
    facts.stack.textContent = (project.stack || []).join(", ") || "—";
    detail.href = project.detailUrl;
    dialog.showModal();
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-quickview]");
    if (!trigger) return;
    const project = PROJECTS.find((p) => p.slug === trigger.dataset.quickview);
    if (project) open(project, trigger);
  });

  dialog.querySelectorAll("[data-qv-close]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  // Click on the backdrop (the dialog element itself, not the panel) closes.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Native Escape works, but focus return is not guaranteed everywhere.
  dialog.addEventListener("close", () => {
    if (lastTrigger) lastTrigger.focus();
  });
}

/* ==========================================
   3. NAVIGATION
   ========================================== */

/** Mobile menu: toggle, Escape, outside click, and close on link. */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  if (!nav || !toggle) return;

  const isMobile = () => window.matchMedia("(max-width: 899px)").matches;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = open
      ? '<i class="ri-close-line" aria-hidden="true"></i>'
      : '<i class="ri-menu-line" aria-hidden="true"></i>';
  };

  toggle.addEventListener("click", (event) => {
    // Stop the document-level "outside click" handler from also firing:
    // setOpen() replaces the icon markup, so the click target is detached
    // by the time the document listener runs and the check would misfire.
    event.stopPropagation();
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isMobile() || !nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

/* ==========================================
   4. HEADER + ACTIVE LINK
   ========================================== */

/** Header shadow after scroll, and nav highlight for the section in view. */
function initScrollState() {
  const header = document.getElementById("site-header");
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll(".nav__link")];

  let queued = false;

  const update = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);

    if (sections.length && links.length) {
      const trigger = (header ? header.offsetHeight : 0) + 24;
      let current = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= trigger) current = section;
      });

      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${current.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    queued = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      requestAnimationFrame(update);
      queued = true;
    },
    { passive: true }
  );

  update();
}

/* ==========================================
   5. SCROLL REVEAL
   ========================================== */

/** Fades [data-reveal] elements in once, as they enter the viewport. */
function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  items.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-in");
    } else {
      observer.observe(el);
    }
  });
}

/* ==========================================
   6. BACK TO TOP
   ========================================== */

/** Reveals the button past 500px and scrolls up smoothly. */
function initToTop() {
  const button = document.getElementById("to-top");
  if (!button) return;

  let queued = false;
  let footerVisible = false;

  const update = () => {
    // Hidden over the footer, or it sits on top of the copyright line.
    button.classList.toggle("is-shown", window.scrollY > 500 && !footerVisible);
    queued = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      requestAnimationFrame(update);
      queued = true;
    },
    { passive: true }
  );

  const footer = document.querySelector(".site-footer");
  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        footerVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 }
    ).observe(footer);
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  update();
}

/* ==========================================
   7. CONTACT FORM
   ========================================== */

/** EmailJS submit. Replace the three IDs with your own account's. */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-message");
  if (!form || !status) return;

  const SERVICE = "service_3d5s0wm";
  const TEMPLATE = "template_v62h899";
  const KEY = "pzkmi_Zyble90Ot4T";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Honeypot: real people never see this field. If it has a value, show the
    // success message and stop — the bot learns nothing from the silence.
    const trap = form.querySelector('[name="company_website"]');
    if (trap && trap.value.trim() !== "") {
      status.textContent = "Message sent — I'll reply within one working day.";
      form.reset();
      return;
    }

    if (typeof emailjs === "undefined") {
      status.textContent = "Email service unavailable — please email directly.";
      return;
    }

    status.textContent = "Sending…";

    emailjs.sendForm(SERVICE, TEMPLATE, "#contact-form", KEY).then(
      () => {
        status.textContent = "Message sent — I'll reply within one working day.";
        setTimeout(() => {
          status.textContent = "";
        }, 6000);
        form.reset();
      },
      () => {
        status.textContent = "Couldn't send. Please email xharkrii024@gmail.com.";
      }
    );
  });
}

/* ==========================================
   8. UTILITIES
   ========================================== */

/** Footer year. */
function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ==========================================
   BOOT
   ========================================== */
renderProjects();
initNav();
initScrollState();
initReveal();
initToTop();
initContactForm();
initYear();
