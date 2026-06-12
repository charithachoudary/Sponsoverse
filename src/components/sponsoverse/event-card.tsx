import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/sponsoverse/tier-badge";
import type { Event, SponsorshipTier } from "@/generated/prisma/client";

export function EventCard({
  event,
}: {
  event: Event & { tiers: SponsorshipTier[] };
}) {
  const prices = event.tiers.map((t) => t.price);
  const minPrice = prices.length ? Math.min(...prices) : null;

  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="h-full bg-card/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] group-hover:ring-primary/40">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{event.category}</Badge>
            {minPrice !== null && (
              <span className="text-sm text-muted-foreground">
                from{" "}
                <span className="font-heading font-semibold text-foreground">
                  ₹{minPrice.toLocaleString("en-IN")}
                </span>
              </span>
            )}
          </div>
          <CardTitle className="font-heading flex items-start justify-between gap-2 text-xl font-semibold tracking-tight">
            <span>{event.title}</span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(event.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {event.audienceSize.toLocaleString()} attendees
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border/70 pt-3">
            {event.tiers.map((tier) => (
              <TierBadge key={tier.id} tier={tier.name} />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
