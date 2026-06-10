import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { TierBadge } from "@/components/sponsoverse/tier-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { expressInterestAction } from "@/lib/actions";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  REJECTED: "destructive",
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      tiers: true,
      organizer: { include: { organizerProfile: true } },
    },
  });

  if (!event) notFound();

  const existingInquiry =
    session?.user?.role === "SPONSOR"
      ? await prisma.inquiry.findFirst({
          where: { eventId: event.id, sponsorId: session.user.id },
          include: { tier: true },
        })
      : null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <Badge variant="secondary">{event.category}</Badge>
        <h1 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">{event.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Hosted by {event.organizer.organizerProfile?.orgName ?? event.organizer.name}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(event.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {event.audienceSize.toLocaleString()} attendees
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-muted-foreground">{event.description}</p>

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle className="font-heading text-base">Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{event.audienceDemographics}</p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <h2 className="font-heading text-xl font-bold">Sponsorship tiers</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {event.tiers.map((tier) => {
            const perks: string[] = JSON.parse(tier.perks || "[]");
            return (
              <Card key={tier.id} className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <TierBadge tier={tier.name} />
                    <span className="font-heading text-lg font-semibold">
                      ${tier.price.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Up to {tier.maxSponsors} sponsor{tier.maxSponsors === 1 ? "" : "s"}
                  </p>
                  {perks.length > 0 && (
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {perks.map((perk, i) => (
                        <li key={i}>{perk}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {event.tiers.length === 0 && (
            <p className="text-sm text-muted-foreground">
              This organizer hasn&apos;t published sponsorship tiers yet.
            </p>
          )}
        </div>

        <Separator className="my-8" />

        <h2 className="font-heading text-xl font-bold">Express interest</h2>

        {!session?.user && (
          <Card className="glass mt-4">
            <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-muted-foreground">
                Sign in as a sponsor to express interest in this event.
              </p>
              <Button
                render={<Link href="/sign-up?role=SPONSOR" />}
                className="bg-gradient-cosmic text-white hover:opacity-90"
              >
                Sign up as a sponsor
              </Button>
            </CardContent>
          </Card>
        )}

        {session?.user?.role === "ORGANIZER" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Sign in as a sponsor account to express interest in events.
          </p>
        )}

        {session?.user?.role === "SPONSOR" && existingInquiry && (
          <Card className="glass mt-4">
            <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-6">
              <div>
                <p className="font-medium">
                  You expressed interest in the {existingInquiry.tier.name.toLowerCase()} tier
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(existingInquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={STATUS_VARIANT[existingInquiry.status]}>
                {existingInquiry.status}
              </Badge>
            </CardContent>
          </Card>
        )}

        {session?.user?.role === "SPONSOR" && !existingInquiry && (
          <Card className="glass mt-4">
            <CardContent className="pt-6">
              {event.tiers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  This event has no sponsorship tiers available right now.
                </p>
              ) : (
                <form action={expressInterestAction} className="space-y-4">
                  <input type="hidden" name="eventId" value={event.id} />
                  <div className="space-y-2">
                    <Label htmlFor="tierId">Which tier are you interested in?</Label>
                    <select
                      id="tierId"
                      name="tierId"
                      required
                      className="border-input bg-input/30 flex h-9 w-full rounded-md border px-3 text-sm shadow-xs"
                    >
                      {event.tiers.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier.name} — ${tier.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to organizer (optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Introduce your company and why this event is a good fit..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="bg-gradient-cosmic text-white hover:opacity-90">
                    Express interest
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
