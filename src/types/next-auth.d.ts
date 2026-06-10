import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ORGANIZER" | "SPONSOR";
    } & DefaultSession["user"];
  }

  interface User {
    role: "ORGANIZER" | "SPONSOR";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ORGANIZER" | "SPONSOR";
  }
}
