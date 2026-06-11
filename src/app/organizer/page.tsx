import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { EventCard } from "@/components/sponsoverse/event-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function OrganizerDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (session.user.role !== "ORGANIZER") redirect("/sponsor");

  const events = await prisma.event.findMany({
    where: { organizerId: session.user.id },
    include: {
      tiers: true,
      inquiries: { where: { status: "PENDING" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Organizer dashboard</span>
            <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your events
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your events, sponsorship tiers, and incoming inquiries.
            </p>
          </div>
          <Button render={<Link href="/organizer/events/new" />}>
            <Plus className="h-4 w-4" />
            New event
          </Button>
        </div>

        {events.length === 0 ? (
          <Card className="mt-10 border border-dashed bg-transparent ring-0">
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-heading text-xl font-semibold">No events yet</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Create your first event to start defining sponsorship tiers and
                attracting sponsors from across the universe.
              </p>
              <Button className="mt-2" render={<Link href="/organizer/events/new" />}>
                <Plus className="h-4 w-4" />
                Create your first event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="relative flex flex-col">
                {event.inquiries.length > 0 && (
                  <Badge className="absolute -right-2 -top-2 z-10 bg-accent text-accent-foreground">
                    {event.inquiries.length} new inquir
                    {event.inquiries.length === 1 ? "y" : "ies"}
                  </Badge>
                )}
                <EventCard event={event} />
                <Link
                  href={`/organizer/events/${event.id}`}
                  className="mt-2.5 block text-center text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Manage event &amp; inquiries
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
