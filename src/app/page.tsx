import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Compass,
  FileText,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  Orbit,
  PenLine,
  Send,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { SiteHeader, Wordmark } from "@/components/sponsoverse/site-header";
import { HeroVisual } from "@/components/sponsoverse/hero-visual";
import { BentoCard } from "@/components/sponsoverse/bento-card";
import { ConstellationStats } from "@/components/sponsoverse/constellation-stats";
import { MagneticButton } from "@/components/sponsoverse/magnetic-button";
import { Reveal } from "@/components/sponsoverse/reveal";
import { Button } from "@/components/ui/button";
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

const FEATURES = [
  {
    icon: Compass,
    tone: "comet",
    title: "Smart discovery feed",
    description:
      "Sponsors filter live events by category, location, audience size and budget to find their perfect match.",
    chips: ["Tech", "Hyderabad", "5,000+ attendees", "Budget ≤ $1,000"],
  },
  {
    icon: Handshake,
    tone: "nova",
    title: "Direct inquiries",
    description:
      "Sponsors express interest in a tier, organizers review and respond — no middlemen, no cold emails.",
  },
  {
    icon: LayoutDashboard,
    tone: "star",
    title: "Role-based dashboards",
    description:
      "Separate, tailored views for organizers managing events and sponsors tracking their inquiries.",
  },
  {
    icon: PenLine,
    tone: "galaxy",
    title: "Crafted, focused UI",
    description:
      "A warm, editorial interface that keeps the spotlight on your events and offers — not on the chrome.",
  },
  {
    icon: TrendingUp,
    tone: "comet",
    title: "Built for growth",
    description: "Roadmap includes:",
    roadmap: true,
  },
] as const;

