import Link from "next/link";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { SignInForm } from "@/components/sponsoverse/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="glass w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">
              Welcome back to <span className="text-gradient-cosmic">Sponsoverse</span>
            </CardTitle>
            <CardDescription>Sign in to your account to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInForm />
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-accent hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
