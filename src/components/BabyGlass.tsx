"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { studioEnv } from "@/lib/studio";

/* ---------------------------------------------------------------------------
   Structure (from the reference video)
   - Hero: object centred, head clear, ring behind the head; the headline crosses the
     BODY only (never the face).
   - Every other scene is two rigid zones: a text column and an empty `.slot`. The baby
     measures its slot live and fits inside it, so it cannot cross the text.
   - Travelling between slots it holds, then moves, dipping in opacity mid-move.
   ------------------------------------------------------------------------- */
type Ring = { dx: number; dy: number; r: number };
type Spec = {
  id: string;
  ry: number;
  rx: number;
  maxH: number;
  side: "r" | "l" | "none";
  fixed?: { x: number; y: number; h: number; gx: number; gy: number; gr: number };
  ring?: Ring;
  away?: boolean;
};

const desktop: Spec[] = [
  { id: "top", ry: -0.1, rx: 0.02, maxH: 1.05, side: "none", fixed: { x: 0.5, y: 0.62, h: 1.05, gx: 0.51, gy: 0.4, gr: 0.34 } },
  { id: "film", ry: -0.1, rx: 0.02, maxH: 0.5, side: "none", away: true },
  { id: "idea", ry: -0.22, rx: 0.05, maxH: 0.8, side: "r", ring: { dx: -0.02, dy: -0.2, r: 0.29 } },
  { id: "services", ry: -0.15, rx: 0.05, maxH: 0.8, side: "r", ring: { dx: 0.02, dy: -0.2, r: 0.29 } },
  { id: "about", ry: -0.1, rx: 0.02, maxH: 0.5, side: "none", away: true },
  { id: "work", ry: 0.2, rx: 0.05, maxH: 0.5, side: "none", away: true },
  { id: "finale", ry: -0.2, rx: 0.04, maxH: 0.9, side: "r", ring: { dx: 0, dy: -0.2, r: 0.32 } },
  { id: "end", ry: -0.2, rx: 0.02, maxH: 0.5, side: "none", away: true },
];
/* Inner pages: one statue that lives in a sticky `.page-slot` beside the text and scrolls away with it. */
const pageSpec: Spec = { id: "page", ry: -0.22, rx: 0.03, maxH: 0.82, side: "r", ring: { dx: -0.02, dy: -0.22, r: 0.3 } };

const mobile: Spec[] = desktop.map((k) =>
  k.id === "top"
    ? { ...k, maxH: 0.64, fixed: { x: 0.5, y: 0.37, h: 0.64, gx: 0.51, gy: 0.24, gr: 0.22 } }
    : k,
);

