/* Littleman Labs — i18n engine. Spanish is the primary/default language
   (Ponce, PR market) — browser-language detection only switches to English
   when the visitor's browser clearly prefers it; the ultimate fallback is
   Spanish, not English. Dictionary lives in js/i18n-dict.js. */

(function () {
  "use strict";

  var LANG_KEY = "littleman-lang";

  function detectLang() {
    // Spanish is the unconditional default for first-time visitors — this
    // is a Ponce, PR business site and Spanish is primary regardless of
    // the visitor's browser/OS language. Only an explicit manual toggle
    // (persisted below) ever switches it to English.
    var saved = localStorage.getItem(LANG_KEY);
    if (saved === "es" || saved === "en") return saved;
    return "es";
  }

  function applyLang(lang) {
    var dict = (window.LITTLEMAN_I18N && window.LITTLEMAN_I18N[lang]) || {};
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr"); // "attr:key"
      var parts = spec.split(":");
      var attr = parts[0], key = parts[1];
      if (dict[key] != null) el.setAttribute(attr, dict[key]);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLangToggle);
  } else {
    initLangToggle();
  }
})();
