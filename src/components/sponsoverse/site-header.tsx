import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-heading text-[22px] font-semibold tracking-tight ${className ?? ""}`}>
      Sponsoverse<span className="text-accent">.</span>
    </span>
  );
}

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Wordmark />
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          {!session?.user && (
            <>
              <Button variant="ghost" render={<Link href="/sign-in" />}>
                Sign in
              </Button>
              <Button render={<Link href="/sign-up" />}>Get started</Button>
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
