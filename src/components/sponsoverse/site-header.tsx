import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-gradient-cosmic">Sponsoverse</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {!session?.user && (
            <>
              <Button variant="ghost" render={<Link href="/sign-in" />}>
                Sign in
              </Button>
              <Button
                render={<Link href="/sign-up" />}
                className="bg-gradient-cosmic text-white hover:opacity-90"
              >
                Get started
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
                <Button variant="ghost" type="submit">
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
                <Button variant="ghost" type="submit">
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
