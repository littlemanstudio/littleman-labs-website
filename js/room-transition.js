/* Littleman Labs, room-to-room transition.

   Real generated video, not a fade, a camera walking down the corridor
   from one room's photo into the next (start/end frames were the actual
   assets/img/lab/*.jpg stills, run through Higgsfield, then sped up +
   motion-interpolated smooth with ffmpeg). The four rooms sit on a loop
   (entry -> workshop -> studio -> comms -> entry), and every one of the 4
   edges has a clip in BOTH directions (the "reverse" ones are the same
   footage played backward via ffmpeg's `reverse` filter, not the video
   element's playbackRate, Chromium doesn't support negative playbackRate
   reliably). Going somewhere that isn't a direct neighbor (e.g. About ->
   Contact skips nothing, but Home -> Nosotros is 2 hops the "wrong way"
   round) plays two clips back-to-back through the connecting room, see
   RING + clipSequence(). Every one of the 4 pages can reach every other
   page this way.

   There used to be a colored wipe-panel "door" as a fallback/safety cover
   for whenever the video wasn't ready or available. Permanently retired:
   the user explicitly rejected it after it kept showing through as a
   visible flash during the video-transition reveal, even after being
   scoped away from that specific path. The only cover now is the
   destination room's own still photo (with its own solid-color CSS
   fallback if the image hasn't decoded yet), used uniformly whether the
   video plays or not.

   This site is static HTML with real multi-page navigation (no
   client-side router), so this has to survive an actual document
   unload/reload: play the clip, THEN navigate once it's done (or once a
   safety timeout fires). The incoming page would otherwise flash its raw,
   uncovered content for a frame before this file even runs, so a tiny
   inline script in <head> (see index.html etc.) reads the sessionStorage
   flags this file sets and adds `.lm-precovered` + `data-precover-zone`
   to <html> synchronously, pre-paint, so the incoming page holds on the
   destination room's own still frame from its very first paint. This file
   then reveals it once the new page is actually ready. */

const FLAG = "lm-room-covered";
const ZONE_FLAG = "lm-room-zone";
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
prefetchNeighborClips();

// Waiting for `canplay` on click (see playNext below) stops the video
// from being *revealed* before it has a frame, but it doesn't guarantee
// enough is buffered to play smoothly through on a slow connection,
// that's what caused the reported choppiness surviving the first fix.
// The real fix is to have the likely-next clip(s) already cached before
// the click happens at all. From any room there are exactly two direct
// ring neighbors, so this is at most 2 short clips (~250-450KB each),
// fetched into the HTTP cache after the page has had a moment to settle
// and only on a real connection (skips Data Saver / 2G).
function prefetchNeighborClips() {
  const conn = navigator.connection;
  if (conn && (conn.saveData || /^2g/.test(conn.effectiveType || ""))) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const zone = document.body.dataset.labZone;
  const i = RING.indexOf(zone);
  if (i === -1) return;

  const neighbors = [RING[(i + 1) % RING.length], RING[(i - 1 + RING.length) % RING.length]];
  const idle = window.requestIdleCallback || function (fn) { window.setTimeout(fn, 800); };
  idle(function () {
    neighbors.forEach(function (n) {
      fetch("assets/video/" + zone + "-" + n + ".mp4", { credentials: "omit" }).catch(function () {});
    });
  });
}

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
  const photoEl = document.querySelector(".room-transition-photo");
  if (!photoEl || !document.documentElement.classList.contains("lm-precovered")) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      photoEl.classList.add("is-revealing");
      window.setTimeout(() => {
        photoEl.classList.remove("is-revealing");
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
  const videoEl = document.querySelector(".room-transition-video");
  if (!videoEl) return;

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
    const clips = fromZone && toZone ? clipSequence(fromZone, toZone) : null;

    e.preventDefault();

    if (clips) {
      // Warm the destination room photo in cache while the clip(s) play,
      // so it's ready to paint instantly as the incoming page's precover
      // instead of popping in after a delay. This photo (with its own
      // solid-color CSS fallback) is the only cover, for every
      // transition, no separate colored panel.
      sessionStorage.setItem(ZONE_FLAG, toZone);
      const preload = new Image();
      preload.src = "assets/img/lab/" + toZone + ".jpg";
      playSequenceThenGo(videoEl, clips, link.href);
    } else if (toZone) {
      // Destination zone known but no clip sequence for it (shouldn't
      // happen on this 4-room ring in practice), still precover with its
      // photo and just navigate, no video, no separate cover mechanism.
      sessionStorage.setItem(ZONE_FLAG, toZone);
      sessionStorage.setItem(FLAG, "1");
      location.href = link.href;
    } else {
      location.href = link.href;
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
    // the element's graphite background as a bare flash, negligible on a
    // fast desktop connection but visible on slower mobile ones. Wait for
    // canplay, then one more animation frame (canplay can fire a tick
    // before the first frame is actually composited), then reveal. The
    // reveal itself is a CSS opacity fade (not a class-toggle hard cut,
    // see .room-transition-video in style.css) so even a slightly late
    // first frame reads as a soft cross-fade instead of a snap.
    let revealed = false;
    let advanced = false;
    let fallbackTimer = null;

    // Moves to the next clip (or finishes) exactly once, whichever fires
    // first: the video's own `ended` event (the normal path) or the
    // per-clip fallback timer below (only if something actually went
    // wrong, e.g. the clip errors out mid-playback).
    const advance = () => {
      if (advanced) return;
      advanced = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      videoEl.removeEventListener("ended", advance);
      playNext();
    };
    videoEl.addEventListener("ended", advance, { once: true });

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      requestAnimationFrame(() => videoEl.classList.add("is-playing"));
      const playPromise = videoEl.play();
      if (playPromise && playPromise.catch) playPromise.catch(advance);

      // The fallback timer used to be a single deadline set once for the
      // whole sequence, measured from the original click. Any delay
      // getting here (slow network, cold cache, mobile decode latency)
      // ate directly into that shared budget, so a clip could get cut
      // off and navigate away before it had actually finished playing,
      // reported as the transition "cutting off too early." Anchoring
      // it here instead, to when this specific clip actually started
      // playing, means every clip always gets its real ~1.9s (clips are
      // encoded at that length; CLIP_MS leaves a margin) regardless of
      // how long it took to get to this point. This is purely a safety
      // net now, the natural `ended` event above is what normally fires
      // first.
      fallbackTimer = window.setTimeout(advance, CLIP_MS);

      // Also start fetching the *next* clip in a two-hop sequence now,
      // while this one is playing, instead of only once it ends. Only
      // the two direct ring-neighbor clips get warmed ahead of the
      // click (prefetchNeighborClips), so the second leg of a two-room
      // hop (Home<->About, Services<->Contact) used to start loading
      // completely cold right in the middle of the transition, the
      // most visible place for a stutter to land.
      const nextClip = clips[i];
      if (nextClip) {
        fetch("assets/video/" + nextClip, { credentials: "omit" }).catch(function () {});
      }
    };
    videoEl.addEventListener("canplay", reveal, { once: true });
    window.setTimeout(reveal, 800);
  };
  playNext();
}
