import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarPlus,
  Compass,
  Handshake,
  Inbox,
  Layers,
  PartyPopper,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { SiteHeader, Wordmark } from "@/components/sponsoverse/site-header";
import { EcosystemVisual } from "@/components/sponsoverse/ecosystem-visual";
import { ActivityFeed } from "@/components/sponsoverse/activity-feed";
import { BentoCard } from "@/components/sponsoverse/bento-card";
import { ConstellationStats } from "@/components/sponsoverse/constellation-stats";
import { MagneticButton } from "@/components/sponsoverse/magnetic-button";
import { Reveal } from "@/components/sponsoverse/reveal";
import { Button } from "@/components/ui/button";
import { TIERS } from "@/lib/constants";
import { TierBadge } from "@/components/sponsoverse/tier-badge";

const JOURNEY = [
  {
    icon: CalendarPlus,
    title: "Publish Event",
    description: "List your event with audience details and sponsorship tiers.",
  },
  {
    icon: Compass,
    title: "Discover Sponsors",
    description: "Relevant brands find you through the live discovery feed.",
  },
  {
    icon: Send,
    title: "Send Inquiry",
    description: "Sponsors express interest in a tier with one click.",
  },
  {
    icon: Inbox,
    title: "Receive Interest",
    description: "Review inquiries with company and budget context.",
  },
  {
    icon: Handshake,
    title: "Close Sponsorship",
    description: "Accept the right partner — deal done, no middlemen.",
  },
  {
    icon: PartyPopper,
    title: "Host Event",
    description: "Deliver the event and grow the relationship.",
  },
];

const TIER_PRICING: Record<string, string> = {
  COMET: "₹10,000",
  STAR: "₹25,000",
  NOVA: "₹50,000",
  GALAXY: "₹1,00,000",
};

