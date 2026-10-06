"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Stars } from "@react-three/drei";
import * as THREE from "three";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Touch point — the spark where human meets machine */
const T = new THREE.Vector3(2.3, 0.35, -2.2);

function orient(from: THREE.Vector3, to: THREE.Vector3) {
  const dir = to.clone().sub(from);
  const len = dir.length();
  dir.normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  return { q, len, dir };
}

/* Burst nodes — shared by links + traveling pulses */
const PALETTE = ["#3b82f6", "#e879f9", "#4ade80", "#a78bfa", "#22d3ee", "#f472b6"];
const NODES: { p: [number, number, number]; c: string; s: number }[] = [
  { p: [1.1, 2.5, -2.6], c: PALETTE[0], s: 0.16 },
  { p: [2.5, 2.9, -3.0], c: PALETTE[1], s: 0.13 },
  { p: [3.9, 2.4, -2.8], c: PALETTE[0], s: 0.12 },
  { p: [0.4, 1.3, -2.4], c: PALETTE[2], s: 0.12 },
  { p: [4.6, 1.2, -2.6], c: PALETTE[3], s: 0.11 },
  { p: [0.7, -0.4, -2.5], c: PALETTE[4], s: 0.13 },
  { p: [4.4, -0.5, -2.7], c: PALETTE[2], s: 0.12 },
  { p: [1.4, -1.7, -2.8], c: PALETTE[1], s: 0.11 },
  { p: [3.0, -1.9, -3.0], c: PALETTE[0], s: 0.14 },
  { p: [4.3, -2.3, -3.1], c: PALETTE[4], s: 0.09 },
  { p: [0.1, 0.4, -2.9], c: PALETTE[5], s: 0.1 },
  { p: [5.3, 0.2, -3.0], c: PALETTE[5], s: 0.09 },
  { p: [2.0, 1.7, -3.4], c: PALETTE[3], s: 0.1 },
  { p: [3.4, 1.5, -3.4], c: PALETTE[2], s: 0.09 },
];

/* --------------------------------- materials --------------------------------- */

function useMats() {
  return useMemo(
    () => ({
      skin: new THREE.MeshStandardMaterial({
        color: "#7d5f4c", metalness: 0.05, roughness: 0.55, envMapIntensity: 0.5,
      }),
      cuff: new THREE.MeshStandardMaterial({ color: "#15161c", metalness: 0.3, roughness: 0.7 }),
      gold: new THREE.MeshStandardMaterial({
        color: "#c9a35c", metalness: 1, roughness: 0.3, envMapIntensity: 1.2,
      }),
      botSteel: new THREE.MeshStandardMaterial({
        color: "#9aa3b2", metalness: 1, roughness: 0.28, envMapIntensity: 1.3,
      }),
      botJoint: new THREE.MeshStandardMaterial({
        color: "#2a2e36", metalness: 0.9, roughness: 0.4, envMapIntensity: 0.9,
      }),
    }),
    []
  );
}

/* --------------------------------- human arm --------------------------------- */

function HumanArm() {
  const mats = useMats();
  const ref = useRef<THREE.Group>(null!);
  const finger = useRef<THREE.Group>(null!);
  const start = useMemo(() => new THREE.Vector3(-4.2, -1.5, -2.8), []);
  const { q, dir } = useMemo(() => orient(start, T), [start]);

  useFrame((s) => {
    if (reducedMotion()) return;
    const t = s.clock.elapsedTime;
    // breathing reach — arm drifts toward the touch and back
    const push = Math.sin(t * 0.55) * 0.09;
    ref.current.position.set(
      start.x + dir.x * push,
      start.y + dir.y * push + Math.sin(t * 0.7) * 0.04,
      start.z + dir.z * push
    );
    // finger flexes gently
    finger.current.rotation.x = Math.sin(t * 1.3) * 0.05;
  });

  return (
    <group ref={ref} position={start} quaternion={q}>
      <mesh material={mats.cuff} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.52, 0.58, 0.7, 24]} />
      </mesh>
      <mesh material={mats.skin} position={[0, 2.7, 0]}>
        <capsuleGeometry args={[0.4, 5, 8, 20]} />
      </mesh>
      <mesh material={mats.skin} position={[0, 5.35, 0]} scale={[1, 0.72, 1.15]}>
        <sphereGeometry args={[0.42, 24, 24]} />
      </mesh>
      <group ref={finger} position={[0, 5.5, 0]}>
        <mesh material={mats.skin} position={[0.03, 0.45, 0.02]} rotation={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.075, 0.09, 1.1, 12]} />
        </mesh>
        <mesh material={mats.skin} position={[0.06, 1.0, 0.02]}>
          <sphereGeometry args={[0.085, 12, 12]} />
        </mesh>
        <mesh material={mats.gold} position={[0.04, 0.25, 0.02]} rotation={[0.15, 0, -0.05]}>
          <torusGeometry args={[0.095, 0.022, 8, 24]} />
        </mesh>
      </group>
      <mesh material={mats.skin} position={[-0.22, 5.15, 0.18]} rotation={[0.5, 0, 0.5]}>
        <cylinderGeometry args={[0.07, 0.085, 0.55, 10]} />
      </mesh>
    </group>
  );
}

