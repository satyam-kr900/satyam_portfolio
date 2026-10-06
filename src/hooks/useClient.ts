"use client";
import { useEffect, useState } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return pos;
}

export function useLenis() {
  useEffect(() => {
    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let raf = 0;
    (async () => {
      const Lenis = (await import("lenis")).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lenis = new Lenis({ duration: 1.1 } as any);
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}
