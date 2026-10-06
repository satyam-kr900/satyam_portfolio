"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Custom magnetic cursor — desktop / fine-pointer only */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 35 });
  const ry = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHot(!!t.closest("a, button, input, textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-[#9aa6ff]/70"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hot ? 44 : 28, height: hot ? 44 : 28, opacity: hot ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
