import type { TierName } from "@/generated/prisma/enums";

export const TIERS: {
  name: TierName;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    name: "COMET",
    label: "Comet",
    description: "Entry-level visibility — logo on event materials",
    color: "var(--comet)",
  },
  {
    name: "STAR",
    label: "Star",
    description: "Mid-tier branding, social mentions & booth space",
    color: "var(--star)",
  },
  {
    name: "NOVA",
    label: "Nova",
    description: "Premium placement, speaking slot & banner display",
    color: "var(--nova)",
  },
  {
    name: "GALAXY",
    label: "Galaxy",
    description: "Title sponsor — full event branding takeover",
    color: "var(--galaxy)",
  },
];

export const TIER_MAP = Object.fromEntries(TIERS.map((t) => [t.name, t])) as Record<
  TierName,
  (typeof TIERS)[number]
>;

export const EVENT_CATEGORIES = [
  "Tech",
  "Business",
  "Education",
  "Music",
  "Sports",
  "Arts & Culture",
  "Social Impact",
  "Other",
];
