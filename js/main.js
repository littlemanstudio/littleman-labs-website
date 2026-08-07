/* Littleman Labs — shared site behavior */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initSplitWords();
  initReveal();
  initContactForm();
  initFrameButtons();
  initFlipLinks();
  initMagneticButtons();
});

/* Ported from 21st.dev "Frame Button" (radiumcoders/frame-button) — the
   real component injects 4 chevron markers (Tabler chevron-left/right-up/
   down paths) around the button that translate outward on hover. Applied
   here via JS injection instead of hand-typing 4 SVGs per button instance. */
const FRAME_CHEVRON_PATHS = {
  tl: "M8 16v-8h8",
  tr: "M16 16v-8h-8",
  br: "M16 8v8h-8",
  bl: "M8 8v8h8",
};
function initFrameButtons() {
  // Scoped to the primary CTA only — applying this to every button on every
  // page read as decorative chrome rather than a real signature moment.
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    Object.entries(FRAME_CHEVRON_PATHS).forEach(([corner, d]) => {
      const marker = document.createElement("span");
      marker.className = `btn-corner ${corner}`;
      marker.setAttribute("aria-hidden", "true");
      marker.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
      btn.appendChild(marker);
    });
  });
}

/* Ported from 21st.dev "Flip Links" (vaib215/flip-links) — per-letter
   vertical flip reveal on hover: each letter exists twice (current row +
   duplicate row offset below), staggered 25ms apart; hover slides the top
   row up and out while the duplicate row slides up into place. */
function initFlipLinks() {
  // Touch has no real :hover — tapping a link triggers the CSS hover state
  // for an instant before the <a> navigates, so the per-letter stagger
  // (up to ~300ms for a longer word) gets cut off mid-flight and reads as
  // "only half the word animated." Real bug, found 2026-08-06. Skip the
  // split-row treatment on touch devices entirely; plain text has no
  // animation to interrupt. Matches the existing guard on magnetic buttons.
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const text = link.textContent.trim();
    link.setAttribute("aria-label", text);
    const row = (translateClass) =>
      `<span class="flip-row ${translateClass}">` +
      text
        .split("")
        .map((ch, i) => `<span style="transition-delay:${i * 25}ms">${ch === " " ? "&nbsp;" : ch}</span>`)
        .join("") +
      `</span>`;
    link.innerHTML = `<span class="flip-link-inner">${row("flip-row-top")}${row("flip-row-bottom")}</span>`;
  });
}

function initPreloader() {
  const el = document.querySelector(".preloader");
  const countEl = document.querySelector(".preloader-count");
  const hero = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero-title");
  const revealHero = () => {
    if (hero) hero.classList.add("is-ready");
    if (heroTitle) heroTitle.classList.add("split-ready");
  };

  if (!el) { revealHero(); return; }

  // The full animated count-up is a nice first-impression moment, but
  // replaying it on every single page navigation adds a needless ~1.1s
  // delay to perceived load time, hurts conversion, and (now that
  // navigation plays a room-to-room view transition) reads as the site
  // reloading instead of transitioning. Play it once per session; every
  // page after that never activates the preloader at all — it stays
  // hidden by its CSS default, so there's nothing to fade out and no flash.
  const alreadySeen = sessionStorage.getItem("llPreloaderSeen") === "1";

  if (alreadySeen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealHero();
    return;
  }

  el.classList.add("is-active");
  sessionStorage.setItem("llPreloaderSeen", "1");
  let n = 0;
  const start = performance.now();
  const minDuration = 1100;
  const tick = () => {
    const elapsed = performance.now() - start;
    n = Math.min(100, Math.round((elapsed / minDuration) * 100));
    if (countEl) countEl.textContent = String(n).padStart(2, "0");
    if (elapsed < minDuration) {
      requestAnimationFrame(tick);
    } else {
      el.classList.remove("is-active");
      el.classList.add("is-hidden");
      revealHero();
    }
  };
  requestAnimationFrame(tick);
}

const CONTACT_FORM_ENDPOINT = "https://formsubmit.co/ajax/info@littlemanlabs.com";

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = form.querySelector(".form-success");
  const btn = form.querySelector('button[type="submit"]');

  // Read the current-language string from the dictionary at submit time
  // (not cached at page load) so it stays correct if the visitor switches
  // language after the page has rendered.
  function i18nText(key, fallback) {
    const lang = document.documentElement.getAttribute("lang") || "es";
    const dict = (window.LITTLEMAN_I18N && window.LITTLEMAN_I18N[lang]) || {};
    return dict[key] != null ? dict[key] : fallback;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      if (!field.value || !field.value.trim()) valid = false;
    });
    if (!valid) return;

    if (btn) { btn.disabled = true; btn.style.opacity = "0.7"; }

    fetch(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
      .then(() => {
        if (status) {
          status.textContent = i18nText("contact.form.success", "Thanks — that's on its way.");
          status.classList.remove("is-error");
          status.classList.add("is-visible");
        }
        form.reset();
      })
      .catch(() => {
        if (status) {
          status.textContent = i18nText("contact.form.error", "Something went wrong — please call or WhatsApp us directly instead.");
          status.classList.add("is-visible", "is-error");
        }
      })
      .finally(() => {
        if (btn) { btn.disabled = false; btn.style.opacity = ""; }
      });
  });
}

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      document.body.style.overflow = "";
    });
  });
}

function initSplitWords() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w, i) => `<span class="split-word"><span style="transition-delay:${i * 50}ms">${w}</span></span>`)
      .join(" ");
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("split-ready")));
  });
}

function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // GSAP + ScrollTrigger give the reveal a real spring-out ease instead of
  // a linear/CSS-eased fade — the one orchestrated scroll moment, applied
  // consistently everywhere [data-reveal] is used, rather than one-off effects.
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((el) => el.classList.add("is-visible"));
        gsap.fromTo(
          batch,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform",
          }
        );
      },
    });

    // Trigger positions are measured against whatever's laid out at this
    // point — before web fonts swap in (Libre Caslon Display reflows
    // headings taller/shorter once it loads) and before lazy images settle.
    // Without a refresh after both, ScrollTrigger's start points go stale
    // and onEnter can silently never fire for content below the hero,
    // leaving it at opacity:0 forever. This was a real site-wide bug found
    // 2026-08-06 (below-the-fold sections invisible on every page).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener("load", () => ScrollTrigger.refresh());
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

/* Magnetic hover — the button eases a few px toward the cursor while inside
   its bounds, and springs back on leave. A tactile, premium-feeling detail
   that layers on top of the existing corner-chevron hover, not a
   replacement for it. */
function initMagneticButtons() {
  if (typeof gsap === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none)").matches) return; // touch devices

  document.querySelectorAll(".btn").forEach((btn) => {
    const moveX = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
    const strength = 0.28;

    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * strength);
      moveY(relY * strength);
    });
    btn.addEventListener("pointerleave", () => {
      moveX(0);
      moveY(0);
    });
  });
}
