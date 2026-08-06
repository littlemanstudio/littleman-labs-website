/* Littleman Labs — ambient background: one continuous building, a different
   room per page (set via body[data-lab-zone], images + CSS in style.css):

     index    -> "entry"    Entry Bay      — reception, the bronze piece on its plinth
     services -> "workshop" The Lab        — server racks + workbench, where builds happen
     about    -> "studio"   The Founder's Bench — one desk, one lamp, a pinboard
     contact  -> "comms"    The Comms Desk — a futuristic reception console + wall clock

   The room image itself just sits in CSS (per-zone background-image rule on
   .bg-scene); this file only adds the "3D-ish" feel — a subtle parallax
   drift toward the pointer, plus slow idle motion — and the room-to-room
   feel is finished by the native cross-document View Transition in
   style.css (`@view-transition { navigation: auto; }`), not JS. */

initParallax();

function initParallax() {
  const scene = document.querySelector(".bg-scene");
  if (!scene) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let targetX = 0,
    targetY = 0,
    curX = 0,
    curY = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );

  const clock = { t: 0, last: performance.now() };
  function tick(now) {
    const dt = Math.min(now - clock.last, 50);
    clock.last = now;
    clock.t += dt;

    curX += (targetX - curX) * 0.03;
    curY += (targetY - curY) * 0.03;
    const driftX = Math.sin(clock.t * 0.00012) * 1.2;
    const driftY = Math.cos(clock.t * 0.00009) * 0.8;

    const x = curX * -14 + driftX;
    const y = curY * -10 + driftY;
    scene.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
