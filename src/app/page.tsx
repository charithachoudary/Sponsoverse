import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Compass,
  ExternalLink,
  FileText,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  Orbit,
  Send,
  Sparkles,
  TrendingUp,
  UserPlus,
  Wand2,
} from "lucide-react";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { HeroVisual } from "@/components/sponsoverse/hero-visual";
import { BentoCard } from "@/components/sponsoverse/bento-card";
import { ConstellationStats } from "@/components/sponsoverse/constellation-stats";
import { MagneticButton } from "@/components/sponsoverse/magnetic-button";
import { Reveal } from "@/components/sponsoverse/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TIERS } from "@/lib/constants";
import { TierBadge } from "@/components/sponsoverse/tier-badge";

const HIGHLIGHTS = [
  "No cold emails",
  "Direct sponsor inquiries",
  "Comet → Star → Nova → Galaxy",
  "Role-based dashboards",
  "Built on Next.js & Postgres",
  "Live discovery feed",
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up as an Organizer or a Sponsor and fill out a tailored profile — org details or company, industry & budget.",
  },
  {
    icon: Compass,
    title: "List or discover",
    description:
      "Organizers publish events with audience details and package sponsorships into four tiers. Sponsors browse and filter the live feed.",
  },
  {
    icon: Send,
    title: "Connect & confirm",
    description:
      "Sponsors express interest in a tier with a message. Organizers review and accept or decline — deal made, no middlemen.",
  },
];

