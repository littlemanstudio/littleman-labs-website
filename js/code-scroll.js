/* Littleman Labs, scroll-scrubbed coding sequence.
   Same technique behind "3D product" scroll showcases (Apple's AirPods/
   Vision Pro pages, etc): not real-time 3D, just a short frame sequence
   swapped based on scroll position inside a pinned section. Because the
   frame shown is a pure function of scroll progress (not time), scrolling
   back up naturally reverses it, no extra logic needed for that part.

   4 frames, image-to-image chained during generation so the person/desk/
   room stay consistent, only the screen content and posture change.
   Crossfades between the two nearest frames to hide the low frame count. */

const FRAME_COUNT = 4;
const FRAME_PATH = (i) => `assets/img/scroll-scene/frame-${i}.jpg`;

initCodeScroll();

function initCodeScroll() {
  const section = document.getElementById("codeScroll");
  if (!section) return;
  const imgA = section.querySelector(".code-scroll-img.is-a");
  const imgB = section.querySelector(".code-scroll-img.is-b");
  if (!imgA || !imgB) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Preload every frame so swaps never show a blank flash.
  const frames = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    const im = new Image();
    im.src = FRAME_PATH(i);
    frames.push(im);
  }

  if (reduceMotion) {
    imgA.src = FRAME_PATH(FRAME_COUNT - 1);
    imgB.style.opacity = 0;
    return;
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    imgA.src = FRAME_PATH(0);
    return;
  }

  imgA.src = FRAME_PATH(0);
  imgB.src = FRAME_PATH(1);
  let currentLow = 0;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.4,
    onUpdate: (self) => {
      const scaled = self.progress * (FRAME_COUNT - 1);
      const low = Math.min(FRAME_COUNT - 2, Math.floor(scaled));
      const frac = scaled - low;

      if (low !== currentLow) {
        imgA.src = FRAME_PATH(low);
        imgB.src = FRAME_PATH(low + 1);
        currentLow = low;
      }
      imgB.style.opacity = frac;
    },
  });
}
