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
  const soundBtn = section.querySelector(".code-scroll-sound");
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

  // Autoplay only works muted, so it starts silent and this button lets
  // whoever wants the audio turn it on with a tap.
  if (!soundBtn) return;
  const label = (key, fallback) => {
    const lang = document.documentElement.getAttribute("lang") || "es";
    const dict = (window.LITTLEMAN_I18N && window.LITTLEMAN_I18N[lang]) || {};
    return dict[key] != null ? dict[key] : fallback;
  };
  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    soundBtn.textContent = video.muted
      ? label("home.codeScroll.unmute", "Activar sonido")
      : label("home.codeScroll.mute", "Silenciar");
    soundBtn.setAttribute("aria-label", soundBtn.textContent);
  });
}
