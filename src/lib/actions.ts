"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TIERS } from "@/lib/constants";
import type { Role } from "@/generated/prisma/enums";

export type ActionState = { error?: string } | undefined;

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const role = formData.get("role") as Role;
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in all required fields." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (role !== "ORGANIZER" && role !== "SPONSOR") {
    return { error: "Please choose an account type." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (role === "ORGANIZER") {
    const orgName = (formData.get("orgName") as string)?.trim();
    if (!orgName) return { error: "Organization name is required." };

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role,
        organizerProfile: {
          create: {
            orgName,
            bio: (formData.get("bio") as string) || null,
            website: (formData.get("website") as string) || null,
          },
        },
      },
    });
  } else {
    const companyName = (formData.get("companyName") as string)?.trim();
    if (!companyName) return { error: "Company name is required." };

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role,
        sponsorProfile: {
          create: {
            companyName,
            industry: (formData.get("industry") as string) || null,
            targetAudience: (formData.get("targetAudience") as string) || null,
            budgetRange: (formData.get("budgetRange") as string) || null,
          },
        },
      },
    });
  }

  return signInAction(_prevState, formData);
}

export async function signInAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  const redirectTo = user?.role === "ORGANIZER" ? "/organizer" : "/sponsor";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}

export async function createEventAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ORGANIZER") {
    throw new Error("Unauthorized");
  }

  const tiers = TIERS.flatMap((tier) => {
    const price = formData.get(`tier_${tier.name}_price`) as string;
    if (!price || Number(price) <= 0) return [];

    const perksRaw = (formData.get(`tier_${tier.name}_perks`) as string) ?? "";
    const perks = perksRaw
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
    const maxSponsors = Number(
      formData.get(`tier_${tier.name}_maxSponsors`) || "1",
    );

    return [
      {
        name: tier.name,
        price: Number(price),
        perks: JSON.stringify(perks),
        maxSponsors,
      },
    ];
  });

  const event = await prisma.event.create({
    data: {
      organizerId: session.user.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      date: new Date(formData.get("date") as string),
      location: formData.get("location") as string,
      audienceSize: Number(formData.get("audienceSize") || "0"),
      audienceDemographics: formData.get("audienceDemographics") as string,
      tiers: { create: tiers },
    },
  });

  revalidatePath("/organizer");
  redirect(`/organizer/events/${event.id}`);
}

export async function expressInterestAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "SPONSOR") {
    throw new Error("Unauthorized");
  }

  const eventId = formData.get("eventId") as string;

  await prisma.inquiry.create({
    data: {
      eventId,
      sponsorId: session.user.id,
      tierId: formData.get("tierId") as string,
      message: (formData.get("message") as string) ?? "",
    },
  });

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/sponsor");
}

export async function updateInquiryStatusAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ORGANIZER") {
    throw new Error("Unauthorized");
  }

  const inquiryId = formData.get("inquiryId") as string;
  const status = formData.get("status") as "ACCEPTED" | "REJECTED";
  const eventId = formData.get("eventId") as string;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: inquiryId },
    include: { event: true },
  });

  if (!inquiry || inquiry.event.organizerId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: { status },
  });

  revalidatePath(`/organizer/events/${eventId}`);
}
