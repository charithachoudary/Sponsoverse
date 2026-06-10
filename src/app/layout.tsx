import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { OrbitBackground } from "@/components/sponsoverse/orbit-background";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrbitBackground />
        {children}
      </body>
    </html>
  );
}
