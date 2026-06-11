"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/sponsoverse/reveal";

const STATS: {
  from: number;
  to: number;
  suffix: string;
  label: string;
  sub: string;
}[] = [
  { from: 0, to: 4, suffix: "", label: "Sponsorship tiers", sub: "Comet to Galaxy" },
  { from: 0, to: 2, suffix: "", label: "Role-based dashboards", sub: "Organizer & Sponsor" },
  { from: 0, to: 100, suffix: "%", label: "Direct connections", sub: "No middlemen" },
  { from: 999, to: 0, suffix: "", label: "Cold emails required", sub: "Just a live feed" },
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
    <div ref={ref} className="flex flex-col px-2 sm:px-8">
      <div className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="mt-3 text-sm font-medium">{stat.label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</div>
    </div>
  );
}

export function ConstellationStats() {
  return (
    <section className="border-y border-border/70 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.05}
              className={i > 0 ? "lg:border-l lg:border-border/70" : ""}
            >
              <StatNode stat={stat} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