/* --------------------------------- robot arm --------------------------------- */

function RobotArm() {
  const mats = useMats();
  const ref = useRef<THREE.Group>(null!);
  const curl = useRef<THREE.Group>(null!);
  const start = useMemo(() => new THREE.Vector3(8.6, -1.7, -2.6), []);
  const { q, dir } = useMemo(() => orient(start, T), [start]);
  const jointGlow = useMemo(() => new THREE.MeshBasicMaterial({ color: "#67e8f9" }), []);

  useFrame((s) => {
    if (reducedMotion()) return;
    const t = s.clock.elapsedTime;
    const push = Math.sin(t * 0.55 + Math.PI) * 0.09;
    ref.current.position.set(
      start.x + dir.x * push,
      start.y + dir.y * push + Math.cos(t * 0.6) * 0.04,
      start.z + dir.z * push
    );
    // fingertip curls in opposition — the two hands "negotiate"
    curl.current.rotation.z = 0.1 + Math.sin(t * 1.1) * 0.07;
  });

  return (
    <group ref={ref} position={start} quaternion={q}>
      <mesh material={mats.botSteel} position={[0, 1.4, 0]}>
        <capsuleGeometry args={[0.5, 2.2, 8, 20]} />
      </mesh>
      <mesh material={mats.botJoint} position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.55, 20, 20]} />
      </mesh>
      <mesh material={jointGlow} position={[0.5, 2.8, 0.18]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 10]} />
      </mesh>
      <mesh material={mats.botSteel} position={[0, 3.9, 0]}>
        <capsuleGeometry args={[0.38, 1.8, 8, 20]} />
      </mesh>
      <mesh material={mats.botJoint} position={[0, 5.0, 0]}>
        <sphereGeometry args={[0.4, 18, 18]} />
      </mesh>
      <mesh material={mats.botSteel} position={[0, 5.55, 0]}>
        <boxGeometry args={[0.24, 0.9, 0.3]} />
      </mesh>
      <group ref={curl} position={[0, 5.9, 0]}>
        <mesh material={mats.botSteel} position={[-0.04, 0.2, 0]}>
          <boxGeometry args={[0.2, 0.75, 0.26]} />
        </mesh>
        <mesh material={mats.botSteel} position={[-0.08, 0.52, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        <mesh material={jointGlow} position={[-0.08, 0.52, 0.1]}>
          <sphereGeometry args={[0.035, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/* --------------------------- nodes + links + pulses --------------------------- */

function Network({ highlight }: { highlight: string }) {
  const group = useRef<THREE.Group>(null!);
  const target = useMemo(() => new THREE.Color(highlight), [highlight]);

  const lines = useMemo(() => {
    const arr: number[] = [];
    NODES.forEach((n) => {
      arr.push(T.x, T.y, T.z, n.p[0], n.p[1], n.p[2]);
    });
    const pairs: [number, number][] = [[0, 2], [3, 5], [4, 6], [7, 8], [0, 3], [8, 9], [10, 5]];
    pairs.forEach(([a, b]) => {
      arr.push(...NODES[a].p, ...NODES[b].p);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    return g;
  }, []);

  const pulseMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const pulses = useMemo(
    () =>
      NODES.slice(0, 10).map((n, i) => ({
        to: new THREE.Vector3(...n.p),
        speed: 0.35 + ((i * 37) % 30) / 100,
        offset: (i * 0.13) % 1,
      })),
    []
  );
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((s, delta) => {
    const t = s.clock.elapsedTime;
    pulseMat.color.lerp(target, Math.min(1, delta * 2));
    if (reducedMotion()) return;
    // nodes float + breathe + rings spin
    group.current.children.forEach((node, i) => {
      const base = NODES[i];
      node.position.set(
        base.p[0] + Math.sin(t * 0.6 + i * 1.7) * 0.07,
        base.p[1] + Math.sin(t * 0.8 + i * 2.3) * 0.09,
        base.p[2]
      );
      node.rotation.y += delta * 0.6;
      const sPulse = 1 + Math.sin(t * 2 + i * 1.3) * 0.12;
      node.scale.setScalar(sPulse);
    });
    group.current.rotation.z = Math.sin(t * 0.12) * 0.03;
    // energy pulses shoot from the touch outward
    pulseRefs.current.forEach((m, i) => {
      if (!m) return;
      const p = pulses[i];
      const k = (t * p.speed + p.offset) % 1;
      m.position.lerpVectors(T, p.to, k);
      m.scale.setScalar(Math.sin(k * Math.PI) * 1.4 + 0.2);
    });
  });

  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#9db4ff" transparent opacity={0.28} depthWrite={false} />
      </lineSegments>
      <group ref={group}>
        {NODES.map((n, i) => (
          <group key={i} position={n.p}>
            <mesh>
              <sphereGeometry args={[n.s, 16, 16]} />
              <meshBasicMaterial color={n.c} transparent opacity={0.95} />
            </mesh>
            <mesh>
              <sphereGeometry args={[n.s * 2.1, 16, 16]} />
              <meshBasicMaterial color={n.c} transparent opacity={0.16} depthWrite={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
              <torusGeometry args={[n.s * 2.6, 0.006, 6, 32]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
            </mesh>
          </group>
        ))}
      </group>
      {pulses.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            pulseRefs.current[i] = m;
          }}
          material={pulseMat}
        >
          <sphereGeometry args={[0.05, 10, 10]} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------ spark + shockwave ------------------------------ */

function Spark({ highlight }: { highlight: string }) {
  const flash = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const wave1 = useRef<THREE.Mesh>(null!);
  const wave2 = useRef<THREE.Mesh>(null!);
  const haloMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(highlight),
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const waveMat1 = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color(highlight), transparent: true, opacity: 0.4, depthWrite: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const waveMat2 = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color(highlight), transparent: true, opacity: 0.4, depthWrite: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const target = useMemo(() => new THREE.Color(highlight), [highlight]);

  useFrame((s, delta) => {
    const t = s.clock.elapsedTime;
    haloMat.color.lerp(target, Math.min(1, delta * 2));
    waveMat1.color.copy(haloMat.color);
    waveMat2.color.copy(haloMat.color);
    light.current.color.lerp(target, Math.min(1, delta * 2));
    if (reducedMotion()) return;
    // heartbeat spark
    const beat = 1 + Math.sin(t * 2.4) * 0.25 + Math.sin(t * 7.3) * 0.06;
    flash.current.scale.setScalar(beat);
    halo.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.35);
    light.current.intensity = 14 + Math.sin(t * 2.4) * 7;
    // expanding shockwaves, staggered
    const period = 2.8;
    [wave1, wave2].forEach((w, i) => {
      const k = ((t + i * (period / 2)) % period) / period;
      w.current.scale.setScalar(0.4 + k * 2.4);
      (w.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.45;
    });
  });

  return (
    <group>
      <mesh ref={flash} position={T}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={halo} position={T} material={haloMat}>
        <sphereGeometry args={[0.32, 16, 16]} />
      </mesh>
      <mesh ref={wave1} position={T} material={waveMat1}>
        <torusGeometry args={[1, 0.02, 8, 64]} />
      </mesh>
      <mesh ref={wave2} position={T} material={waveMat2}>
        <torusGeometry args={[1, 0.02, 8, 64]} />
      </mesh>
      <pointLight ref={light} position={T} intensity={14} distance={9} color={highlight} />
    </group>
  );
}

/* ------------------------------------ dust ------------------------------------ */

function Dust({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (reducedMotion()) return;
    // dust streams toward the touch — everything converges
    ref.current.rotation.y = s.clock.elapsedTime * 0.02;
    ref.current.position.x = Math.sin(s.clock.elapsedTime * 0.1) * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#b9a8ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------- orbiting camera ------------------------------- */

function Rig() {
  useFrame(({ camera, clock }) => {
    if (reducedMotion()) return;
    const t = clock.elapsedTime;
    // slow orbital drift — real 3D parallax as you watch
    camera.position.x = Math.sin(t * 0.09) * 0.7;
    camera.position.y = 0.5 + Math.sin(t * 0.07) * 0.3;
    camera.position.z = 9 + Math.sin(t * 0.05) * 0.4;
    camera.lookAt(1.2, 0.1, -2.5);
  });
  return null;
}

/* ------------------------------------ scene ------------------------------------ */

export default function UniverseScene({ highlight = "#22d3ee" }: { highlight?: string }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#050505", 11, 23]} />
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#4a4468", "#050505", 0.55]} />
        <pointLight position={[-5, 2, 4]} intensity={26} color="#ffd9b8" />
        <pointLight position={[7, 2, 3]} intensity={22} color="#7dd3fc" />
        <pointLight position={[2, -4, 2]} intensity={10} color="#a855f7" />

        <Environment resolution={256} frames={1}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer form="circle" intensity={4} position={[0, 5, -9]} scale={2} color="#fff1de" />
            <Lightformer intensity={2.5} position={[-5, 1, -1]} scale={[3, 0.8]} color="#f0c8a0" />
            <Lightformer intensity={2.5} position={[5, 1, -1]} scale={[3, 0.8]} color="#67e8f9" />
            <Lightformer form="ring" intensity={1.5} position={[0, 0, 6]} scale={4} color="#b9a8ff" />
          </group>
        </Environment>

        <Stars radius={60} depth={25} count={400} factor={2} fade speed={0.5} />
        <Dust />

        <HumanArm />
        <RobotArm />
        <Network highlight={highlight} />
        <Spark highlight={highlight} />
        <Rig />
      </Canvas>
    </div>
  );
}
