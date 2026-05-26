import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Skaneateles 2026 Guide",
  description: "June 2026 vacation guide for Skaneateles, NY.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-cream-100 font-sans text-ink antialiased pb-20 md:pb-0">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
