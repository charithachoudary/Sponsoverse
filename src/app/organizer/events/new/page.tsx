import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SiteHeader } from "@/components/sponsoverse/site-header";
import { TierBadge } from "@/components/sponsoverse/tier-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEventAction } from "@/lib/actions";
import { EVENT_CATEGORIES, TIERS } from "@/lib/constants";

export default async function NewEventPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (session.user.role !== "ORGANIZER") redirect("/sponsor");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-bold">Create a new event</h1>
        <p className="mt-1 text-muted-foreground">
          Tell sponsors about your event and define what each sponsorship tier
          includes.
        </p>

        <form action={createEventAction} className="mt-8 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Event details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event title</Label>
                <Input id="title" name="title" required placeholder="e.g. TEDx VJIT 2026" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="What is your event about? Who will attend?"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required defaultValue="Tech">
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Event date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required placeholder="e.g. Hyderabad, India" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audienceSize">Expected audience size</Label>
                  <Input
                    id="audienceSize"
                    name="audienceSize"
                    type="number"
                    min={0}
                    required
                    placeholder="e.g. 500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audienceDemographics">Audience demographics</Label>
                <Textarea
                  id="audienceDemographics"
                  name="audienceDemographics"
                  required
                  placeholder="e.g. College students aged 18-24 interested in tech and entrepreneurship"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Sponsorship tiers</CardTitle>
              <CardDescription>
                Set a price for any tier you want to offer. Leave the price
                empty to skip a tier.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {TIERS.map((tier) => (
                <div key={tier.name} className="space-y-3 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <TierBadge tier={tier.name} />
                    <span className="text-xs text-muted-foreground">{tier.description}</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`tier_${tier.name}_price`}>Price (USD)</Label>
                      <Input
                        id={`tier_${tier.name}_price`}
                        name={`tier_${tier.name}_price`}
                        type="number"
                        min={0}
                        placeholder="e.g. 500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`tier_${tier.name}_maxSponsors`}>Max sponsors</Label>
                      <Input
                        id={`tier_${tier.name}_maxSponsors`}
                        name={`tier_${tier.name}_maxSponsors`}
                        type="number"
                        min={1}
                        defaultValue={1}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tier_${tier.name}_perks`}>Perks (one per line)</Label>
                    <Textarea
                      id={`tier_${tier.name}_perks`}
                      name={`tier_${tier.name}_perks`}
                      placeholder={"e.g.\nLogo on website\nSocial media shoutout\nBooth at venue"}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full bg-gradient-cosmic text-white hover:opacity-90">
            Publish event
          </Button>
        </form>
      </main>
    </div>
  );
}
