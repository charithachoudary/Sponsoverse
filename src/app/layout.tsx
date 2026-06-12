import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { SiteBackdrop } from "@/components/sponsoverse/site-backdrop";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SponsoVerse | Where Events Meet Their Universe of Sponsors",
  description:
    "SponsoVerse connects event organizers with sponsors looking for the right audience to reach — publish events, discover sponsors, and close sponsorships in one ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteBackdrop />
        {children}
      </body>
    </html>
  );
}
