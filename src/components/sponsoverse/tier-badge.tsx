import type { TierName } from "@/generated/prisma/enums";
import { TIER_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TierBadge({
  tier,
  className,
}: {
  tier: TierName;
  className?: string;
}) {
  const info = TIER_MAP[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
      style={{
        borderColor: `color-mix(in oklab, ${info.color} 50%, transparent)`,
        color: info.color,
        backgroundColor: `color-mix(in oklab, ${info.color} 12%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: info.color }}
      />
      {info.label}
    </span>
  );
}
