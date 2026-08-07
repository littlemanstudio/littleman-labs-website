/* Littleman Labs, hero Three.js scene.
   Loads the bronze mascot sculpture GLB onto a lit plinth. Idle: slow
   auto-rotation + subtle pointer parallax. Scroll: GSAP ScrollTrigger
   scrubs rotation/camera as the hero passes, so the piece feels like
   it's being walked around rather than just spinning in place. */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const MODEL_URL = "assets/3d/mascot-bronze.glb";

initHero();

function initHero() {
  const canvas = document.getElementById("hero-canvas");
  const wrap = document.querySelector(".hero-canvas-wrap");
  if (!canvas || !wrap) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x1c1a17, 0.045);

  const camera = new THREE.PerspectiveCamera(32, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 1.15, 6.4);
  camera.lookAt(0, 0.65, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ---- lighting: single dramatic key + cool rim + faint fill, museum-plinth style
  const key = new THREE.SpotLight(0xffe3c2, 220, 20, Math.PI / 6, 0.45, 1.4);
  key.position.set(-3.2, 5.2, 3.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const rim = new THREE.SpotLight(0x7fb0a8, 90, 20, Math.PI / 5, 0.6, 1.6);
  rim.position.set(3.6, 2.4, -3.2);
  scene.add(rim);

  const fill = new THREE.AmbientLight(0x2a2621, 1.6);
  scene.add(fill);

  const bounce = new THREE.HemisphereLight(0x3a3226, 0x0c0b09, 0.6);
  scene.add(bounce);

  // ---- plinth
  const plinthGeo = new THREE.BoxGeometry(2.6, 0.9, 2.6);
  const plinthMat = new THREE.MeshStandardMaterial({ color: 0x232019, roughness: 0.85, metalness: 0.05 });
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = -0.45;
  plinth.receiveShadow = true;
  scene.add(plinth);

  const groundGeo = new THREE.CircleGeometry(9, 64);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.9;
  ground.receiveShadow = true;
  scene.add(ground);

  // ---- placeholder while GLB loads / if it fails
  const placeholderGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const placeholderMat = new THREE.MeshStandardMaterial({ color: 0xb8874a, roughness: 0.35, metalness: 0.75 });
  const placeholder = new THREE.Mesh(placeholderGeo, placeholderMat);
  placeholder.position.y = 0.55;
  placeholder.castShadow = true;
  scene.add(placeholder);

  const subject = new THREE.Group();
  subject.add(placeholder);
  scene.add(subject);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    MODEL_URL,
    (gltf) => {
      const model = gltf.scene;
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.envMapIntensity = 1.1;
          }
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 1.7 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      // Recentering leaves the model's bottom at -size.y*scale/2; the
      // plinth's top face sits at world y=0, so lift the model by exactly
      // half its height to rest on it (the old "-0.42" fudge factor was
      // sinking it 0.42 units into the plinth).
      model.position.y += (size.y * scale) / 2;

      subject.remove(placeholder);
      subject.add(model);
    },
    undefined,
    () => {
      // GLB missing/failed, keep the bronze placeholder, fail silently.
    }
  );

  // ---- idle motion + pointer parallax + scroll rotation, unified into a
  // single writer of subject.rotation.y (mixing a GSAP-scrubbed tween with a
  // per-frame rAF write on the same property caused visible stutter/fighting
  // as the two systems raced each other every frame, fixed by having the
  // scroll and idle systems only update plain numbers, and one tick() apply
  // the combined result).
  let idleRotY = 0.35;
  let scrollRotY = 0;
  let pointerX = 0;
  let smoothedY = 0.35;

  if (!reduceMotion) {
    window.addEventListener("pointermove", (e) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    });
  }

  const clock = new THREE.Clock();
  function tick() {
    const dt = clock.getDelta();
    if (!reduceMotion) {
      idleRotY += dt * 0.12;
      const target = idleRotY + scrollRotY + pointerX * 0.25;
      smoothedY += (target - smoothedY) * Math.min(dt * 2.2, 1);
      subject.rotation.y = smoothedY;
      placeholder.rotation.x += dt * 0.15;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // ---- scroll-driven rotation (the piece turns as you pass it, like walking
  // around a vitrine, no camera dolly, the frame is small and fixed now)
  if (typeof ScrollTrigger !== "undefined" && !reduceMotion) {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => { scrollRotY = self.progress * 2.2; },
    });
  }

  window.addEventListener("resize", () => {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}
