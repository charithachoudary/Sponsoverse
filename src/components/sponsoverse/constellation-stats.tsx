"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Compass, Handshake, LayoutDashboard, Orbit, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/sponsoverse/reveal";

const STATS: {
  icon: LucideIcon;
  from: number;
  to: number;
  suffix: string;
  label: string;
  sub: string;
}[] = [
  { icon: Orbit, from: 0, to: 4, suffix: "", label: "Sponsorship tiers", sub: "Comet to Galaxy" },
  { icon: LayoutDashboard, from: 0, to: 2, suffix: "", label: "Role-based dashboards", sub: "Organizer & Sponsor" },
  { icon: Handshake, from: 0, to: 100, suffix: "%", label: "Direct connections", sub: "No middlemen" },
  { icon: Compass, from: 999, to: 0, suffix: "", label: "Cold emails required", sub: "Just a live feed" },
];

function StatNode({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(stat.from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(stat.from, stat.to, {
      duration: 1.4,
      delay: index * 0.15,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.from, stat.to, index]);

  return (
    <div ref={ref} className="relative flex flex-col items-center text-center">
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-popover shadow-[0_0_30px_-6px_rgba(124,125,255,0.6)] backdrop-blur-xl">
        <stat.icon className="h-6 w-6 text-primary" />
        <span
          aria-hidden
          className="animate-twinkle absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,217,119,0.8)]"
        />
      </div>
      <div className="font-heading mt-4 text-3xl font-bold sm:text-4xl">
        {value}
        {stat.suffix}
      </div>
      <div className="mt-1 text-sm font-medium">{stat.label}</div>
      <div className="text-xs text-muted-foreground">{stat.sub}</div>
    </div>
  );
}

export function ConstellationStats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div
        aria-hidden
        className="bg-gradient-cosmic absolute top-7 right-[12%] left-[12%] -z-10 hidden h-px opacity-30 sm:block"
      />
      <div className="grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.05}>
            <StatNode stat={stat} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
