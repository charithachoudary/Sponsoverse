import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { EventCard } from "@/components/sponsoverse/event-card";
import { TierBadge } from "@/components/sponsoverse/tier-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENT_CATEGORIES } from "@/lib/constants";
import type { Prisma } from "@/generated/prisma/client";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  REJECTED: "destructive",
};

export default async function SponsorDiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    location?: string;
    minAudience?: string;
    maxBudget?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (session.user.role !== "SPONSOR") redirect("/organizer");

  const { category, location, minAudience, maxBudget } = await searchParams;

  const where: Prisma.EventWhereInput = { status: "PUBLISHED" };
  if (category) where.category = category;
  if (location) where.location = { contains: location, mode: "insensitive" };
  if (minAudience) where.audienceSize = { gte: Number(minAudience) };
  if (maxBudget) where.tiers = { some: { price: { lte: Number(maxBudget) } } };

  const [events, inquiries] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { tiers: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inquiry.findMany({
      where: { sponsorId: session.user.id },
      include: { event: true, tier: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <span className="eyebrow">Discovery feed</span>
        <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Discover events
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse live events looking for sponsors and find your perfect match.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="h-fit lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="font-heading text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" method="get">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={category ?? ""}
                    className="border-input bg-card flex h-10 w-full rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="">All categories</option>
                    {EVENT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={location} placeholder="e.g. Hyderabad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAudience">Min. audience size</Label>
                  <Input
                    id="minAudience"
                    name="minAudience"
                    type="number"
                    min={0}
                    defaultValue={minAudience}
                    placeholder="e.g. 200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxBudget">Max. tier price ($)</Label>
                  <Input
                    id="maxBudget"
                    name="maxBudget"
                    type="number"
                    min={0}
                    defaultValue={maxBudget}
                    placeholder="e.g. 1000"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button type="submit" className="flex-1">
                    Apply
                  </Button>
                  <Button type="button" variant="outline" render={<Link href="/sponsor" />}>
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div>
            {events.length === 0 ? (
              <Card className="border-dashed bg-transparent shadow-none ring-0 border">
                <CardContent className="py-16 text-center text-muted-foreground">
                  No events match your filters yet. Try widening your search.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-border/70 pt-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            My inquiries{" "}
            <span className="text-muted-foreground">({inquiries.length})</span>
          </h2>
          {inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              You haven&apos;t expressed interest in any events yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <Link
                        href={`/events/${inquiry.eventId}`}
                        className="font-medium underline-offset-4 hover:text-accent hover:underline"
                      >
                        {inquiry.event.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TierBadge tier={inquiry.tier.name} />
                      <Badge variant={STATUS_VARIANT[inquiry.status]}>{inquiry.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
