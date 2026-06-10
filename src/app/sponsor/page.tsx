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
  if (location) where.location = { contains: location };
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-bold">Discover events</h1>
        <p className="mt-1 text-muted-foreground">
          Browse live events looking for sponsors and find your perfect match.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="glass h-fit lg:sticky lg:top-24">
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
                    className="border-input bg-input/30 flex h-9 w-full rounded-md border px-3 text-sm shadow-xs"
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
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-gradient-cosmic text-white hover:opacity-90">
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
              <Card className="glass">
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

        <div className="mt-12">
          <h2 className="font-heading text-xl font-bold">
            My inquiries ({inquiries.length})
          </h2>
          {inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              You haven&apos;t expressed interest in any events yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className="glass">
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-6">
                    <div>
                      <Link href={`/events/${inquiry.eventId}`} className="font-medium hover:underline">
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
