import Link from "next/link";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { SignUpForm } from "@/components/sponsoverse/sign-up-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="glass w-full max-w-lg">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">
              Join <span className="text-gradient-cosmic">Sponsoverse</span>
            </CardTitle>
            <CardDescription>
              Create an account to start posting events or discovering
              sponsorship opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignUpForm defaultRole={defaultRole} />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
