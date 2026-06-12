"use client";

import { useActionState, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/lib/actions";
import type { Role } from "@/generated/prisma/enums";

export function SignUpForm({ defaultRole }: { defaultRole: Role }) {
  const [role, setRole] = useState<Role>(defaultRole);
  const [state, formAction, pending] = useActionState(signUpAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="role" value={role} />

      <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="ORGANIZER" className="rounded-full">
            I&apos;m an Organizer
          </TabsTrigger>
          <TabsTrigger value="SPONSOR" className="rounded-full">
            I&apos;m a Sponsor
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
      </div>

      {role === "ORGANIZER" ? (
        <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization / Event name</Label>
            <Input id="orgName" name="orgName" required placeholder="e.g. TEDx VJIT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input id="website" name="website" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">About your organization (optional)</Label>
            <Textarea id="bio" name="bio" placeholder="Tell sponsors about your organization..." />
          </div>
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" name="companyName" required placeholder="e.g. Acme Corp" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry (optional)</Label>
              <Input id="industry" name="industry" placeholder="e.g. Fintech" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Typical budget (optional)</Label>
              <Input id="budgetRange" name="budgetRange" placeholder="e.g. ₹25,000 – ₹1,00,000" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target audience (optional)</Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              placeholder="e.g. College students interested in technology and entrepreneurship"
            />
          </div>
        </div>
      )}

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
