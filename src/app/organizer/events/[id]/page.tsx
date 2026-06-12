import { notFound, redirect } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { TierBadge } from "@/components/sponsoverse/tier-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateInquiryStatusAction } from "@/lib/actions";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  REJECTED: "destructive",
};

export default async function ManageEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (session.user.role !== "ORGANIZER") redirect("/sponsor");

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      tiers: true,
      inquiries: {
        include: { sponsor: { include: { sponsorProfile: true } }, tier: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!event || event.organizerId !== session.user.id) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <Badge variant="secondary">{event.category}</Badge>
        <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {event.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {event.description}
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

        <Separator className="my-10" />

        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Sponsorship tiers
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {event.tiers.map((tier) => {
            const perks: string[] = JSON.parse(tier.perks || "[]");
            return (
              <Card key={tier.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <TierBadge tier={tier.name} />
                    <span className="font-heading text-lg font-semibold">
                      ₹{tier.price.toLocaleString("en-IN")}
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
        </div>

        <Separator className="my-10" />

        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Inquiries{" "}
          <span className="text-muted-foreground">({event.inquiries.length})</span>
        </h2>
        {event.inquiries.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No sponsors have expressed interest yet. Share your event link to
            attract sponsors!
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {event.inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">
                        {inquiry.sponsor.sponsorProfile?.companyName ?? inquiry.sponsor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{inquiry.sponsor.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TierBadge tier={inquiry.tier.name} />
                      <Badge variant={STATUS_VARIANT[inquiry.status]}>{inquiry.status}</Badge>
                    </div>
                  </div>
                  {inquiry.message && (
                    <p className="rounded-lg border-l-2 border-accent/50 bg-muted/60 p-3 text-sm leading-relaxed text-muted-foreground">
                      {inquiry.message}
                    </p>
                  )}
                  {inquiry.status === "PENDING" && (
                    <div className="flex gap-2">
                      <form action={updateInquiryStatusAction}>
                        <input type="hidden" name="inquiryId" value={inquiry.id} />
                        <input type="hidden" name="eventId" value={event.id} />
                        <input type="hidden" name="status" value="ACCEPTED" />
                        <Button type="submit" size="sm">
                          Accept
                        </Button>
                      </form>
                      <form action={updateInquiryStatusAction}>
                        <input type="hidden" name="inquiryId" value={inquiry.id} />
                        <input type="hidden" name="eventId" value={event.id} />
                        <input type="hidden" name="status" value="REJECTED" />
                        <Button type="submit" size="sm" variant="outline">
                          Decline
                        </Button>
                      </form>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
