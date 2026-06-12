import Link from "next/link";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { SignInForm } from "@/components/sponsoverse/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-md">
          <span className="eyebrow">Welcome back</span>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Sign in to <span className="text-gradient-brand">SponsoVerse</span>
          </h1>
          <Card className="mt-8 bg-card/80 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] [--card-spacing:--spacing(6)]">
            <CardHeader>
              <CardTitle>Your account</CardTitle>
              <CardDescription>Sign in to your account to continue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SignInForm />
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
