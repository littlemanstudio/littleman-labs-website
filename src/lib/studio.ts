import * as THREE from "three";

/* One museum-studio environment for every WebGL object on the page: a warm softbox
   left, a cool teal strip right, a soft top light and a ring-shaped light behind. */
export function studioEnv(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x06141a);
  const light = (w: number, h: number, pos: [number, number, number], rgb: [number, number, number]) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(rgb[0], rgb[1], rgb[2]), side: THREE.DoubleSide, toneMapped: false }),
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    envScene.add(m);
  };
  light(6, 8, [-7, 4, 4], [7, 4.4, 2.6]);
  light(2, 10, [8, 1, -4], [1.7, 3.4, 4.6]);
  light(10, 2, [0, 8, 2], [1.6, 1.8, 1.8]);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.32, 12, 80),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(9, 9, 9), toneMapped: false }),
  );
  ring.position.set(0, 1, -7);
  envScene.add(ring);
  const texture = pmrem.fromScene(envScene, 0.03).texture;
  return {
    texture,
    dispose() {
      pmrem.dispose();
    },
  };
}
