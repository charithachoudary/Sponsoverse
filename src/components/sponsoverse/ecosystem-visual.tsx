"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Sponsor = {
  name: string;
  tier: string;
  amount: string;
  color: string;
  angle: number;
};

type Ring = {
  inset: string;
  duration: number;
  sponsors: Sponsor[];
};

const RINGS: Ring[] = [
  {
    inset: "26%",
    duration: 50,
    sponsors: [
      { name: "Zomato", tier: "Galaxy", amount: "₹1,00,000", color: "var(--galaxy)", angle: 350 },
      { name: "Razorpay", tier: "Nova", amount: "₹50,000", color: "var(--nova)", angle: 110 },
      { name: "Swiggy", tier: "Star", amount: "₹25,000", color: "var(--star)", angle: 230 },
    ],
  },
  {
    inset: "13%",
    duration: 80,
    sponsors: [
      { name: "boAt", tier: "Nova", amount: "₹50,000", color: "var(--nova)", angle: 40 },
      { name: "CRED", tier: "Galaxy", amount: "₹1,00,000", color: "var(--galaxy)", angle: 160 },
      { name: "Groww", tier: "Comet", amount: "₹10,000", color: "var(--comet)", angle: 280 },
    ],
  },
  {
    inset: "0%",
    duration: 110,
    sponsors: [
      { name: "Zerodha", tier: "Star", amount: "₹25,000", color: "var(--star)", angle: 75 },
      { name: "PhonePe", tier: "Nova", amount: "₹50,000", color: "var(--nova)", angle: 255 },
    ],
  },
];

function nodePosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + 50 * Math.cos(rad)}%`,
    top: `${50 + 50 * Math.sin(rad)}%`,
  };
}

export function EcosystemVisual() {
  const [active, setActive] = useState<Sponsor | null>(null);

  // Mouse-responsive depth: the whole system tilts subtly toward the cursor
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), {
    stiffness: 60,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    stiffness: 60,
    damping: 16,
  });

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[500px]"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {/* Ambient core glow */}
      <div
        aria-hidden
        className="absolute inset-[24%] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff6b35, transparent 70%)" }}
      />

      {RINGS.map((ring, ringIndex) => (
        <div key={ringIndex} className="absolute" style={{ inset: ring.inset }}>
          {/* Static orbit path */}
          <div className="absolute inset-0 rounded-full border border-white/[0.07]" />

          {/* Activity pulse travelling the orbit */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{
              duration: 14 + ringIndex * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(255,107,53,0.55)]"
            />
          </motion.div>

          {/* Rotating sponsor layer */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {/* Relationship lines from the event to each sponsor */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {ring.sponsors.map((sponsor) => {
                const rad = (sponsor.angle * Math.PI) / 180;
                const highlighted = active?.name === sponsor.name;
                return (
                  <line
                    key={sponsor.name}
                    x1="50"
                    y1="50"
                    x2={50 + 50 * Math.cos(rad)}
                    y2={50 + 50 * Math.sin(rad)}
                    stroke={highlighted ? "rgba(255,107,53,0.55)" : "rgba(233,238,247,0.07)"}
                    strokeWidth={highlighted ? 0.5 : 0.3}
                    strokeDasharray="1.5 2"
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                );
              })}
            </svg>

            {ring.sponsors.map((sponsor) => {
              const highlighted = active?.name === sponsor.name;
              return (
                <div
                  key={sponsor.name}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={nodePosition(sponsor.angle)}
                >
                  {/* Counter-rotation keeps the chip upright while its ring spins */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: ring.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <button
                      type="button"
                      aria-label={`${sponsor.name} — ${sponsor.tier} tier, ${sponsor.amount}`}
                      onMouseEnter={() => setActive(sponsor)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(sponsor)}
                      onBlur={() => setActive(null)}
                      className={`glass flex cursor-default items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2 text-[11px] font-semibold whitespace-nowrap transition-all duration-300 sm:text-xs ${
                        highlighted
                          ? "scale-110 border-primary/50 bg-white/10 shadow-[0_0_24px_-4px_rgba(255,107,53,0.5)]"
                          : "shadow-[0_4px_16px_-6px_rgba(0,0,0,0.5)]"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: sponsor.color }}
                      />
                      {sponsor.name}
                    </button>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      ))}

      {/* Center node: the event */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass w-44 rounded-2xl p-4 text-center shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65)] sm:w-48">
          <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand font-heading text-sm font-bold text-[#1c0d04]">
            Tx
          </span>
          <p className="font-heading mt-2.5 text-sm font-bold tracking-tight">
            TEDx VJIT 2026
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Tech · Hyderabad
          </p>
          <div className="mt-2.5 flex h-8 items-center justify-center rounded-lg bg-white/[0.04] px-2">
            {active ? (
              <p className="text-[11px] font-medium text-primary">
                {active.name} · {active.tier} · {active.amount}
              </p>
            ) : (
              <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                8 sponsors in orbit
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
