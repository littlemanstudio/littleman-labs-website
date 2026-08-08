/* Littleman Labs, room-to-room transition.

   Primary path: real generated video, not a fade, a camera walking down
   the corridor from one room's photo into the next (start/end frames were
   the actual assets/img/lab/*.jpg stills, run through Higgsfield, then
   sped up + motion-interpolated smooth with ffmpeg). The four rooms sit on
   a loop (entry -> workshop -> studio -> comms -> entry), and every one of
   the 4 edges has a clip in BOTH directions (the "reverse" ones are the
   same footage played backward via ffmpeg's `reverse` filter, not the
   video element's playbackRate, Chromium doesn't support negative
   playbackRate reliably). Going somewhere that isn't a direct neighbor
   (e.g. About -> Contact skips nothing, but Home -> Nosotros is 2 hops the
   "wrong way" round) plays two clips back-to-back through the connecting
   room, see RING + clipSequence(). Every one of the 4 pages can reach
   every other page this way; the plain CSS wipe below is a last-resort
   fallback, not the normal path.

   Fallback path: a transform wipe, not a fade, a fixed panel rotated
   90deg off-screen at rest, swung to 0deg on navigation to cover the
   viewport like a door (mechanic studied from vectrfl.com's own
   transition CSS).

   This site is static HTML with real multi-page navigation (no
   client-side router), so both paths have to survive an actual document
   unload/reload: play the cover animation, THEN navigate once the screen
   is fully covered. The incoming page would otherwise flash its raw,
   uncovered content for a frame before this file even runs, so a tiny
   inline script in <head> (see index.html etc.) reads the sessionStorage
   flags this file sets and adds `.lm-precovered` (+ `data-precover-zone`
   for the video path, so the incoming page can hold on the destination
   room's own still frame instead of the flat panel) to <html>
   synchronously, pre-paint. This file then reveals it once the new page
   is actually ready. */

const FLAG = "lm-room-covered";
const ZONE_FLAG = "lm-room-zone";
const COVER_MS = 560;
const REVEAL_MS = 340;
const CLIP_MS = 2200;

const RING = ["entry", "workshop", "studio", "comms"];

const PAGE_ZONE = {
  // Clean-URL keys (vercel.json cleanUrls) are what location.pathname
  // actually yields now, the .html keys stay only as a defensive
  // fallback in case something ever links the old extension directly.
  "": "entry",
  "index": "entry",
  "index.html": "entry",
  "services": "workshop",
  "services.html": "workshop",
  "about": "studio",
  "about.html": "studio",
  "contact": "comms",
  "contact.html": "comms",
};

initReveal();
initIntercept();

function zoneForPath(pathname) {
  const file = pathname.split("/").pop();
  return PAGE_ZONE[file] || null;
}

function clipSequence(fromZone, toZone) {
  const i = RING.indexOf(fromZone);
  const j = RING.indexOf(toZone);
  if (i === -1 || j === -1 || i === j) return null;
  const diff = (j - i + RING.length) % RING.length;
  if (diff === 1 || diff === RING.length - 1) {
    return [fromZone + "-" + toZone + ".mp4"];
  }
  const mid = RING[(i + 1) % RING.length];
  return [fromZone + "-" + mid + ".mp4", mid + "-" + toZone + ".mp4"];
}

function initReveal() {
  const el = document.querySelector(".room-transition");
  const photoEl = document.querySelector(".room-transition-photo");
  if (!el || !document.documentElement.classList.contains("lm-precovered")) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add("is-revealing");
      if (photoEl) photoEl.classList.add("is-revealing");
      window.setTimeout(() => {
        el.classList.remove("is-covering", "is-covered", "is-revealing");
        if (photoEl) photoEl.classList.remove("is-revealing");
        document.documentElement.classList.remove("lm-precovered");
        document.documentElement.removeAttribute("data-precover-zone");
        sessionStorage.removeItem(FLAG);
        sessionStorage.removeItem(ZONE_FLAG);
      }, REVEAL_MS);
    });
  });
}

function initIntercept() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = document.querySelector(".room-transition");
  const videoEl = document.querySelector(".room-transition-video");
  if (!el) return;

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest("a[href]");
    if (!link || (link.target && link.target !== "_self")) return;

    const url = new URL(link.href, location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return;
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    const fromZone = document.body.dataset.labZone;
    const toZone = zoneForPath(url.pathname);
    const clips = videoEl && fromZone && toZone ? clipSequence(fromZone, toZone) : null;

    e.preventDefault();

    if (clips) {
      // Warm the destination room photo in cache while the clip(s) play,
      // so it's ready to paint instantly as the incoming page's precover
      // instead of popping in after a delay.
      sessionStorage.setItem(ZONE_FLAG, toZone);
      const preload = new Image();
      preload.src = "assets/img/lab/" + toZone + ".jpg";
      playSequenceThenGo(videoEl, clips, link.href);
    } else {
      sessionStorage.removeItem(ZONE_FLAG);
      el.classList.add("is-covering");
      sessionStorage.setItem(FLAG, "1");
      window.setTimeout(() => {
        location.href = link.href;
      }, COVER_MS);
    }
  });
}

function playSequenceThenGo(videoEl, clips, href) {
  sessionStorage.setItem(FLAG, "1");
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    location.href = href;
  };

  let i = 0;
  const playNext = () => {
    if (i >= clips.length) {
      go();
      return;
    }
    videoEl.src = "assets/video/" + clips[i];
    i++;

    // Don't reveal the video element until it actually has a frame ready.
    // Adding `is-playing` immediately (before any data has loaded) exposes
    // the element's graphite background as a bare flash, since preload is
    // "none" and there's nothing decoded yet, negligible on fast desktop
    // connections but a visible black-then-choppy stutter on slower mobile
    // ones. Wait for canplay (with a safety timeout in case it never fires,
    // e.g. the clip fails to load) so the current page stays on screen
    // until the clip is actually ready to play smoothly.
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      videoEl.classList.add("is-playing");
      const playPromise = videoEl.play();
      if (playPromise && playPromise.catch) playPromise.catch(go);
    };
    videoEl.addEventListener("canplay", reveal, { once: true });
    window.setTimeout(reveal, 800);
  };
  videoEl.addEventListener("ended", playNext);
  playNext();

  window.setTimeout(go, clips.length * CLIP_MS);
}
