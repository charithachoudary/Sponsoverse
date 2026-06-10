"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RING_GRADIENT =
  "conic-gradient(from 90deg, #ffe7a3, #ffd977, #ffe7a3, #71d8ff, #ffe7a3)";

const RING_MASK =
  "radial-gradient(closest-side, transparent calc(100% - 14px), #000 calc(100% - 13px), #000 100%)";

const SPHERE_DOTS = [
  "radial-gradient(circle at 22% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 1.4%, transparent 2%)",
  "radial-gradient(circle at 68% 16%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 1%, transparent 1.5%)",
  "radial-gradient(circle at 78% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.85) 1.1%, transparent 1.7%)",
  "radial-gradient(circle at 34% 64%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 0.8%, transparent 1.3%)",
  "radial-gradient(circle at 56% 80%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.75) 1%, transparent 1.5%)",
  "radial-gradient(circle at 14% 54%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 0.8%, transparent 1.2%)",
  "radial-gradient(circle at 88% 74%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 1%, transparent 1.5%)",
  "radial-gradient(circle at 46% 14%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 0.7%, transparent 1.1%)",
].join(",");

const ringTransition = { duration: 90, repeat: Infinity, ease: "linear" as const };

export function CosmicOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative mx-auto aspect-square w-full max-w-[440px]", className)}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-cosmic opacity-30 blur-[100px]" />

      {/* back half of ring */}
      <motion.div
        className="absolute inset-[6%] rounded-full opacity-90"
        style={{
          backgroundImage: RING_GRADIENT,
          WebkitMaskImage: RING_MASK,
          maskImage: RING_MASK,
          scaleY: 0.34,
        }}
        initial={{ rotate: -20 }}
        animate={{ rotate: -380 }}
        transition={ringTransition}
      />

      {/* sphere */}
      <motion.div
        className="absolute inset-[14%] z-10 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #d4d4ff 0%, #8f92ff 32%, #5557c9 68%, #1c1f5c 100%)",
          boxShadow:
            "0 0 120px 10px rgba(124,125,255,0.35), inset -34px -34px 90px rgba(0,0,0,0.65), inset 10px 10px 40px rgba(255,255,255,0.08)",
        }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full opacity-70" style={{ backgroundImage: SPHERE_DOTS }} />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 70% 75%, rgba(255,217,119,0.3), transparent 55%)" }}
        />
      </motion.div>

      {/* front arc of ring, drawn over the sphere's lower half */}
      <motion.div
        className="absolute inset-[6%] z-20 rounded-full opacity-90"
        style={{
          backgroundImage: RING_GRADIENT,
          WebkitMaskImage: RING_MASK,
          maskImage: RING_MASK,
          scaleY: 0.34,
          clipPath: "inset(50% 0 0 0)",
        }}
        initial={{ rotate: -20 }}
        animate={{ rotate: -380 }}
        transition={ringTransition}
      />
    </div>
  );
}
