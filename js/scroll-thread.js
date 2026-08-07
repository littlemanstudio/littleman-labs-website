/* Littleman Labs, global background: slow bronze contour waves.
   Replaces the earlier orbital-ring/glow-orb system, which read as
   decorative "AI ambient art" with nothing real behind it. This is a
   quieter, more disciplined effect, a handful of thin flowing wave
   lines, one accent color, low opacity, closer to how real premium
   sites use ambient motion (as a restrained atmosphere, not a focal
   object).

   The animation clock persists across page navigations via
   sessionStorage, so the waves don't visibly "restart" when you move
   from page to page, the motion reads as one continuous background
   the whole site shares, not a fresh instance per page. */

const TIME_KEY = "lm-wave-t";

initWaveField();

function initWaveField() {
  const wrap = document.querySelector(".bg-field");
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || !wrap) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const BRONZE = "216, 168, 105"; // matches --bronze-bright, as an rgb triplet

  const layers = [
    { baseY: 0.62, amp: 46, freq: 0.0016, freq2: 0.0031, speed: 0.028, speed2: -0.019, width: 1.6, opacity: 0.22, glow: 16 },
    { baseY: 0.74, amp: 34, freq: 0.0021, freq2: 0.0038, speed: -0.021, speed2: 0.015, width: 1.2, opacity: 0.14, glow: 0 },
    { baseY: 0.85, amp: 24, freq: 0.0027, freq2: 0.0045, speed: 0.017, speed2: -0.023, width: 1, opacity: 0.09, glow: 0 },
    { baseY: 0.94, amp: 16, freq: 0.0033, freq2: 0.005, speed: -0.014, speed2: 0.026, width: 1, opacity: 0.06, glow: 0 },
  ];

  let w = 0, h = 0;
  function resize() {
    w = wrap.clientWidth || window.innerWidth;
    h = wrap.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  let scrollProgress = 0;
  function readScroll() {
    const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
  }
  readScroll();

  let pointerX = 0;
  function readPointer(e) {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
  }

  function drawFrame(t) {
    ctx.clearRect(0, 0, w, h);
    layers.forEach((layer, i) => {
      const compress = 1 - scrollProgress * 0.18;
      const lift = scrollProgress * h * 0.05 * (i % 2 === 0 ? 1 : -1);
      const y0 = layer.baseY * h - lift;
      const phaseShift = pointerX * 24 * (i + 1) * 0.4;

      ctx.beginPath();
      const step = Math.max(6, Math.floor(w / 180));
      for (let x = -step; x <= w + step; x += step) {
        const y =
          y0 +
          Math.sin((x + phaseShift) * layer.freq + t * layer.speed) * layer.amp * compress +
          Math.sin((x + phaseShift) * layer.freq2 + t * layer.speed2) * layer.amp * 0.45 * compress;
        if (x === -step) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${BRONZE}, ${layer.opacity})`;
      ctx.lineWidth = layer.width;
      if (layer.glow) {
        ctx.shadowColor = `rgba(${BRONZE}, 0.5)`;
        ctx.shadowBlur = layer.glow;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    });
  }

  // Resume the shared clock from wherever the last page left it.
  let t = parseFloat(sessionStorage.getItem(TIME_KEY)) || 0;

  if (reduceMotion) {
    drawFrame(t);
    return;
  }

  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("pointermove", readPointer, { passive: true });

  let lastFrameTime = performance.now();
  let saveTimer = 0;
  function tick(now) {
    const dt = Math.min(now - lastFrameTime, 50);
    lastFrameTime = now;
    t += dt;
    drawFrame(t);

    saveTimer += dt;
    if (saveTimer > 200) {
      saveTimer = 0;
      sessionStorage.setItem(TIME_KEY, String(t));
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem(TIME_KEY, String(t));
  });
}