const TONE_CLASSES: Record<string, string> = {
  comet: "bg-comet/10 text-comet",
  star: "bg-star/10 text-star",
  nova: "bg-nova/10 text-nova",
  galaxy: "bg-galaxy/10 text-galaxy",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="bg-grid-fade absolute inset-0" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div className="flex flex-col items-start text-left">
              <Reveal>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-[0_1px_2px_rgba(33,29,22,0.05)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Live marketplace for events &amp; sponsors
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-heading mt-6 text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
                  Where events meet their{" "}
                  <span className="relative inline-block italic text-accent">
                    universe of sponsors
                    <svg
                      aria-hidden
                      viewBox="0 0 320 14"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1.5 left-0 h-3 w-full text-accent/50"
                    >
                      <path
                        d="M4 10 C 80 2, 160 12, 316 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
                  Sponsoverse connects event organizers with sponsors looking for
                  the right audience &mdash; discover, package, and land
                  sponsorships in one place.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticButton>
                    <Button size="lg" render={<Link href="/sign-up?role=ORGANIZER" />}>
                      I&apos;m an Organizer
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button size="lg" variant="outline" render={<Link href="/sign-up?role=SPONSOR" />}>
                    I&apos;m a Sponsor
                  </Button>
                  <Button size="lg" variant="ghost" render={<Link href="/sponsor" />}>
                    Browse events
                    <ArrowUpRight data-icon="inline-end" />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="px-4 sm:px-8 lg:px-0 lg:pl-6">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* Ticker strip */}
        <section className="border-y border-border/70 bg-card/60 py-3.5">
          <div className="flex overflow-hidden">
            <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10">
              {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase"
                >
                  <span aria-hidden className="text-sm text-accent">
                    ✶
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ConstellationStats />

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The toolkit</span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-tight">
              Everything you need to make the match
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A focused toolkit for organizers and sponsors to find each other,
              package opportunities clearly, and close the loop &mdash; without
              the back-and-forth.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
            {/* Large card: tiers */}
            <Reveal className="lg:col-span-4 lg:row-span-2">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Orbit className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-2xl font-semibold tracking-tight">
                  A galaxy of sponsorship tiers
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  Organizers package sponsorships into Comet, Star, Nova &amp;
                  Galaxy tiers &mdash; clear, memorable, and easy for sponsors to
                  compare at a glance.
                </p>

                <div className="mt-8 flex flex-1 flex-col justify-end">
                  <div className="flex flex-wrap gap-2">
                    {TIERS.map((tier) => (
                      <TierBadge key={tier.name} tier={tier.name} />
                    ))}
                  </div>
                  <div className="relative mt-6 flex h-1.5 w-full overflow-hidden rounded-full">
                    <div className="h-full w-1/4 bg-comet" />
                    <div className="h-full w-1/4 bg-star" />
                    <div className="h-full w-1/4 bg-nova" />
                    <div className="h-full w-1/4 bg-galaxy" />
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>Entry-level visibility</span>
                    <span>Title sponsor takeover</span>
                  </div>
                </div>
              </BentoCard>
            </Reveal>

            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={0.05 * (i + 1)} className="lg:col-span-2">
                <BentoCard className="h-full">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONE_CLASSES[feature.tone]}`}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  {"chips" in feature && feature.chips && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {feature.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  {"roadmap" in feature && feature.roadmap && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ROADMAP.map((item) => (
                        <span
                          key={item.label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          <item.icon className="h-3 w-3 text-accent" />
                          {item.label}
                        </span>
                      ))}
                    </div>
                  )}
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">How it works</span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-tight">
                From sign-up to sponsorship in three steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Sponsoverse keeps the path short &mdash; for organizers chasing
                funding and sponsors chasing audiences.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1}>
                  <div className="border-t-2 border-foreground/80 pt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-4xl font-semibold text-accent italic">
                        0{i + 1}
                      </span>
                      <step.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading mt-5 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Four tiers</span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-tight">
                Sponsorship tiers, mapped to the cosmos
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every event on Sponsoverse packages its sponsorship opportunities
                into four tiers &mdash; so sponsors instantly understand what
                they get.
              </p>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(33,29,22,0.25)]">
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: tier.color }}
                    />
                    <span
                      className="font-heading text-xs font-semibold tracking-[0.16em] uppercase"
                      style={{ color: tier.color }}
                    >
                      Tier 0{i + 1}
                    </span>
                    <h3 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                      {tier.label}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal>
            <div className="ink-panel relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 h-56 w-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-[90px]"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
              />
              <span
                aria-hidden
                className="absolute top-8 left-10 font-heading text-2xl text-accent/70 select-none"
              >
                ✳
              </span>
              <span
                aria-hidden
                className="absolute right-12 bottom-10 font-heading text-xl select-none"
                style={{ color: "color-mix(in oklab, var(--comet) 70%, transparent)" }}
              >
                ✳
              </span>
              <div className="relative flex flex-col items-center gap-5">
                <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
                  Ready to launch your next{" "}
                  <span className="italic text-accent">sponsorship?</span>
                </h2>
                <p className="max-w-xl text-balance text-white/60">
                  Create a free account and start posting events or browsing
                  sponsorship opportunities today.
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton>
                    <Button
                      size="lg"
                      render={<Link href="/sign-up" />}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Get started for free
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    render={<Link href="/sponsor" />}
                    className="border-white/25 text-white hover:border-white/50 hover:bg-white/10 hover:text-white"
                  >
                    Browse events
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="ink-panel">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Bridging event organizers and sponsors &mdash; discover, package,
              and land sponsorships in one place.
            </p>
            <p className="mt-5 text-xs tracking-wide text-white/40">
              Next.js &middot; PostgreSQL &middot; Auth.js
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">
              Product
            </h4>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
              <Link href="/sponsor" className="w-fit transition-colors hover:text-white">
                Discover events
              </Link>
              <Link
                href="/sign-up?role=ORGANIZER"
                className="w-fit transition-colors hover:text-white"
              >
                For organizers
              </Link>
              <Link
                href="/sign-up?role=SPONSOR"
                className="w-fit transition-colors hover:text-white"
              >
                For sponsors
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">
              Project
            </h4>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
              <a
                href="https://github.com/nehal2905/sponsoverse"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 transition-colors hover:text-white"
              >
                Source on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link href="/sign-in" className="w-fit transition-colors hover:text-white">
                Sign in
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/40 sm:px-6">
            Sponsoverse &mdash; built to bridge event organizers and sponsors.
          </p>
        </div>
      </footer>
    </div>
  );
}
