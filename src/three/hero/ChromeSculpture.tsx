"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Sculpture() {
  const tilt = useRef<THREE.Group>(null!);
  const knot = useRef<THREE.Mesh>(null!);
  const knotWire = useRef<THREE.Mesh>(null!);
  const gem = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const orbit = useRef<THREE.Group>(null!);
  const halo = useRef<THREE.Mesh>(null!);

  // scattered chrome dust around the sculpture
  const dust = useMemo(() => {
    const N = 650;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.7 + Math.random() * 1.3;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.6;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const w = window as unknown as { __mx?: number; __my?: number };
    const mx = w.__mx ?? 0;
    const my = w.__my ?? 0;

    tilt.current.rotation.y += (mx * 0.6 + t * 0.08 - tilt.current.rotation.y) * 0.04;
    tilt.current.rotation.x += (my * 0.35 - tilt.current.rotation.x) * 0.04;
    tilt.current.position.y = Math.sin(t * 0.8) * 0.08;

    knot.current.rotation.y += d * 0.35;
    knot.current.rotation.x += d * 0.12;
    knotWire.current.rotation.copy(knot.current.rotation);

    gem.current.rotation.y -= d * 1.2;
    gem.current.rotation.x += d * 0.8;
    orbit.current.rotation.y -= d * 0.5;

    ring1.current.rotation.z += d * 0.4;
    ring2.current.rotation.z -= d * 0.28;

    const p = 1 + Math.sin(t * 2) * 0.06;
    halo.current.scale.setScalar(p);
  });

  return (
    <group ref={tilt}>
      {/* halo behind */}
      <mesh ref={halo} position={[0, 0, -1.2]}>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#6e7cff" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* ===== LIQUID CHROME KNOT ===== */}
      <mesh ref={knot}>
        <torusKnotGeometry args={[0.85, 0.26, 240, 36]} />
        <meshStandardMaterial color="#dbe4f0" metalness={0.9} roughness={0.18} />
      </mesh>
      {/* neon wire overlay */}
      <mesh ref={knotWire} scale={1.004}>
        <torusKnotGeometry args={[0.85, 0.26, 120, 18]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ===== orbiting gem ===== */}
      <group ref={orbit}>
        <mesh ref={gem} position={[1.7, 0.35, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#f0abfc" metalness={0.7} roughness={0.15} emissive="#a855f7" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[1.7, 0.35, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#e879f9" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* ===== thin neon rings ===== */}
      <mesh ref={ring1} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.55, 0.012, 8, 140]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, -0.4, 0.2]}>
        <torusGeometry args={[1.85, 0.009, 8, 140]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ===== chrome dust ===== */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.028} color="#a5e3ff" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* ===== floor glow ===== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <ringGeometry args={[0.6, 1.1, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.61, 0]}>
        <circleGeometry args={[0.6, 48]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function ChromeSculptureCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.1, 5], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={1.1} color="#a5b4fc" />
      <pointLight position={[5, 2, 4]} intensity={50} color="#22d3ee" />
      <pointLight position={[-5, -1, 3]} intensity={45} color="#a855f7" />
      <pointLight position={[0, -3, 4]} intensity={18} color="#f472b6" />
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <Sculpture />
      </Float>
      <Sparkles count={60} scale={[5, 5, 5]} size={2.5} speed={0.45} color="#7dd3fc" opacity={0.55} />
    </Canvas>
  );
}
