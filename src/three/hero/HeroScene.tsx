"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const INDIA = { lat: 21.5, lon: 78 };
const DESTS = [
  { lat: 37.5, lon: -95.5 }, // USA
  { lat: 51.5, lon: -0.1 }, // UK
  { lat: 51, lon: 10 }, // EU
  { lat: 36, lon: 139 }, // Japan
  { lat: -25, lon: 133 }, // Australia
  { lat: -14, lon: -51 }, // Brazil
];

function GlobeGroup({ boost }: { boost: boolean }) {
  const spin = useRef<THREE.Group>(null!);
  const pulse = useRef<THREE.Mesh>(null!);

  const dots = useMemo(() => {
    const N = 420;
    const arr = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      arr[i * 3] = Math.cos(th) * rad * 1.01;
      arr[i * 3 + 1] = y * 1.01;
      arr[i * 3 + 2] = Math.sin(th) * rad * 1.01;
    }
    return arr;
  }, []);

  const arcs = useMemo(() => {
    const from = latLonToVec3(INDIA.lat, INDIA.lon, 1.02);
    return DESTS.map((d) => {
      const to = latLonToVec3(d.lat, d.lon, 1.02);
      const mid = from
        .clone()
        .add(to)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.35 + from.distanceTo(to) * 0.15);
      const curve = new THREE.QuadraticBezierCurve3(from.clone(), mid, to.clone());
      return new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    });
  }, []);

  const markers = useMemo(() => {
    return [INDIA, ...DESTS].map((d) => latLonToVec3(d.lat, d.lon, 1.03));
  }, []);

  const arcLines = useMemo(() => {
    return arcs.map(
      (g, i) =>
        new THREE.Line(
          g,
          new THREE.LineBasicMaterial({
            color: i % 2 ? "#a855f7" : "#22d3ee",
            transparent: true,
            opacity: 0.75,
          })
        )
    );
  }, [arcs]);

  useFrame((state, delta) => {
    const speed = boost ? 1.7 : 0.35;
    spin.current.rotation.y += delta * speed;
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 3.2) * 0.25;
    if (pulse.current) pulse.current.scale.setScalar(s);
  });

  const indiaPos = markers[0];

  return (
    <group>
      <group ref={spin}>
        {/* hologram sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.22} />
        </mesh>
        <mesh scale={0.985}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.05} />
        </mesh>
        {/* dotted surface */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.022} color="#7dd3fc" transparent opacity={0.85} sizeAttenuation />
        </points>
        {/* arcs India -> world */}
        {arcLines.map((l, i) => (
          <primitive key={i} object={l} />
        ))}
        {/* markers */}
        {markers.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[i === 0 ? 0.035 : 0.02, 12, 12]} />
            <meshBasicMaterial color={i === 0 ? "#f472b6" : "#67e8f9"} />
          </mesh>
        ))}
        {/* INDIA pulse ring */}
        <mesh ref={pulse} position={indiaPos}>
          <ringGeometry args={[0.05, 0.07, 24]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[1.45, 0.008, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.3, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>
      {/* base glow */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export function HoloGlobeCanvas({ boost }: { boost: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.4, 3.4], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 4, 4]} intensity={20} color="#22d3ee" />
      <GlobeGroup boost={boost} />
    </Canvas>
  );
}

/* ==================== NEW HERO BACKGROUND: NEON WARP ==================== */

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Neon rings rushing toward the camera — the warp tunnel */
function WarpTunnel({ count = 16 }: { count?: number }) {
  const group = useRef<THREE.Group>(null!);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const COLORS = ["#22d3ee", "#6e7cff", "#a855f7"];
  const SPACING = 2.4;
  const LEN = count * SPACING;

  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        r: 2.4 + (i % 4) * 0.55,
        speed: 2.6 + (i % 3) * 0.9,
        color: COLORS[i % COLORS.length],
      })),
    [count]
  );

  useFrame((s, delta) => {
    if (reducedMotion()) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.z = t * 0.03;
    rings.current.forEach((m, i) => {
      if (!m) return;
      m.position.z += seeds[i].speed * delta;
      if (m.position.z > 5) m.position.z -= LEN;
    });
  });

  return (
    <group ref={group} position={[0.5, 0.2, -8]}>
      {seeds.map((sd, i) => (
        <mesh
          key={i}
          ref={(m) => {
            rings.current[i] = m;
          }}
          position={[(i % 2 ? 0.15 : -0.15), 0, -i * SPACING]}
          rotation={[0, 0, (i * Math.PI) / count]}
        >
          <torusGeometry args={[sd.r, 0.022, 8, 96]} />
          <meshBasicMaterial
            color={sd.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Rotating wireframe torus-knot wrapped in a purple icosahedron shell */
function KnotCore() {
  const knot = useRef<THREE.Mesh>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const shellWire = useRef<THREE.Mesh>(null!);

  useFrame((s, delta) => {
    if (reducedMotion()) return;
    const t = s.clock.elapsedTime;
    knot.current.rotation.x = t * 0.22;
    knot.current.rotation.y = t * 0.3;
    shell.current.rotation.y = -t * 0.12;
    shell.current.rotation.z = t * 0.08;
    shellWire.current.rotation.copy(shell.current.rotation);
    const p = 1 + Math.sin(t * 1.4) * 0.04;
    shell.current.scale.setScalar(p);
    shellWire.current.scale.setScalar(p);
  });

  return (
    <group position={[0.8, 0.3, -5]}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.05, 0.3, 140, 20]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.42} />
      </mesh>
      {/* purple shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh ref={shellWire}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#c4b5fd"
          wireframe
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* heart glow */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#6e7cff"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** 2200 particles streaming through depth */
function ParticleStream({ count = 2200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = -32 + Math.random() * 38;
      speeds[i] = 2 + Math.random() * 5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (reducedMotion()) return;
    const arr = (ref.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const d = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speeds[i] * d;
      if (arr[i * 3 + 2] > 6) arr[i * 3 + 2] = -32;
    }
    ref.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#a5e3ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Camera: scroll travel + mouse parallax drift */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, window.scrollY / max);
    if (reducedMotion()) {
      camera.position.set(0, 0, 8 - p * 3.2);
      camera.lookAt(0, p * 0.8, 0);
      return;
    }
    const w = window as unknown as { __mx?: number; __my?: number };
    const mx = w.__mx ?? 0;
    const my = w.__my ?? 0;
    const t = clock.elapsedTime;
    camera.position.x += (mx * 0.9 + Math.sin(t * 0.1) * 0.15 - camera.position.x) * 0.04;
    camera.position.y += (my * -0.6 + p * 1.6 + Math.cos(t * 0.08) * 0.1 - camera.position.y) * 0.04;
    camera.position.z = 8 - p * 3.2;
    camera.lookAt(camera.position.x * 0.4, p * 0.8, -4);
  });
  return null;
}

export default function HeroScene() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const w = window as unknown as { __mx?: number; __my?: number };
      w.__mx = (e.clientX / window.innerWidth - 0.5) * 2;
      w.__my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <Stars radius={50} depth={20} count={900} factor={3} fade speed={0.5} />
        <WarpTunnel />
        <KnotCore />
        <ParticleStream />
        <CameraRig />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050507_82%)]" />
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
    </div>
  );
}
