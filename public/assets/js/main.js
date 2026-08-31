(function () {
  "use strict";

  var LANG_KEY = "littleman-v2-lang";

  function detectLang() {
    var saved = localStorage.getItem(LANG_KEY);
    if (saved === "es" || saved === "en") return saved;
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < prefs.length; i++) {
      if (/^es/i.test(prefs[i])) return "es";
      if (/^en/i.test(prefs[i])) return "en";
    }
    return "en";
  }

  function applyLang(lang) {
    var dict = (window.LITTLEMAN_I18N && window.LITTLEMAN_I18N[lang]) || {};
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
    localStorage.setItem(LANG_KEY, lang);
  }

  function initLangToggle() {
    applyLang(detectLang());
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  }

  var lenis = null;
  function initLenis() {
    if (!window.Lenis) return;
    lenis = new Lenis({ autoRaf: false, anchors: true });
    window.sysLenis = lenis;
    if (window.gsap) {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }
  }

  function initHeader() {
    var header = document.getElementById("siteHeader");
    var panel = document.getElementById("mobilePanel");
    var openBtn = document.getElementById("hamburgerBtn");
    var closeBtn = document.getElementById("mobileClose");

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var darkZone = document.querySelector(".cta");
    if (darkZone && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        header.classList.toggle("on-dark-zone", entries.some(function (e) { return e.isIntersecting; }));
      }, { rootMargin: "-70px 0px -80% 0px" });
      io.observe(darkZone);
    }

    function openMenu() {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    if (openBtn) openBtn.addEventListener("click", function () {
      panel.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    panel.querySelectorAll("nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) closeMenu();
    });
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function initHeroVideo() {
    var video = document.querySelector(".hero-video");
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  function initStars() {
    var containers = document.querySelectorAll(".stars-bg");
    if (!containers.length) return;

    function generateShadows(count, color) {
      var shadows = [];
      for (var i = 0; i < count; i++) {
        var x = Math.floor(Math.random() * 4000) - 2000;
        var y = Math.floor(Math.random() * 4000) - 2000;
        shadows.push(x + "px " + y + "px " + color);
      }
      return shadows.join(",");
    }

    var layers = [
      { cls: "star-layer--sm", count: 220, size: 1 },
      { cls: "star-layer--md", count: 90, size: 2 },
      { cls: "star-layer--lg", count: 40, size: 3 }
    ];

    containers.forEach(function (container) {
      var color = container.dataset.starColor || "#ffffff";
      layers.forEach(function (layer) {
        var el = container.querySelector("." + layer.cls);
        if (!el) return;
        var shadow = generateShadows(layer.count, color);
        el.querySelectorAll(".dot").forEach(function (dot) {
          dot.style.width = layer.size + "px";
          dot.style.height = layer.size + "px";
          dot.style.boxShadow = shadow;
        });
      });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.addEventListener("mousemove", function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var ox = -(e.clientX - cx) * 0.02;
      var oy = -(e.clientY - cy) * 0.02;
      containers.forEach(function (container) {
        var rect = container.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var px = container.querySelector(".stars-parallax");
        if (px) px.style.transform = "translate(" + ox + "px," + oy + "px)";
      });
    }, { passive: true });
  }

  function initContactForm() {
    var form = document.getElementById("quickForm");
    if (!form) return;
    var status = document.getElementById("formStatus");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        if (!field.value || !field.value.trim()) {
          valid = false;
          field.style.borderColor = "#c0392b";
        } else {
          field.style.borderColor = "";
        }
      });
      if (!valid) return;
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      setTimeout(function () {
        if (status) status.classList.add("is-visible");
        btn.disabled = false;
        form.reset();
      }, 450);
    });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function initChatWidgetTheme() {
    var vars = {
      "--chat-widget-primary-color": "#4C8DFF",
      "--chat-widget-active-color": "#4C8DFF",
      "--chat-widget-bubble-color": "#4C8DFF",
      "--chat-widget-header-color": "#4C8DFF",
      "--chat-widget-header-darken-color": "#044AB3",
      "--chat-widget-sender-message-color": "#4C8DFF",
      "--chat-widget-button-color": "#4C8DFF",
      "--ion-color-primary": "#4C8DFF",
      "--color": "#4C8DFF",
      "--chat-widget-font-family": "'Instrument Sans','Helvetica Neue',Helvetica,Arial,sans-serif",
      "--ion-font-family": "'Instrument Sans','Helvetica Neue',Helvetica,Arial,sans-serif"
    };
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var widget = document.querySelector("chat-widget");
      if (widget) {
        Object.keys(vars).forEach(function (key) {
          widget.style.setProperty(key, vars[key]);
        });
        clearInterval(timer);
      } else if (tries > 40) {
        clearInterval(timer);
      }
    }, 250);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangToggle();
    initLenis();
    initHeader();
    initReveal();
    initHeroVideo();
    initStars();
    initContactForm();
    initYear();
    initChatWidgetTheme();
  });
})();
