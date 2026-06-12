import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-heading text-xl font-bold tracking-tight ${className ?? ""}`}
    >
      Sponso<span className="text-gradient-brand">Verse</span>
    </span>
  );
}

const NAV_LINKS = [
  { label: "Explore Events", href: "/sponsor" },
  { label: "For Organizers", href: "/sign-up?role=ORGANIZER" },
  { label: "For Sponsors", href: "/sign-up?role=SPONSOR" },
  { label: "Pricing", href: "/#pricing" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-6xl">
      <div className="glass flex h-15 items-center justify-between rounded-2xl px-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] sm:px-5">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Wordmark />
        </Link>

        {!session?.user && (
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <nav className="flex items-center gap-1.5 sm:gap-2.5">
          {!session?.user && (
            <>
              <Button variant="ghost" render={<Link href="/sign-in" />}>
                Sign in
              </Button>
              <Button
                render={<Link href="/sign-up" />}
                className="shadow-[0_0_24px_-6px_rgba(255,107,53,0.6)]"
              >
                Get Started
              </Button>
            </>
          )}

          {session?.user?.role === "ORGANIZER" && (
            <>
              <Button variant="ghost" render={<Link href="/organizer" />}>
                Dashboard
              </Button>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button variant="outline" type="submit">
                  Sign out
                </Button>
              </form>
            </>
          )}

          {session?.user?.role === "SPONSOR" && (
            <>
              <Button variant="ghost" render={<Link href="/sponsor" />}>
                Discover events
              </Button>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button variant="outline" type="submit">
                  Sign out
                </Button>
              </form>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