/* apparent width of the model (in units of its height) for a given yaw */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function BabyGlass({ page = false }: { page?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();
    const FOV = 28;
    const DIST = 6;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.set(0, 0, DIST);

    /* museum studio: warm softbox left, cool rim right, a ring-shaped light behind */
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const env = studioEnv(renderer);
    scene.environment = env.texture;
    const key = new THREE.DirectionalLight(0xffc094, 3.2);
    key.position.set(-2, 2.2, 5);
    const rim = new THREE.DirectionalLight(0x9fc4d0, 2.2);
    rim.position.set(4, 1, -3);
    const fill = new THREE.DirectionalLight(0xffe2c8, 1.1);
    fill.position.set(0.5, 0.6, 6);
    scene.add(key, rim, fill, new THREE.AmbientLight(0x506470, 0.4));

    const rig = new THREE.Group();
    const spin = new THREE.Group();
    rig.add(spin);
    scene.add(rig);
    const statueMats: THREE.Material[] = [];

    /* thick white ring with a soft halo, drawn behind the baby */
    const ringRig = new THREE.Group();
    const ringMats: THREE.MeshBasicMaterial[] = [];
    (
      [
        { tube: 0.03, op: 0.96, add: false },
        { tube: 0.075, op: 0.2, add: true },
        { tube: 0.17, op: 0.07, add: true },
      ] as const
    ).forEach((c) => {
      const m = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: c.op,
        depthWrite: false,
        toneMapped: false,
        blending: c.add ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      ringMats.push(m);
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(1, c.tube, 16, 240), m);
      mesh.renderOrder = 0;
      ringRig.add(mesh);
    });
    scene.add(ringRig);

    let dead = false;
    let photoDone!: () => void;
    const photoReady = new Promise<void>((res) => (photoDone = res));
    const photo = new THREE.TextureLoader().load("/models/crystal-front.webp", photoDone, undefined, photoDone);
    photo.colorSpace = THREE.SRGBColorSpace;
    photo.anisotropy = 8;
    let ready = false;
    const dims = { wx: 1.3, wz: 0.7 }; // apparent width / depth in units of the model's height
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load("/models/crystal.glb", (gltf) => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const size = box.getSize(new THREE.Vector3());
      const c = box.getCenter(new THREE.Vector3());
      obj.position.sub(c);
      const holder = new THREE.Group();
      holder.add(obj);
      holder.scale.setScalar(1 / size.y);
      dims.wx = size.x / size.y;
      dims.wz = size.z / size.y;
      obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.geometry.computeBoundingBox();
        const bb = m.geometry.boundingBox!;
        if (!m.geometry.attributes.normal) m.geometry.computeVertexNormals();
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        mats.forEach((mm) => {
          const st = mm as THREE.MeshStandardMaterial;
          st.metalness = 0;
          st.roughness = 0.12;
          st.envMapIntensity = 0.7;
          if (st.map) {
            st.emissiveMap = st.map;
            st.emissive = new THREE.Color(0xffffff);
            st.emissiveIntensity = 1.25;
            st.color.setScalar(0.3);
          }
          // The mesh was reconstructed from this exact picture, so the diamond photo is projected
          // back onto its front: every facet, glint, the beret, the pen and the inked face stay
          // photo-sharp. Sides use the baked texture.
          st.onBeforeCompile = (sh) => {
            sh.uniforms.uPhoto = { value: photo };
            sh.uniforms.uBox = { value: new THREE.Vector4(bb.min.x, bb.min.y, bb.max.x - bb.min.x, bb.max.y - bb.min.y) };
            sh.uniforms.uRect = { value: new THREE.Vector4(0.1768, 0.131, 0.625, 0.822) };
            sh.vertexShader = sh.vertexShader
              .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;\nvarying vec3 vObjN;")
              .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObjPos = position;\nvObjN = normalize(normal);");
            sh.fragmentShader = sh.fragmentShader
              .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;\nvarying vec3 vObjN;\nuniform sampler2D uPhoto;\nuniform vec4 uBox;\nuniform vec4 uRect;")
              .replace("void main() {", "void main() {\n  if (vObjPos.y < uBox.y + uBox.w * 0.075) discard;")
              .replace(
                "#include <emissivemap_fragment>",
                `#include <emissivemap_fragment>
                vec2 puv = uRect.xy + vec2((vObjPos.x - uBox.x) / uBox.z, (vObjPos.y - uBox.y) / uBox.w) * uRect.zw;
                vec3 ph = texture2D(uPhoto, puv).rgb;
                float pw = smoothstep(-0.05, 0.3, normalize(vObjN).z);
                totalEmissiveRadiance = mix(totalEmissiveRadiance, ph * 1.05, pw);
                diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02), pw);`,
              );
          };
          st.customProgramCacheKey = () => "crystal-front";
          st.transparent = true;
          statueMats.push(st);
        });
      });
      spin.add(holder);
      /* Show the statue only once the photo is in and the shaders are compiled off the main thread,
         so its first frame never stalls the page and it fades in smoothly. */
      const compiled = renderer.compileAsync(scene, camera).catch(() => undefined);
      void Promise.all([photoReady, compiled]).then(() => {
        if (dead) return;
        ready = true;
        canvas.dataset.ready = "true";
        document.documentElement.classList.add("gl-baby");
      });
    });

    /* ---- layout + anchors ---- */
    let W = innerWidth;
    let H = innerHeight;
    let anchors: number[] = [];
    const ids = desktop.map((k) => k.id);
    const slots: Record<string, HTMLElement | null> = {};
    const measure = () => {
      W = innerWidth;
      H = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      anchors = ids.map((id) => {
        const sec = document.getElementById(id);
        slots[id] = sec?.querySelector<HTMLElement>(".slot") ?? null;
        if (!sec || id === "top") return 0;
        const el = slots[id] ?? sec;
        const r = el.getBoundingClientRect();
        return Math.max(0, r.top + scrollY + r.height / 2 - H / 2);
      });
    };
    measure();
    window.addEventListener("resize", measure);
    const late = setTimeout(measure, 1200);
    void document.fonts?.ready.then(measure);

    const mouse = new THREE.Vector2();
    const mTarget = new THREE.Vector2();
    const onMove = (e: PointerEvent) => mTarget.set((e.clientX / W) * 2 - 1, (e.clientY / H) * 2 - 1);
    window.addEventListener("pointermove", onMove, { passive: true });

    const wpp = () => (2 * Math.tan((FOV * Math.PI) / 360) * DIST) / H;
    const cur = { x: 0.5, y: 0.57, h: 0.95, ry: -1.6, rx: 0.04, al: 0, gx: 0.5, gy: 0.32, gr: 0.34, ga: 0 };
    type Cur = typeof cur;

    /* Where does this scene want the baby right now, in viewport fractions? */
    const place = (k: Spec): Cur => {
      const base = { ry: k.ry, rx: k.rx };
      if (k.fixed) {
        const f = k.fixed;
        return { ...base, x: f.x, y: f.y, h: f.h, al: 1, gx: f.gx, gy: f.gy, gr: f.gr, ga: 1 };
      }
      const slot = slots[k.id];
      if (k.away || !slot) {
        return { ...base, x: 0.5, y: 1.45, h: k.maxH, al: 0, gx: 0.5, gy: 1.45, gr: 0.2, ga: 0 };
      }
      const r = slot.getBoundingClientRect();
      const hpx = Math.min(k.maxH * H, (r.width * 0.94) / (dims.wx * Math.abs(Math.cos(k.ry)) + dims.wz * Math.abs(Math.sin(k.ry))));
      let cy = H * 0.53;
      if (r.height > hpx) cy = Math.min(Math.max(cy, r.top + hpx / 2), r.bottom - hpx / 2);
      else cy = r.top + r.height / 2;
      const cx = r.left + r.width / 2;
      const ring = k.ring!;
      const gx = cx + ring.dx * hpx;
      const gy = cy + ring.dy * hpx;
      // the ring may bleed off the outer edge but never into the text side
      let rpx = ring.r * H;
      if (k.side === "r") rpx = Math.min(rpx, gx - r.left);
      if (k.side === "l") rpx = Math.min(rpx, r.right - gx);
      rpx = Math.max(rpx, 0.08 * H);
      return { ...base, x: cx / W, y: cy / H, h: hpx / H, al: 1, gx: gx / W, gy: gy / H, gr: rpx / H, ga: 1 };
    };

    let first = true;
    let raf = 0;
    const t0 = performance.now();
    let last = t0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!ready || document.hidden) return;
      const keys = W < 861 ? mobile : desktop;

      let target: Cur;
      if (page) {
        // several slots may exist (e.g. header and a lower section): follow the most visible one
        let best: HTMLElement | null = null;
        let bestV = -1;
        document.querySelectorAll<HTMLElement>(".page-slot").forEach((el) => {
          const r = el.getBoundingClientRect();
          const vis = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
          const v = vis / Math.max(1, Math.min(r.height, H));
          if (v > bestV) {
            bestV = v;
            best = el;
          }
        });
        slots.page = best;
        target = place(W < 861 ? { ...pageSpec, away: true } : pageSpec);
        const fade = smooth(0.12, 0.55, Math.max(0, bestV));
        target.al *= fade;
        target.ga *= fade;
      } else {
        const s = scrollY;
        let i = 0;
        while (i < anchors.length - 2 && s > anchors[i + 1]) i++;
        const a0 = anchors[i];
        const a1 = anchors[i + 1];
        const t = a1 > a0 ? Math.min(1, Math.max(0, (s - a0) / (a1 - a0))) : 0;
        // hold in the current zone, move in the middle of the leg, settle in the next zone
        const e = smooth(0.1, 0.6, t);
        const p0 = place(keys[i]);
        const p1 = place(keys[i + 1]);
        const L = (a: number, b: number, k = e) => a + (b - a) * k;
        // fade out early on the way to the contact section, before its heading
        const ea = i === keys.length - 2 ? Math.min(1, e * 2.2) : e;
        const dip = 1 - 0.8 * Math.sin(Math.PI * e);
        target = {
          x: L(p0.x, p1.x),
          y: L(p0.y, p1.y),
          h: L(p0.h, p1.h),
          ry: L(p0.ry, p1.ry),
          rx: L(p0.rx, p1.rx),
          al: L(p0.al, p1.al, ea) * dip,
          gx: L(p0.gx, p1.gx),
          gy: L(p0.gy, p1.gy),
          gr: L(p0.gr, p1.gr),
          ga: L(p0.ga, p1.ga, ea) * dip,
        };


      }

      const now = performance.now();
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const d = first ? 1 : 1 - Math.exp(-dt * 7);
      const dr = first ? 1 : 1 - Math.exp(-dt * 4.5);
      (Object.keys(cur) as (keyof Cur)[]).forEach((k) => {
        const rate = k === "gx" || k === "gy" || k === "gr" || k === "ga" ? dr : d;
        cur[k] += (target[k] - cur[k]) * rate;
      });
      first = false;

      mouse.lerp(mTarget, 1 - Math.exp(-dt * 3));
      const time = (now - t0) / 1000;
      const bob = Math.sin(time * 0.9) * 0.01;

      const u = wpp();
      const hpx = cur.h * H;
      rig.scale.setScalar(hpx * u);
      rig.position.set((cur.x * W - W / 2) * u, -(cur.y * H - H / 2) * u + bob * hpx * u, 0);
      spin.rotation.set(cur.rx + mouse.y * 0.08, cur.ry + mouse.x * 0.08 + Math.sin(time * 0.35) * 0.04, 0);

      ringRig.scale.setScalar(Math.max(0.001, cur.gr * H * u));
      ringRig.position.set((cur.gx * W - W / 2) * u, -(cur.gy * H - H / 2) * u, -0.2);
      ringRig.rotation.set(0.14 + Math.sin(time * 0.4) * 0.04 + mouse.y * 0.04, 0.22 + Math.sin(time * 0.3) * 0.05 + mouse.x * 0.06, 0);

      const al = Math.max(0, Math.min(1, cur.al));
      const ga = Math.max(0, Math.min(1, cur.ga));
      statueMats.forEach((m) => {
        m.opacity = al;
        m.visible = al > 0.004;
      });
      ringMats[0].opacity = 0.96 * ga;
      ringMats[1].opacity = 0.2 * ga;
      ringMats[2].opacity = 0.07 * ga;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      clearTimeout(late);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("gl-baby");
      env.dispose();
      statueMats.forEach((m) => m.dispose());
      photo.dispose();
      ringMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [page]);

  return <canvas ref={ref} className="baby-canvas" aria-hidden="true" />;
}
