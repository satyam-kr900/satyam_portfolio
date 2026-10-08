"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEPTH_NAMES = ['UNIVERSE','GALAXY','SOLAR SYSTEM','PLANET','MOON','ATOM','QUARK','STRING','∞'];

const PALETTES = [
  { core:[0,.6,1] as const, ring:[0,.9,1] as const },
  { core:[.8,.2,1] as const, ring:[1,.3,.8] as const },
  { core:[1,.5,.1] as const, ring:[1,.8,.2] as const },
  { core:[.1,1,.5] as const, ring:[.2,1,.8] as const },
  { core:[1,.2,.2] as const, ring:[1,.5,.3] as const },
  { core:[.3,.5,1] as const, ring:[.5,.7,1] as const },
  { core:[1,.9,.2] as const, ring:[1,1,.5] as const },
  { core:[.5,1,1] as const, ring:[.7,1,.9] as const },
];

type MiniUserData = {
  type: 'mini';
  orbitR: number;
  orbitAngle: number;
  orbitSpeed: number;
  mRadius: number;
};

type SystemUserData = {
  core: THREE.Points;
  rings: THREE.Points;
  depth: number;
  pal: { core: readonly number[]; ring: readonly number[] };
};

function createPlanetSystem(depth: number, parentPos?: THREE.Vector3): THREE.Group {
  const pal = PALETTES[depth % PALETTES.length];
  const group = new THREE.Group();
  if (parentPos) group.position.copy(parentPos);

  // Core planet — sphere of particles
  const coreCount = 8000 + depth * 2000;
  const coreGeo = new THREE.BufferGeometry();
  const cPos = new Float32Array(coreCount * 3);
  const cCol = new Float32Array(coreCount * 3);
  const radius = 3;

  for (let i = 0; i < coreCount; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * Math.PI * 2;
    const r = radius * (0.85 + Math.random() * 0.15);
    cPos[i*3] = r * Math.sin(theta) * Math.cos(phi);
    cPos[i*3+1] = r * Math.sin(theta) * Math.sin(phi);
    cPos[i*3+2] = r * Math.cos(theta);

    const variation = Math.random() * 0.3;
    cCol[i*3] = pal.core[0] + variation * 0.2;
    cCol[i*3+1] = pal.core[1] + variation * 0.3;
    cCol[i*3+2] = pal.core[2] + variation * 0.2;
  }
  coreGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
  coreGeo.setAttribute('color', new THREE.BufferAttribute(cCol, 3));

  const coreMat = new THREE.PointsMaterial({
    size: 0.05, vertexColors: true, transparent: true,
    opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const core = new THREE.Points(coreGeo, coreMat);
  group.add(core);

  // Inner glow sphere
  const glowGeo = new THREE.SphereGeometry(radius * 0.6, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(pal.core[0], pal.core[1], pal.core[2]),
    transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  // Rings
  const ringCount = 10000;
  const ringGeo = new THREE.BufferGeometry();
  const rPos = new Float32Array(ringCount * 3);
  const rCol = new Float32Array(ringCount * 3);
  for (let i = 0; i < ringCount; i++) {
    const r = 5 + Math.random() * 3;
    const a = Math.random() * Math.PI * 2;
    rPos[i*3] = Math.cos(a) * r;
    rPos[i*3+1] = (Math.random() - 0.5) * 0.15;
    rPos[i*3+2] = Math.sin(a) * r;

    const t = a / (Math.PI * 2);
    rCol[i*3] = pal.ring[0] * (0.5 + t * 0.5);
    rCol[i*3+1] = pal.ring[1] * (0.3 + t * 0.7);
    rCol[i*3+2] = pal.ring[2] * (0.6 + (1-t) * 0.4);
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
  ringGeo.setAttribute('color', new THREE.BufferAttribute(rCol, 3));
  const ringMat = new THREE.PointsMaterial({
    size: 0.03, vertexColors: true, transparent: true,
    opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const rings = new THREE.Points(ringGeo, ringMat);
  rings.rotation.x = Math.PI / 3 + (depth * 0.2);
  group.add(rings);

  // Mini orbiting planets (clickable!)
  const miniCount = 5 + Math.floor(Math.random() * 4);
  for (let m = 0; m < miniCount; m++) {
    const orbitR = 6 + m * 1.8 + Math.random();
    const angle = Math.random() * Math.PI * 2;
    const miniGroup = new THREE.Group();

    const mCount = 800;
    const mGeo = new THREE.BufferGeometry();
    const mPos = new Float32Array(mCount * 3);
    const mCol = new Float32Array(mCount * 3);
    const mRadius = 0.3 + Math.random() * 0.4;

    const mPal = PALETTES[(depth + m + 1) % PALETTES.length];
    for (let i = 0; i < mCount; i++) {
      const t = Math.acos(2 * Math.random() - 1);
      const p = Math.random() * Math.PI * 2;
      mPos[i*3] = mRadius * Math.sin(t) * Math.cos(p);
      mPos[i*3+1] = mRadius * Math.sin(t) * Math.sin(p);
      mPos[i*3+2] = mRadius * Math.cos(t);
      mCol[i*3] = mPal.core[0] + Math.random() * 0.2;
      mCol[i*3+1] = mPal.core[1] + Math.random() * 0.2;
      mCol[i*3+2] = mPal.core[2] + Math.random() * 0.2;
    }
    mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
    mGeo.setAttribute('color', new THREE.BufferAttribute(mCol, 3));

    const mini = new THREE.Points(mGeo, new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true,
      opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    mini.userData = { type: 'mini', orbitR, orbitAngle: angle, orbitSpeed: 0.1 + Math.random() * 0.3, mRadius } satisfies MiniUserData;

    const orbitGeo = new THREE.BufferGeometry();
    const orbitPts: number[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      orbitPts.push(Math.cos(a) * orbitR, 0, Math.sin(a) * orbitR);
    }
    orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitPts, 3));
    const orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({
      color: new THREE.Color(mPal.ring[0] * 0.3, mPal.ring[1] * 0.3, mPal.ring[2] * 0.3),
      transparent: true, opacity: 0.15,
    }));
    orbitLine.rotation.x = Math.PI / 3 + (depth * 0.2);
    group.add(orbitLine);

    miniGroup.add(mini);
    miniGroup.position.set(Math.cos(angle) * orbitR, 0, Math.sin(angle) * orbitR);
    group.add(miniGroup);
  }

  group.userData = { core, rings, depth, pal } as SystemUserData;
  return group;
}

export function depthName(level: number) {
  return DEPTH_NAMES[Math.min(level, DEPTH_NAMES.length - 1)];
}

export default function FractalPlanets({
  onDepthChange,
}: {
  onDepthChange?: (depth: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<(d: number) => void>(() => {});
  depthRef.current = (d: number) => onDepthChange?.(d);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.01, 2000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.5;
    const mouse = new THREE.Vector2();

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const sp = new Float32Array(8000 * 3), sc = new Float32Array(8000 * 3);
    for (let i = 0; i < 8000; i++) {
      sp[i*3] = (Math.random()-.5)*1500; sp[i*3+1] = (Math.random()-.5)*1500; sp[i*3+2] = (Math.random()-.5)*1500;
      const b = .5 + Math.random()*.5;
      sc[i*3] = b; sc[i*3+1] = b * (.8+Math.random()*.2); sc[i*3+2] = b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(sc, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: .4, vertexColors: true, transparent: true, opacity: .7, blending: THREE.AdditiveBlending, depthWrite: false })));

    let currentSystem = createPlanetSystem(0);
    scene.add(currentSystem);
    let depthLevel = 0;
    const systemStack: { system: THREE.Group; camZ: number; depth: number }[] = [];
    let time = 0;
    let targetCamZ = 20;
    let transitioning = false;
    let raf = 0;
    let disposed = false;

    const emit = () => depthRef.current(depthLevel);

    function disposeGroup(g: THREE.Group) {
      g.traverse((obj) => {
        const pts = obj as THREE.Points;
        if (pts.isPoints) {
          pts.geometry?.dispose();
          const m = pts.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m?.dispose();
        }
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          const m = mesh.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m?.dispose();
        }
        const line = obj as THREE.Line;
        if (line.isLine) {
          line.geometry?.dispose();
          const m = line.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m?.dispose();
        }
      });
    }

    function diveInto(hitPoint: THREE.Vector3) {
      if (transitioning) return;
      transitioning = true;
      systemStack.push({ system: currentSystem, camZ: camera.position.z, depth: depthLevel });
      depthLevel++;
      emit();
      const newSystem = createPlanetSystem(depthLevel, hitPoint);
      newSystem.scale.set(0.01, 0.01, 0.01);
      scene.add(newSystem);
      const startZ = camera.position.z;
      const oldSystem = currentSystem;
      let progress = 0;
      const transAnim = () => {
        if (disposed) return;
        progress += 0.02;
        const t = Math.min(1, progress);
        const ease = t < .5 ? 2*t*t : -1+(4-2*t)*t;
        camera.position.x = THREE.MathUtils.lerp(0, hitPoint.x, ease * 0.3);
        camera.position.y = THREE.MathUtils.lerp(0, hitPoint.y, ease * 0.3);
        camera.position.z = THREE.MathUtils.lerp(startZ, 20, ease);
        camera.lookAt(
          THREE.MathUtils.lerp(0, hitPoint.x, ease),
          THREE.MathUtils.lerp(0, hitPoint.y, ease),
          0
        );
        const s = 0.01 + ease * 0.99;
        newSystem.scale.set(s, s, s);
        oldSystem.children.forEach((c) => {
          const mesh = c as THREE.Mesh | THREE.Points;
          const mat = (mesh as THREE.Mesh).material as THREE.Material | undefined;
          if (mat && 'opacity' in mat) (mat as THREE.MeshBasicMaterial).opacity = 1 - ease;
        });
        if (t < 1) {
          requestAnimationFrame(transAnim);
        } else {
          scene.remove(oldSystem);
          disposeGroup(oldSystem);
          currentSystem = newSystem;
          newSystem.position.set(0,0,0);
          camera.position.set(0,0,20);
          camera.lookAt(0,0,0);
          targetCamZ = 20;
          transitioning = false;
        }
      };
      transAnim();
    }

    function onZoomOut() {
      if (transitioning || systemStack.length === 0) return;
      transitioning = true;
      const prev = systemStack.pop()!;
      depthLevel = prev.depth;
      emit();
      const oldSystem = currentSystem;
      scene.add(prev.system);
      prev.system.children.forEach((c) => {
        const mat = (c as THREE.Mesh).material as THREE.Material | undefined;
        if (mat && 'opacity' in mat) (mat as THREE.MeshBasicMaterial).opacity = 1;
      });

      let progress = 0;
      const outAnim = () => {
        if (disposed) return;
        progress += 0.025;
        const t = Math.min(1, progress);
        const ease = t < .5 ? 2*t*t : -1+(4-2*t)*t;
        const s = 1 - ease * 0.99;
        oldSystem.scale.set(s, s, s);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, prev.camZ, 0.05);
        if (t < 1) {
          requestAnimationFrame(outAnim);
        } else {
          scene.remove(oldSystem);
          disposeGroup(oldSystem);
          currentSystem = prev.system;
          camera.position.set(0, 0, prev.camZ);
          camera.lookAt(0, 0, 0);
          targetCamZ = prev.camZ;
          transitioning = false;
        }
      };
      outAnim();
    }

    const onClick = (e: MouseEvent) => {
      // Ignore clicks on overlay buttons/links
      if ((e.target as HTMLElement).closest('a,button')) return;
      if (transitioning) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(currentSystem.children, true);
      if (hits.length > 0) diveInto(hits[0].point);
    };

    const onContext = (e: Event) => {
      e.preventDefault();
      onZoomOut();
    };

    const onWheel = (e: WheelEvent) => {
      // Let normal wheel scroll the page; pinch-zoom (ctrl+wheel) controls camera
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      targetCamZ = Math.max(5, Math.min(60, targetCamZ + e.deltaY * 0.02));
    };

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') onZoomOut();
      if (e.key === 'Enter' || e.key === ' ') {
        if (transitioning) return;
        mouse.set(0, 0);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(currentSystem.children, true);
        if (hits.length > 0) diveInto(hits[0].point);
      }
    };

    // Expose zoom-out for overlay buttons
    (mount as HTMLElement & { __fractalBack?: () => void }).__fractalBack = onZoomOut;
    (mount as HTMLElement & { __fractalDive?: () => void }).__fractalDive = () => {
      if (transitioning) return;
      mouse.set(0, 0);
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(currentSystem.children, true);
      if (hits.length > 0) diveInto(hits[0].point);
    };

    const el = renderer.domElement;
    // Allow vertical page scroll on touch; tap still registers as click-to-dive
    el.style.touchAction = 'pan-y';
    el.addEventListener('click', onClick);
    el.addEventListener('contextmenu', onContext);
    // passive:false so preventDefault works for page-embedded canvas
    mount.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);

    const animate = () => {
      if (disposed) return;
      raf = requestAnimationFrame(animate);
      time += 0.016;

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;

      if (currentSystem && !transitioning) {
        const data = currentSystem.userData as SystemUserData;
        if (data.core) data.core.rotation.y += 0.003;
        if (data.rings) data.rings.rotation.z += 0.002;

        if (data.core) {
          const colors = data.core.geometry.getAttribute('color') as THREE.BufferAttribute;
          const pal = data.pal;
          for (let i = 0; i < colors.count; i++) {
            const phase = time * 0.3 + i * 0.0005;
            colors.array[i*3] = (pal.core[0] as number) + Math.sin(phase) * 0.15;
            colors.array[i*3+1] = (pal.core[1] as number) + Math.sin(phase + 2) * 0.15;
            colors.array[i*3+2] = (pal.core[2] as number) + Math.sin(phase + 4) * 0.1;
          }
          colors.needsUpdate = true;
        }

        currentSystem.children.forEach((child) => {
          if (child.children) {
            child.children.forEach((sub) => {
              if (sub.userData && (sub.userData as MiniUserData).type === 'mini') {
                const d = sub.userData as MiniUserData;
                d.orbitAngle += d.orbitSpeed * 0.016;
                child.position.x = Math.cos(d.orbitAngle) * d.orbitR;
                child.position.z = Math.sin(d.orbitAngle) * d.orbitR;
                sub.rotation.y += 0.02;
              }
            });
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();
    emit();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      el.removeEventListener('click', onClick);
      el.removeEventListener('contextmenu', onContext);
      mount.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      systemStack.forEach((s) => disposeGroup(s.system));
      disposeGroup(currentSystem);
      starGeo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-hidden />;
}