const TESTIMONIALS = [
  {
    quote:
      "We closed our title sponsor in 11 days. Last year the same conversation took three months of cold emails and follow-ups.",
    name: "Ananya Sharma",
    role: "Licensee, TEDx VJIT",
    initials: "AS",
    tone: "var(--nova)",
  },
  {
    quote:
      "HackFest received 14 sponsor inquiries through SponsoVerse. We picked partners who actually matched our developer audience.",
    name: "Rohan Mehta",
    role: "Lead Organizer, HackFest Hyderabad",
    initials: "RM",
    tone: "var(--star)",
  },
  {
    quote:
      "Our cultural fest raised ₹3,50,000 across four tiers. The tier structure made it effortless for brands to say yes.",
    name: "Priya Nair",
    role: "Festival Secretary, College Cultural Fest",
    initials: "PN",
    tone: "var(--galaxy)",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-24 sm:px-6 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-6 lg:pt-24 lg:pb-32">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Reveal>
                <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  The live sponsorship marketplace
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-heading mt-6 text-[2.6rem] leading-[1.06] font-bold tracking-tight text-balance sm:text-6xl lg:text-[4rem]">
                  Where Events Meet Their{" "}
                  <span className="relative inline-block">
                    <span className="text-gradient-brand">Universe</span>
                    <svg
                      aria-hidden
                      viewBox="0 0 200 60"
                      className="absolute -inset-x-4 top-1/2 h-[150%] w-[calc(100%+2rem)] -translate-y-1/2 text-accent/40"
                      preserveAspectRatio="none"
                    >
                      <ellipse
                        cx="100"
                        cy="30"
                        rx="96"
                        ry="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                      />
                      <circle cx="12" cy="14" r="2.5" fill="var(--primary)" />
                    </svg>
                  </span>{" "}
                  of Sponsors
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
                  Publish your event, get discovered by the right sponsors,
                  exchange inquiries, and secure funding &mdash; all inside one
                  living ecosystem.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MagneticButton>
                    <Button
                      size="lg"
                      render={<Link href="/sign-up" />}
                      className="shadow-[0_0_36px_-8px_rgba(255,107,53,0.7)]"
                    >
                      Get Started — it&apos;s free
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button size="lg" variant="outline" render={<Link href="/sponsor" />}>
                    Explore Events
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-7 text-sm text-muted-foreground/80">
                  No cold emails &middot; Direct inquiries &middot; Built for
                  India&apos;s events
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="relative">
              <EcosystemVisual />
              <ActivityFeed className="absolute -bottom-8 left-1/2 z-30 -translate-x-1/2 sm:left-0 sm:translate-x-0 lg:-left-6" />
            </Reveal>
          </div>
        </section>

        <ConstellationStats />

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The platform</span>
            <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-tight">
              Everything you need to make the match
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A focused toolkit for organizers and sponsors to find each other,
              package opportunities clearly, and close the loop &mdash; without
              the back-and-forth.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
            {/* Discover Opportunities */}
            <Reveal className="lg:col-span-3">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-comet/12 text-comet">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-xl font-bold tracking-tight">
                  Discover Opportunities
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Sponsors filter live events by category, city, audience size
                  and budget. Organizers get found by brands already looking for
                  them.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Tech", "Hyderabad", "5,000+ attendees", "Budget ≤ ₹50,000"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </BentoCard>
            </Reveal>

            {/* Smart Matching */}
            <Reveal delay={0.05} className="lg:col-span-3">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-xl font-bold tracking-tight">
                  Smart Matching
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Recommendations surface the sponsors most likely to say yes
                  &mdash; based on industry, audience overlap, and budget fit.
                </p>
                <div className="mt-6 space-y-2.5">
                  {[
                    { name: "Razorpay × Fintech Conclave", match: 94 },
                    { name: "boAt × College Cultural Fest", match: 88 },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center gap-3">
                      <span className="w-44 truncate text-xs text-muted-foreground sm:w-52">
                        {row.name}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="bg-gradient-brand h-full rounded-full"
                          style={{ width: `${row.match}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-accent">
                        {row.match}%
                      </span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </Reveal>

            {/* Sponsorship Packages */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-nova/12 text-nova">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold tracking-tight">
                  Sponsorship Packages
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Package offers into four memorable tiers, from ₹10,000 entry
                  visibility to ₹1,00,000+ title takeovers.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {TIERS.map((tier) => (
                    <TierBadge key={tier.name} tier={tier.name} />
                  ))}
                </div>
              </BentoCard>
            </Reveal>

            {/* Real-Time Inquiries */}
            <Reveal delay={0.15} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-star/12 text-star">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold tracking-tight">
                  Real-Time Inquiries
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Sponsors raise a hand, organizers respond instantly. Every
                  inquiry carries tier, budget and a message.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-medium">
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-muted-foreground">
                    PENDING
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary">
                    ACCEPTED
                  </span>
                </div>
              </BentoCard>
            </Reveal>

            {/* Analytics Dashboard */}
            <Reveal delay={0.2} className="lg:col-span-2">
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-comet/12 text-comet">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold tracking-tight">
                  Analytics Dashboard
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Track views, inquiries and conversion per event &mdash; know
                  exactly which tiers are working.
                </p>
                <div className="mt-5 flex h-12 items-end gap-1.5">
                  {[35, 55, 40, 70, 60, 90, 80].map((h, i) => (
                    <div
                      key={i}
                      className="bg-gradient-brand w-full rounded-t-sm opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          </div>
        </section>

        {/* Journey */}
        <section
          id="how-it-works"
          className="scroll-mt-24 border-t border-white/[0.06]"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">The journey</span>
              <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-tight">
                From listing to launch, one constellation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Six steps connect an event to its sponsors. SponsoVerse keeps
                every one of them in a single orbit.
              </p>
            </Reveal>

            <div className="relative mt-16">
              {/* Connecting path */}
              <div
                aria-hidden
                className="absolute top-5 right-[8%] left-[8%] hidden h-px lg:block"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,107,53,0.4) 15%, rgba(244,184,96,0.4) 85%, transparent)",
                }}
              />
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-5 w-px lg:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,107,53,0.4), rgba(244,184,96,0.4), transparent)",
                }}
              />
              <div className="grid gap-10 lg:grid-cols-6 lg:gap-4">
                {JOURNEY.map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.08}>
                    <div className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                      <div className="glass relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <step.icon className="h-4 w-4 text-accent" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                      </div>
                      <div className="lg:mt-5">
                        <h3 className="font-heading text-base font-bold tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Tiers */}
        <section id="pricing" className="scroll-mt-24 border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Sponsorship tiers</span>
              <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-tight">
                Four tiers, sized for every budget
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every event packages its opportunities into the same four tiers
                &mdash; so sponsors instantly understand what they get.
              </p>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.05}>
                  <div className="glow-hover group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card/80 p-6">
                    <div
                      className="absolute inset-x-0 top-0 h-0.5"
                      style={{ backgroundColor: tier.color }}
                    />
                    <TierBadge tier={tier.name} />
                    <div className="font-heading mt-4 text-2xl font-bold tracking-tight">
                      <span className="text-sm font-medium text-muted-foreground">
                        from{" "}
                      </span>
                      {TIER_PRICING[tier.name]}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Organizers set their own prices &mdash; these are typical
                starting points across the marketplace.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Loved by organizers</span>
              <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-tight">
                Stories from across the ecosystem
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <figure className="glow-hover flex h-full flex-col rounded-2xl border border-white/[0.08] bg-card/80 p-6 sm:p-7">
                    <span
                      aria-hidden
                      className="font-heading text-4xl leading-none"
                      style={{ color: t.tone }}
                    >
                      &ldquo;
                    </span>
                    <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/90">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${t.tone} 16%, transparent)`,
                          color: t.tone,
                        }}
                      >
                        {t.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
              {/* Constellation backdrop inside the CTA */}
              <div
                aria-hidden
                className="absolute -top-28 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full opacity-20 blur-[90px]"
                style={{ background: "var(--gradient-brand)" }}
              />
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line x1="8" y1="22" x2="26" y2="40" stroke="rgba(233,238,247,0.08)" strokeWidth="0.15" />
                <line x1="26" y1="40" x2="16" y2="72" stroke="rgba(233,238,247,0.08)" strokeWidth="0.15" />
                <line x1="86" y1="20" x2="74" y2="48" stroke="rgba(233,238,247,0.08)" strokeWidth="0.15" />
                <line x1="74" y1="48" x2="90" y2="70" stroke="rgba(233,238,247,0.08)" strokeWidth="0.15" />
                <circle cx="8" cy="22" r="0.5" fill="rgba(255,107,53,0.6)" />
                <circle cx="26" cy="40" r="0.4" fill="rgba(233,238,247,0.3)" />
                <circle cx="16" cy="72" r="0.5" fill="rgba(244,184,96,0.6)" />
                <circle cx="86" cy="20" r="0.5" fill="rgba(244,184,96,0.6)" />
                <circle cx="74" cy="48" r="0.4" fill="rgba(233,238,247,0.3)" />
                <circle cx="90" cy="70" r="0.5" fill="rgba(255,107,53,0.6)" />
              </svg>
              <div className="relative flex flex-col items-center gap-5">
                <h2 className="font-heading max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-tight">
                  Ready to Launch Your Next{" "}
                  <span className="text-gradient-brand">Sponsorship?</span>
                </h2>
                <p className="max-w-xl text-balance text-muted-foreground">
                  Join the ecosystem where India&apos;s events and sponsors find
                  each other &mdash; free to start, built to convert.
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton>
                    <Button
                      size="lg"
                      render={<Link href="/sign-up?role=ORGANIZER" />}
                      className="shadow-[0_0_36px_-8px_rgba(255,107,53,0.7)]"
                    >
                      Find Sponsors
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </MagneticButton>
                  <Button size="lg" variant="outline" render={<Link href="/sponsor" />}>
                    Explore Events
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The universe where events and sponsors connect &mdash; discover,
              package, and land sponsorships in one ecosystem.
            </p>
            <p className="mt-5 text-xs tracking-wide text-muted-foreground/60">
              Next.js &middot; PostgreSQL &middot; Auth.js
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] text-muted-foreground/60 uppercase">
              Product
            </h4>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/sponsor" className="w-fit transition-colors hover:text-foreground">
                Explore events
              </Link>
              <Link
                href="/sign-up?role=ORGANIZER"
                className="w-fit transition-colors hover:text-foreground"
              >
                For organizers
              </Link>
              <Link
                href="/sign-up?role=SPONSOR"
                className="w-fit transition-colors hover:text-foreground"
              >
                For sponsors
              </Link>
              <Link href="/#pricing" className="w-fit transition-colors hover:text-foreground">
                Pricing
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] text-muted-foreground/60 uppercase">
              Project
            </h4>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a
                href="https://github.com/nehal2905/sponsoverse"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 transition-colors hover:text-foreground"
              >
                Source on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link href="/sign-in" className="w-fit transition-colors hover:text-foreground">
                Sign in
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-white/[0.06]">
          <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground/60 sm:px-6">
            SponsoVerse &mdash; built to bridge event organizers and sponsors.
          </p>
        </div>
      </footer>
    </div>
  );
}
