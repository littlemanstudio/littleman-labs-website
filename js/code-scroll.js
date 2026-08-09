/* Littleman Labs, pinned build-process clip.

   Used to be a 4-frame scroll-scrubbed AI image sequence (same technique
   as Apple's AirPods/Vision Pro pages). Replaced 2026-08-09 with the real
   "A que te dedicas" ad clip, muted/looped, so the pinned section shows
   actual footage instead of AI-generated stand-ins. A talking clip can't
   be scrubbed frame-by-frame the way a produced image sequence can (it
   doesn't read cleanly played backward), so this plays/pauses the video
   instead of tying its currentTime to scroll progress. IntersectionObserver
   over ScrollTrigger here since all this needs is "visible -> play, not
   visible -> pause", no pin/scrub math involved. */

initCodeScroll();

function initCodeScroll() {
  const section = document.getElementById("codeScroll");
  if (!section) return;
  const video = section.querySelector(".code-scroll-video");
  if (!video) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // poster frame stands in, video never plays

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(video);
}
