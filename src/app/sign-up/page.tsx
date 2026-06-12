import Link from "next/link";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { SignUpForm } from "@/components/sponsoverse/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Role } from "@/generated/prisma/enums";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const defaultRole: Role = role === "ORGANIZER" ? "ORGANIZER" : "SPONSOR";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-lg">
          <span className="eyebrow">Get started</span>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Join <span className="text-gradient-brand">SponsoVerse</span>
          </h1>
          <Card className="mt-8 bg-card/80 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] [--card-spacing:--spacing(6)]">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Start posting events or discovering sponsorship opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SignUpForm defaultRole={defaultRole} />
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
