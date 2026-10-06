"use client";
import { useEffect, useState } from "react";

/** Opt-in ambient hum (WebAudio, no assets). Extremely subtle. Off by default. */
export default function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 55;
    gain.gain.value = 0.015;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 0.008;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    lfo.start();
    return () => {
      try { osc.stop(); lfo.stop(); ctx.close(); } catch { /* noop */ }
    };
  }, [on ]);

  return (
    <button
      onClick={() => setOn(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
      className="glass-chip fixed bottom-5 right-5 z-[60] rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-zinc-300 transition hover:border-white/30 hover:text-white"
    >
      SOUND {on ? "ON" : "OFF"}
    </button>
  );
}
