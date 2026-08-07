/* Littleman Labs, services plan slider. Native scroll-snap driven by
   arrow buttons and dot indicators; no pin/scrub timeline to fight, so it
   can't collide with page content the way a scroll-pinned carousel can on
   shorter viewports. Works via mouse drag / trackpad / touch out of the
   box because it's a real scrollable element. */

document.addEventListener("DOMContentLoaded", initServicesSlider);

function initServicesSlider() {
  const track = document.getElementById("servicesTrack");
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".service-card"));
  const nav = document.querySelector(".services-slider-nav");
  const dotsEl = nav ? nav.querySelector(".slider-dots") : null;
  const prevBtn = nav ? nav.querySelector('[data-dir="-1"]') : null;
  const nextBtn = nav ? nav.querySelector('[data-dir="1"]') : null;
  if (!cards.length) return;

  const dots = cards.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Go to plan ${i + 1}`);
    dot.addEventListener("click", () => scrollToCard(i));
    dotsEl && dotsEl.appendChild(dot);
    return dot;
  });

  function setActive(index) {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === cards.length - 1;
  }

  function scrollToCard(index) {
    const card = cards[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function currentIndex() {
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - cardCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  let raf = null;
  track.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(currentIndex()));
  }, { passive: true });

  if (prevBtn) prevBtn.addEventListener("click", () => scrollToCard(Math.max(currentIndex() - 1, 0)));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollToCard(Math.min(currentIndex() + 1, cards.length - 1)));

  setActive(0);
}
