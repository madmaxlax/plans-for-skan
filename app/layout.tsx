import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Skaneateles 2026 Guide",
  description: "June 2026 vacation guide for Skaneateles, NY — restaurants, lake activities, hikes, toddler picks, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 pb-20 md:pb-0">
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 pt-4 md:pt-6">{children}</main>
      </body>
    </html>
  );
}
