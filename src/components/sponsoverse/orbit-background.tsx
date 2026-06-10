"use client";

import { motion } from "framer-motion";

// Deterministic PRNG so server and client render the same starfield (avoids hydration mismatch)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20260610);
const STARS = Array.from({ length: 110 }, () => ({
  left: `${(random() * 100).toFixed(2)}%`,
  top: `${(random() * 100).toFixed(2)}%`,
  size: 1 + random() * 2,
  duration: 2 + random() * 4,
  delay: random() * 5,
}));

const ORBITS = [
  { size: 320, duration: 22, dot: "var(--comet)" },
  { size: 520, duration: 34, dot: "var(--nova)" },
  { size: 740, duration: 48, dot: "var(--galaxy)" },
];

export function OrbitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Cosmic glow */}
      <div
        className="absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ backgroundImage: "var(--gradient-nova)" }}
      />

      {/* Starfield */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        {ORBITS.map((orbit, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ width: orbit.size, height: orbit.size }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
            >
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px_2px_currentColor]"
                style={{ backgroundColor: orbit.dot, color: orbit.dot }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
