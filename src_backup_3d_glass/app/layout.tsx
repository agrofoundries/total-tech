import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Clean Neo-Grotesque Corporate Typeface (Inter) - Exact match to your reference
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Total Tech Technologies | Global Enterprise IT Consulting",
  description: "End-to-end enterprise IT architecture, sovereign software engineering, AI, robotics, and cloud systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
