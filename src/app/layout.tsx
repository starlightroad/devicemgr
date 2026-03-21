import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | DeviceMGR Dashboard",
    default: "DeviceMGR Dashboard",
  },
  description: "A device management dashboard built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
