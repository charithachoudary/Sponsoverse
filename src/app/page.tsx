import Link from "next/link";
import { Rocket, Sparkles, Handshake, BarChart3, Orbit } from "lucide-react";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TIERS } from "@/lib/constants";
import { TierBadge } from "@/components/sponsoverse/tier-badge";

const FEATURES = [
  {
    icon: Orbit,
    title: "A galaxy of sponsorship tiers",
    description:
      "Organizers package sponsorships into Comet, Star, Nova & Galaxy tiers — clear, memorable, and easy for sponsors to compare.",
  },
  {
    icon: Sparkles,
    title: "Discovery feed for sponsors",
    description:
      "Sponsors browse live events filtered by category, location, audience size and budget to find their perfect match.",
  },
  {
    icon: Handshake,
    title: "Direct inquiries",
    description:
      "Sponsors express interest in a tier, organizers review and respond — no middlemen, no cold emails.",
  },
  {
    icon: BarChart3,
    title: "Built for growth",
    description:
      "Roadmap includes AI-powered match scoring, sponsorship deck uploads, and analytics dashboards for both sides.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
            <Rocket className="h-4 w-4 text-accent" />
            Bridging events and the sponsors who believe in them
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Where events meet their{" "}
            <span className="text-gradient-cosmic">universe of sponsors</span>
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            Sponsoverse connects event organizers with sponsors looking for the
            right audience — discover, package, and land sponsorships in one
            orbit.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/sign-up?role=ORGANIZER" />}
              className="bg-gradient-cosmic text-white hover:opacity-90"
            >
              I&apos;m an Organizer
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/sign-up?role=SPONSOR" />}>
              I&apos;m a Sponsor
            </Button>
            <Button size="lg" variant="ghost" render={<Link href="/sponsor" />}>
              Browse events
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="glass">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="font-heading text-base">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Sponsorship tiers, mapped to the cosmos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every event on Sponsoverse packages its sponsorship opportunities
              into four tiers — so sponsors instantly understand what they get.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => (
              <Card key={tier.name} className="glass">
                <CardHeader>
                  <TierBadge tier={tier.name} className="w-fit" />
                  <CardTitle className="font-heading mt-2 text-lg">
                    {tier.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 py-24 text-center">
          <Card className="glass overflow-hidden">
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Ready to launch your next sponsorship?
              </h2>
              <p className="max-w-xl text-muted-foreground">
                Create a free account and start posting events or browsing
                sponsorship opportunities today.
              </p>
              <Button
                size="lg"
                render={<Link href="/sign-up" />}
                className="bg-gradient-cosmic text-white hover:opacity-90"
              >
                Get started for free
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          Sponsoverse — built to bridge event organizers and sponsors.
        </div>
      </footer>
    </div>
  );
}
