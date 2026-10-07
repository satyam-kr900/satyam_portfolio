"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";

/* ==================== ADVANCED CENTERPIECE: NEURAL AI CORE ==================== */

const SATS = [
  { r: 1.45, speed: 0.75, color: "#22d3ee", size: 0.042, tilt: 0.55, offset: 0.0 },
  { r: 1.68, speed: -0.55, color: "#a855f7", size: 0.05, tilt: -0.45, offset: 1.4 },
  { r: 1.92, speed: 0.42, color: "#f472b6", size: 0.036, tilt: 0.95, offset: 2.7 },
  { r: 1.28, speed: -0.95, color: "#67e8f9", size: 0.032, tilt: -0.9, offset: 4.2 },
  { r: 2.12, speed: 0.3, color: "#818cf8", size: 0.028, tilt: 0.2, offset: 5.3 },
];

function CoreGroup({ boost }: { boost: boolean }) {
  const tilt = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const mid = useRef<THREE.Mesh>(null!);
  const midWire = useRef<THREE.Mesh>(null!);
  const outer = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const ringC = useRef<THREE.Mesh>(null!);
  const coreGlow = useRef<THREE.Mesh>(null!);
  const orbits = useRef<(THREE.Group | null)[]>([]);
  const wave1 = useRef<THREE.Mesh>(null!);
  const wave2 = useRef<THREE.Mesh>(null!);
  const waveMat1 = useRef<THREE.MeshBasicMaterial>(null!);
  const waveMat2 = useRef<THREE.MeshBasicMaterial>(null!);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null!);
  const speedV = useRef(1);

  // dense fibonacci particle sphere
  const spherePts = useMemo(() => {
    const N = 1400;
    const arr = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      const R = 1.02 + Math.random() * 0.03;
      arr[i * 3] = Math.cos(th) * rad * R;
      arr[i * 3 + 1] = y * R;
      arr[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    return arr;
  }, []);

  // outer stardust shell
  const dust = useMemo(() => {
    const N = 550;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.4 + Math.random() * 1.1;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.cos(ph) * 0.75;
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return arr;
  }, []);

  useEffect(() => {
    orbits.current.forEach((g, i) => {
      if (g) g.rotation.y = SATS[i].offset;
    });
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    speedV.current += ((boost ? 2.0 : 1) - speedV.current) * 0.06;
    const s = speedV.current;

    const w = window as unknown as { __mx?: number; __my?: number };
    const mx = w.__mx ?? 0;
    const my = w.__my ?? 0;
    tilt.current.rotation.y += (mx * 0.55 + t * 0.05 - tilt.current.rotation.y) * 0.05;
    tilt.current.rotation.x += (my * 0.35 - tilt.current.rotation.x) * 0.05;
    tilt.current.position.y = Math.sin(t * 0.9) * 0.07;

    inner.current.rotation.y += d * 1.1 * s;
    inner.current.rotation.x += d * 0.7 * s;
    mid.current.rotation.y -= d * 0.4 * s;
    mid.current.rotation.z += d * 0.18 * s;
    midWire.current.rotation.copy(mid.current.rotation);
    outer.current.rotation.y += d * 0.22 * s;
    outer.current.rotation.x -= d * 0.12 * s;

    ringA.current.rotation.z += d * 0.5 * s;
    ringB.current.rotation.z -= d * 0.35 * s;
    ringC.current.rotation.z += d * 0.2 * s;

    orbits.current.forEach((g, i) => {
      if (g) g.rotation.y += d * SATS[i].speed * s;
    });

    // heartbeat of the core
    const pulse = 1 + Math.sin(t * 2.4) * 0.09;
    coreGlow.current.scale.setScalar(pulse * (boost ? 1.18 : 1));

    // expanding shockwaves
    const p1 = (t * 0.45 * s) % 1;
    const p2 = ((t * 0.45 * s + 0.5) % 1);
    wave1.current.scale.setScalar(0.6 + p1 * 1.9);
    wave2.current.scale.setScalar(0.6 + p2 * 1.9);
    if (waveMat1.current) waveMat1.current.opacity = (1 - p1) * 0.5;
    if (waveMat2.current) waveMat2.current.opacity = (1 - p2) * 0.35;
    if (beamMat.current) beamMat.current.opacity = 0.1 + Math.sin(t * 2) * 0.03 + (boost ? 0.06 : 0);
  });

  return (
    <group ref={tilt}>
      {/* ===== energy heart ===== */}
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>
      <mesh ref={coreGlow}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshBasicMaterial color="#6e7cff" transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* ===== rotating poly shells ===== */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={mid}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={midWire}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={outer}>
        <dodecahedronGeometry args={[1.14, 0]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ===== particles ===== */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[spherePts, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#7dd3fc" transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#c4b5fd" transparent opacity={0.55} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* ===== neon orbit rings ===== */}
      <mesh ref={ringA} rotation={[Math.PI / 2.25, 0.25, 0]}>
        <torusGeometry args={[1.45, 0.01, 8, 140]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.75, -0.35, 0.2]}>
        <torusGeometry args={[1.72, 0.008, 8, 140]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 2.6, 0.6, -0.3]}>
        <torusGeometry args={[1.98, 0.006, 8, 140]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ===== shockwaves (face camera) ===== */}
      <mesh ref={wave1}>
        <ringGeometry args={[0.95, 1.0, 64]} />
        <meshBasicMaterial ref={waveMat1} color="#22d3ee" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={wave2}>
        <ringGeometry args={[0.95, 1.0, 64]} />
        <meshBasicMaterial ref={waveMat2} color="#a855f7" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* ===== orbiting satellites with light trails ===== */}
      {SATS.map((st, i) => (
        <group key={st.color + i} rotation={[st.tilt, 0, 0]}>
          <group
            ref={(g) => {
              orbits.current[i] = g;
            }}
          >
            <Trail width={1.6} length={5.5} color={new THREE.Color(st.color)} attenuation={(ww) => ww * ww}>
              <mesh position={[st.r, 0, 0]}>
                <sphereGeometry args={[st.size, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </Trail>
            <mesh position={[st.r, 0, 0]}>
              <sphereGeometry args={[st.size * 2.6, 12, 12]} />
              <meshBasicMaterial color={st.color} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
          {/* faint orbit path */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[st.r, 0.003, 6, 120]} />
            <meshBasicMaterial color={st.color} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}

      {/* ===== holo base platform ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <ringGeometry args={[0.7, 1.15, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.71, 0]}>
        <circleGeometry args={[0.7, 48]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* vertical light beam */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.5, 0.85, 2.2, 32, 1, true]} />
        <meshBasicMaterial ref={beamMat} color="#22d3ee" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function HoloGlobeCanvas({ boost }: { boost: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.15, 4.2], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 3, 4]} intensity={30} color="#22d3ee" />
      <pointLight position={[-5, -2, 3]} intensity={22} color="#a855f7" />
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.7}>
        <CoreGroup boost={boost} />
      </Float>
      <Sparkles count={70} scale={[4.5, 4.5, 4.5]} size={2.5} speed={0.5} color="#67e8f9" opacity={0.6} />
    </Canvas>
  );
}

/* ==================== HERO BACKGROUND: NEON WARP ==================== */

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

  useFrame((s) => {
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
