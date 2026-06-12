"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/sponsoverse/reveal";

const STATS: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { to: 2.4, decimals: 1, prefix: "₹", suffix: " Cr+", label: "Funding facilitated" },
  { to: 1500, suffix: "+", label: "Sponsors" },
  { to: 800, suffix: "+", label: "Events" },
  { to: 95, suffix: "%", label: "Response rate" },
  { to: 50000, suffix: "+", label: "Connections made" },
];

function formatValue(value: number, decimals = 0) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString("en-IN");
}

function StatNode({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.to, {
      duration: 1.6,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, stat.to, index]);

  return (
    <div ref={ref} className="flex flex-col items-center px-2 text-center">
      <div className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {stat.prefix && <span className="text-gradient-brand">{stat.prefix}</span>}
        <span>{formatValue(value, stat.decimals)}</span>
        {stat.suffix && <span className="text-gradient-brand">{stat.suffix}</span>}
      </div>
      <div className="mt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {stat.label}
      </div>
    </div>
  );
}

export function ConstellationStats() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <StatNode stat={stat} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