const ROADMAP = [
  { icon: MessageSquare, label: "In-app messaging" },
  { icon: Brain, label: "AI match scoring" },
  { icon: FileText, label: "Deck analysis" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="bg-grid-fade absolute inset-0" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-32">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Live marketplace for events &amp; sponsors
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                  Where events meet their{" "}
                  <span className="text-gradient-cosmic">universe of sponsors</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
                  Sponsoverse connects event organizers with sponsors looking for the
                  right audience &mdash; discover, package, and land sponsorships in
                  one orbit.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton>
                    <Button
                      size="lg"
                      render={<Link href="/sign-up?role=ORGANIZER" />}
                      className="bg-gradient-cosmic text-white hover:opacity-90"
                    >
                      I&apos;m an Organizer
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button size="lg" variant="outline" render={<Link href="/sign-up?role=SPONSOR" />}>
                    I&apos;m a Sponsor
                  </Button>
                  <Button size="lg" variant="ghost" render={<Link href="/sponsor" />}>
                    Browse events
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:pl-8">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* Marquee strip */}
        <section className="border-y border-white/5 bg-white/[0.02] py-4">
          <div className="flex overflow-hidden">
            <div className="flex w-max shrink-0 animate-marquee items-center gap-8 pr-8">
              {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-muted-foreground"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ConstellationStats />

        {/* Bento features */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Everything you need to make the match
            </h2>
            <p className="mt-4 text-muted-foreground">
              A focused toolkit for organizers and sponsors to find each other,
              package opportunities clearly, and close the loop &mdash; without
              the back-and-forth.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
            {/* Large card: tiers */}
            <Reveal className="lg:col-span-4 lg:row-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <Orbit className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-xl font-semibold">
                  A galaxy of sponsorship tiers
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Organizers package sponsorships into Comet, Star, Nova &amp; Galaxy
                  tiers &mdash; clear, memorable, and easy for sponsors to compare at
                  a glance.
                </p>

                <div className="mt-8 flex flex-1 flex-col justify-end">
                  <div className="flex flex-wrap gap-2">
                    {TIERS.map((tier) => (
                      <TierBadge key={tier.name} tier={tier.name} />
                    ))}
                  </div>
                  <div className="relative mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="bg-gradient-nova absolute inset-y-0 left-0 w-full" />
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>Entry-level visibility</span>
                    <span>Title sponsor takeover</span>
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            {/* Discovery feed */}
            <Reveal delay={0.05} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <Compass className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  Smart discovery feed
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sponsors filter live events by category, location, audience size
                  and budget to find their perfect match.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="outline">Tech</Badge>
                  <Badge variant="outline">Hyderabad</Badge>
                  <Badge variant="outline">5,000+ attendees</Badge>
                  <Badge variant="outline">Budget &le; $1,000</Badge>
                </div>
              </BentoCard>
            </Reveal>

            {/* Direct inquiries */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <Handshake className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  Direct inquiries
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sponsors express interest in a tier, organizers review and respond
                  &mdash; no middlemen, no cold emails.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <Badge variant="secondary">PENDING</Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <Badge>ACCEPTED</Badge>
                </div>
              </BentoCard>
            </Reveal>

            {/* Role-based dashboards */}
            <Reveal delay={0.15} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  Role-based dashboards
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Separate, tailored views for organizers managing events and
                  sponsors tracking their inquiries.
                </p>
              </BentoCard>
            </Reveal>

            {/* Cosmic UI */}
            <Reveal delay={0.2} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  Cosmic, glass UI
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A navy/purple/cyan orbital theme with glassmorphism cards,
                  gradient accents and a living starfield.
                </p>
              </BentoCard>
            </Reveal>

            {/* Built for growth */}
            <Reveal delay={0.25} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-cosmic">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  Built for growth
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Roadmap includes:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ROADMAP.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      <item.icon className="h-3 w-3 text-accent" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              From sign-up to sponsorship in three steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sponsoverse keeps the path short &mdash; for organizers chasing
              funding and sponsors chasing audiences.
            </p>
          </Reveal>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-3">
            <div
              aria-hidden
              className="absolute top-9 right-0 left-0 -z-10 hidden h-px bg-gradient-cosmic opacity-30 sm:block"
            />
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative z-10">
                <Card className="glass relative h-full">
                  <CardContent className="pt-6">
                    <div className="bg-gradient-cosmic font-heading relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white">
                      {i + 1}
                    </div>
                    <step.icon className="mt-4 h-5 w-5 text-accent" />
                    <h3 className="font-heading mt-3 text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Sponsorship tiers, mapped to the cosmos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every event on Sponsoverse packages its sponsorship opportunities
              into four tiers &mdash; so sponsors instantly understand what they
              get.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.05}>
                <Card className="glass group h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  <CardContent className="pt-5">
                    <TierBadge tier={tier.name} className="w-fit" />
                    <h3 className="font-heading mt-3 text-lg font-semibold">
                      {tier.label}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 py-24 text-center">
          <Reveal>
            <Card className="glass relative overflow-hidden">
              <div
                aria-hidden
                className="bg-gradient-nova absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
              />
              <CardContent className="relative flex flex-col items-center gap-4 py-12">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Ready to launch your next sponsorship?
                </h2>
                <p className="max-w-xl text-muted-foreground">
                  Create a free account and start posting events or browsing
                  sponsorship opportunities today.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton>
                    <Button
                      size="lg"
                      render={<Link href="/sign-up" />}
                      className="bg-gradient-cosmic text-white hover:opacity-90"
                    >
                      Get started for free
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button size="lg" variant="outline" render={<Link href="/sponsor" />}>
                    Browse events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-white/5 py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #a6a8ff 0%, #5557c9 45%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-24 h-72 w-72 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, #ffe7a3 0%, #ff7d6e 50%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <span className="font-heading text-xl font-bold tracking-tight">
              <span className="text-gradient-cosmic">Sponsoverse</span>
            </span>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Bridging event organizers and sponsors &mdash; discover, package,
              and land sponsorships in one orbit.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5 text-accent" />
              Next.js &middot; PostgreSQL &middot; Auth.js
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold">Product</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/sponsor" className="hover:text-foreground">
                Discover events
              </Link>
              <Link href="/sign-up?role=ORGANIZER" className="hover:text-foreground">
                For organizers
              </Link>
              <Link href="/sign-up?role=SPONSOR" className="hover:text-foreground">
                For sponsors
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold">Project</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/nehal2905/sponsoverse"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                Source on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link href="/sign-in" className="hover:text-foreground">
                Sign in
              </Link>
            </nav>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          Sponsoverse &mdash; built to bridge event organizers and sponsors.
        </div>
      </footer>
    </div>
  );
}
