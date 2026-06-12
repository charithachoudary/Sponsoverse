"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Eye,
  IndianRupee,
  ListChecks,
  MailQuestion,
  Send,
  type LucideIcon,
} from "lucide-react";

const ACTIVITIES: { icon: LucideIcon; tone: string; title: string; detail: string }[] = [
  {
    icon: BadgeCheck,
    tone: "var(--nova)",
    title: "boAt accepted the Nova package",
    detail: "₹50,000 sponsorship closed",
  },
  {
    icon: MailQuestion,
    tone: "var(--comet)",
    title: "TEDx Hyderabad received 3 inquiries",
    detail: "Star & Nova tiers requested",
  },
  {
    icon: Eye,
    tone: "var(--galaxy)",
    title: "CRED viewed Startup Summit 2026",
    detail: "Browsing Galaxy tier · ₹1,00,000",
  },
  {
    icon: ListChecks,
    tone: "var(--star)",
    title: "PhonePe shortlisted HackFest 2026",
    detail: "2,000+ student developers",
  },
  {
    icon: Send,
    tone: "var(--comet)",
    title: "Swiggy requested sponsorship details",
    detail: "Food fest · Bengaluru · 8,000 attendees",
  },
  {
    icon: IndianRupee,
    tone: "var(--galaxy)",
    title: "Razorpay closed a Galaxy sponsorship",
    detail: "₹1,00,000 · Fintech Conclave 2026",
  },
];

export function ActivityFeed({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ACTIVITIES.length);
    }, 3600);
    return () => clearInterval(id);
  }, []);

  const activity = ACTIVITIES[index];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass flex w-72 items-center gap-3 rounded-xl p-3.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in oklab, ${activity.tone} 14%, transparent)`,
              color: activity.tone,
            }}
          >
            <activity.icon className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold">{activity.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {activity.detail}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
