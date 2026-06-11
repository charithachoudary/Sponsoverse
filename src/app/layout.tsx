import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { SiteBackdrop } from "@/components/sponsoverse/site-backdrop";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sponsoverse | Where Events Meet Their Universe of Sponsors",
  description:
    "Sponsoverse connects event organizers with sponsors looking for the right audience to reach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteBackdrop />
        {children}
      </body>
    </html>
  );
}
