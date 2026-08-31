"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "/3d/mascot-bronze.glb";

/* 1:1 port of the live site's js/three-hero.js: bronze mascot sculpture on
   a lit plinth, idle auto-rotation + pointer parallax, GSAP ScrollTrigger
   scrubs extra rotation as the hero section passes, so the piece reads as
   being walked around rather than just spinning in place. */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
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
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) mat.envMapIntensity = 1.1;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 1.7 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y += (size.y * scale) / 2;

        subject.remove(placeholder);
        subject.add(model);
      },
      undefined,
      () => {
        /* GLB missing/failed, keep the bronze placeholder, fail silently. */
      }
    );

    let idleRotY = 0.35;
    let scrollRotY = 0;
    let pointerX = 0;
    let smoothedY = 0.35;
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);

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
      raf = requestAnimationFrame(tick);
    }
    tick();

    let trigger: ScrollTrigger | undefined;
    if (!reduceMotion) {
      trigger = ScrollTrigger.create({
        trigger: wrap.closest("section") ?? wrap,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollRotY = self.progress * 2.2;
        },
      });
    }

    const onResize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      trigger?.kill();
      renderer.dispose();
      plinthGeo.dispose();
      plinthMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      placeholderGeo.dispose();
      placeholderMat.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-canvas-wrap absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
