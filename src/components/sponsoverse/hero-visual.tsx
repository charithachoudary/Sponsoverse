"use client";

import { motion } from "framer-motion";
import { Compass, Handshake, Orbit } from "lucide-react";
import { CosmicOrb } from "@/components/sponsoverse/cosmic-orb";

const SATELLITES = [
  {
    icon: Orbit,
    label: "4 sponsorship tiers",
    className: "left-0 top-6 sm:-left-6 sm:top-10",
    duration: 6,
    delay: 0,
  },
  {
    icon: Compass,
    label: "Live discovery feed",
    className: "right-0 top-1/2 sm:-right-8",
    duration: 7,
    delay: 0.6,
  },
  {
    icon: Handshake,
    label: "Direct inquiries",
    className: "bottom-4 left-6 sm:bottom-8 sm:left-0",
    duration: 6.5,
    delay: 1.2,
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <CosmicOrb />
      {SATELLITES.map((sat) => (
        <motion.div
          key={sat.label}
          className={`absolute z-30 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground shadow-lg shadow-black/20 backdrop-blur-xl sm:flex ${sat.className}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: sat.duration, delay: sat.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <sat.icon className="h-3.5 w-3.5 text-primary" />
          {sat.label}
        </motion.div>
      ))}
    </div>
  );
}
