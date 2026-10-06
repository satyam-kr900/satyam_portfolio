"use client";
import { useEffect } from "react";
import { useLenis } from "@/hooks/useClient";
export default function LenisProvider() {
  useLenis();
  useEffect(() => {
    document.documentElement.classList.add("lenis");
    return () => document.documentElement.classList.remove("lenis");
  }, []);
  return null;
}
