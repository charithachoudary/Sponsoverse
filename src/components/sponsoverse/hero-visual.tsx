"use client";

import { motion } from "framer-motion";
import { Calendar, Check, MapPin, Users } from "lucide-react";
import { TierBadge } from "@/components/sponsoverse/tier-badge";

const TIER_ROWS = [
  { name: "COMET" as const, price: "$250", left: "3 left" },
  { name: "STAR" as const, price: "$750", left: "2 left" },
  { name: "NOVA" as const, price: "$1,500", left: "1 left" },
  { name: "GALAXY" as const, price: "$4,000", left: "1 left" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] py-10 sm:py-6">
      {/* decorative dashed ring + accents */}
      <div
        aria-hidden
        className="absolute -top-4 -right-6 h-36 w-36 rounded-full border border-dashed border-accent/30"
      />
      <span
        aria-hidden
        className="absolute top-10 left-2 font-heading text-2xl text-accent/60 select-none"
      >
        ✳
      </span>
      <span
        aria-hidden
        className="absolute -bottom-2 right-10 font-heading text-xl text-comet/60 select-none"
      >
        ✳
      </span>

      {/* Event listing card */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -1.2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-2xl border border-border bg-card p-6 shadow-[0_24px_48px_-24px_rgba(33,29,22,0.25)]"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            Tech
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-comet">
            <span className="h-1.5 w-1.5 rounded-full bg-comet" />
            Published
          </span>
        </div>
        <h3 className="font-heading mt-3 text-2xl font-semibold tracking-tight">
          TEDx VJIT 2026
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Mar 14, 2026
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> Hyderabad
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> 1,200 attendees
          </span>
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4">
          {TIER_ROWS.map((tier) => (
            <div key={tier.name} className="flex items-center justify-between">
              <TierBadge tier={tier.name} />
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] text-muted-foreground">{tier.left}</span>
                <span className="font-heading text-sm font-semibold">{tier.price}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Incoming inquiry card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="absolute -right-3 top-16 z-10 w-60 sm:-right-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="rotate-2 rounded-xl border border-border bg-card p-4 shadow-[0_16px_40px_-20px_rgba(33,29,22,0.3)]"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-star/10 text-xs font-bold text-star">
              AC
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Acme Corp</p>
              <p className="text-[11px] text-muted-foreground">wants the Nova tier</p>
            </div>
          </div>
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            &ldquo;Your audience is exactly who we want to reach this quarter.&rdquo;
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
              Accept
            </span>
            <span className="rounded-full border border-foreground/20 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              Decline
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Deal-closed toast */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="absolute -bottom-6 -left-2 z-10 sm:-left-8"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          className="flex -rotate-1 items-center gap-3 rounded-xl border border-border bg-card py-3 pr-5 pl-3 shadow-[0_16px_40px_-20px_rgba(33,29,22,0.3)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-comet/15 text-comet">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">Inquiry accepted</p>
            <p className="text-[11px] text-muted-foreground">Nova tier · $1,500</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
